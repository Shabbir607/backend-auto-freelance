<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use App\Services\GoogleCalendarService;
use Symfony\Component\HttpFoundation\Response;

class AppointmentController extends Controller
{
    /**
     * List authenticated user's meetings
     */
    public function index()
    {
        try {
            $userId = Auth::id();

            $meetings = Meeting::query()
                ->where('organizer_id', $userId)
                ->orWhereHas('attendees', fn ($q) => $q->where('user_id', $userId))
                ->with([
                    'organizer:id,name,email',
                    'attendees:id,name,email'
                ])
                ->latest()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $meetings
            ], Response::HTTP_OK);

        } catch (\Throwable $e) {
            Log::error('Meeting index failed', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch meetings'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create meeting
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string|max:2000',
                'start_time'  => 'required|date|after:now',
                'end_time'    => 'required|date|after:start_time',
                'attendees'   => 'nullable|array',
                'attendees.*' => 'string|exists:user_details,uuid',
                'project_id'  => 'nullable|exists:projects,id',
            ]);

            return DB::transaction(function () use ($validated) {

                $user = Auth::user();

                /** -------------------------------
                 * Resolve Attendee Emails & IDs
                 * ------------------------------*/
                $attendeeEmails = [];
                $attendeeIds = [];

                if (!empty($validated['attendees'])) {
                    $userDetails = \App\Models\UserDetail::whereIn('uuid', $validated['attendees'])
                                    ->with('user:id,email')
                                    ->get();
                    
                    $attendeeIds = $userDetails->pluck('user_id')->toArray();
                    $attendeeEmails = $userDetails->pluck('user.email')->filter()->toArray();
                }
                /** -------------------------------
                 * Google Calendar Integration
                 * ------------------------------*/
                $googleEventId = null;
                $googleMeetLink = null;
                $hangoutLink = null;

                try {
                    $calendarService = new GoogleCalendarService($user);

                    $event = $calendarService->createEvent(
                        $validated['title'],
                        $validated['description'] ?? '',
                        $validated['start_time'],
                        $validated['end_time'],
                        $attendeeEmails
                    );

                    if (!empty($event) && ($event['status'] ?? null) === 'success') {
                        $googleEventId = $event['id'] ?? null;
                        $googleMeetLink = $event['htmlLink'] ?? null;
                        $hangoutLink = $event['hangoutLink'] ?? null;
                    }

                } catch (\Throwable $e) {
                    // Do NOT fail meeting creation
                    Log::warning('Google Calendar failed', ['error' => $e]);
                }

                /** -------------------------------
                 * Create Local Meeting
                 * ------------------------------*/
                $meeting = Meeting::create([
                    'title'            => $validated['title'],
                    'description'      => $validated['description'] ?? null,
                    'start_time'       => $validated['start_time'],
                    'end_time'         => $validated['end_time'],
                    'meeting_link'     => (string) Str::uuid(),
                    'status'           => 'scheduled',
                    'organizer_id'     => $user->id,
                    'project_id'       => $validated['project_id'] ?? null,
                    'google_event_id'  => $googleEventId,
                    'google_meet_link' => $googleMeetLink,
                    'hangout_link'     => $hangoutLink,
                ]);

                if (!empty($attendeeIds)) {
                    $meeting->attendees()->sync($attendeeIds);
                }

                return response()->json([
                    'success' => true,
                    'data' => $meeting->load([
                        'organizer:id,name,email',
                        'attendees:id,name,email'
                    ])
                ], Response::HTTP_CREATED);
            });

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (\Throwable $e) {
            Log::error('Meeting creation failed', ['error' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to create appointment'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show meeting
     */
    public function show($id)
    {
        try {
            $meeting = Meeting::with([
                'organizer:id,name,email',
                'attendees:id,name,email'
            ])->findOrFail($id);

            $userId = Auth::id();

            if (
                $meeting->organizer_id !== $userId &&
                !$meeting->attendees->pluck('id')->contains($userId)
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden'
                ], Response::HTTP_FORBIDDEN);
            }

            return response()->json([
                'success' => true,
                'data' => $meeting
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Meeting not found'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update meeting
     */
    public function update(Request $request, $id)
    {
        try {
            $meeting = Meeting::findOrFail($id);

            if ($meeting->organizer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden'
                ], Response::HTTP_FORBIDDEN);
            }

            $validated = $request->validate([
                'title'       => 'sometimes|string|max:255',
                'description' => 'nullable|string|max:2000',
                'start_time'  => 'sometimes|date|after:now',
                'end_time'    => 'sometimes|date|after:start_time',
                'status'      => 'sometimes|in:scheduled,completed,cancelled'
            ]);

            $meeting->update($validated);

            return response()->json([
                'success' => true,
                'data' => $meeting
            ], Response::HTTP_OK);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Delete meeting
     */
    public function destroy($id)
    {
        try {
            $meeting = Meeting::findOrFail($id);

            if ($meeting->organizer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden'
                ], Response::HTTP_FORBIDDEN);
            }

            $meeting->delete();

            return response()->json([
                'success' => true,
                'message' => 'Appointment deleted successfully'
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Meeting not found'
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
