<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MeetingController extends Controller
{
    public function index(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('view', $project);

        $meetings = $project->meetings()->latest()->get();
        return response()->json($meetings);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $this->authorize('update', $project);
        
        // Instantiate service with current user for OAuth support
        $calendarService = new \App\Services\GoogleCalendarService(Auth::user());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'attendees' => 'nullable|array',
            'attendees.*' => 'exists:users,id',
        ]);

        // Generate a unique room ID for the meeting
        $roomId = Str::uuid();

        // 1. Prepare data for Google Calendar
        $attendeeEmails = [];
        if (isset($validated['attendees'])) {
            $attendeeEmails = \App\Models\User::whereIn('id', $validated['attendees'])
                                ->pluck('email')
                                ->toArray();
        }

        // 2. Create Google Calendar Event
        $googleEvent = $calendarService->createEvent(
            $validated['title'],
            $validated['description'] ?? '',
            $validated['start_time'],
            $validated['end_time'],
            $attendeeEmails
        );

        $googleEventId = null;
        $googleMeetLink = null;
        $hangoutLink = null;

        if ($googleEvent['status'] === 'success') {
            $googleEventId = $googleEvent['id'];
            $googleMeetLink = $googleEvent['htmlLink']; // Link to the event
            $hangoutLink = $googleEvent['hangoutLink']; // The actual Meet video link
        }

        // 3. Create Local Meeting
        $meeting = $project->meetings()->create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'meeting_link' => $roomId, 
            'status' => 'scheduled',
            'google_event_id' => $googleEventId,
            'google_meet_link' => $googleMeetLink,
            'hangout_link' => $hangoutLink
        ]);

        if (isset($validated['attendees'])) {
            $meeting->attendees()->sync($validated['attendees']);
        }

        return response()->json($meeting->load('attendees'), 201);
    }

    public function join(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);
        $this->authorize('view', $meeting->project);

        // In a real WebRTC setup, we might return TURN server credentials here
        // For now, we just return the room ID (stored in meeting_link) and user info
        return response()->json([
            'room_id' => $meeting->meeting_link,
            'user' => [
                'id' => Auth::id(),
                'name' => Auth::user()->name,
                'avatar' => Auth::user()->avatar, // Assuming avatar exists
            ],
            'ice_servers' => [
                ['urls' => 'stun:stun.l.google.com:19302'],
            ]
        ]);
    }

    public function signal(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);
        $this->authorize('view', $meeting->project);

        $request->validate([
            'signal' => 'required',
            'room_id' => 'required',
        ]);

        broadcast(new \App\Events\MeetingSignal(
            $request->room_id,
            $request->signal,
            Auth::id()
        ))->toOthers();

        return response()->json(['status' => 'signal broadcasted']);
    }
}
