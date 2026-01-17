<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GoogleCalendarService
{
    protected $client;
    protected $service;
    protected $calendarId;

    public function __construct($user = null)
    {
        $this->client = new Client();
        $this->client->setApplicationName(config('app.name'));
        $this->client->setScopes([Calendar::CALENDAR]);
        $this->client->setAccessType('offline');
        
        // OAuth Mode (User Specific)
        if ($user && $user->google_access_token) {
            $this->client->setClientId(config('services.google.client_id'));
            $this->client->setClientSecret(config('services.google.client_secret'));
            $this->client->setAccessToken([
                'access_token' => $user->google_access_token,
                'refresh_token' => $user->google_refresh_token,
                'expires_in' => $user->google_token_expires_in,
                'created' => time(), // approximate, or store 'created' in DB
            ]);

            if ($this->client->isAccessTokenExpired()) {
                if ($this->client->getRefreshToken()) {
                    $newAccessToken = $this->client->fetchAccessTokenWithRefreshToken($this->client->getRefreshToken());
                    
                    // Update user tokens
                    $user->google_access_token = $newAccessToken['access_token'];
                    $user->google_token_expires_in = $newAccessToken['expires_in'];
                    $user->save();
                }
            }

            $this->calendarId = 'primary'; // Use the user's primary calendar
        } else {
            // fallback to Service Account if configured (or just fail if strictly user-based)
             $credentials = config('services.google.application_credentials');
             if ($credentials && file_exists($credentials)) {
                $this->client->setAuthConfig($credentials);
                $this->calendarId = config('services.google.calendar_id');
             }
        }

        $this->service = new Calendar($this->client);
    }

    public function createEvent($title, $description, $startTime, $endTime, $attendees = [])
    {
        try {
            $event = new Event([
                'summary' => $title,
                'description' => $description,
                'start' => [
                    'dateTime' => Carbon::parse($startTime)->toRfc3339String(),
                    'timeZone' => config('app.timezone'),
                ],
                'end' => [
                    'dateTime' => Carbon::parse($endTime)->toRfc3339String(),
                    'timeZone' => config('app.timezone'),
                ],
                'attendees' => array_map(function ($email) {
                    return ['email' => $email];
                }, $attendees),
                'conferenceData' => [
                    'createRequest' => [
                        'requestId' => uniqid(),
                        'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
                    ],
                ],
            ]);

            $optParams = ['conferenceDataVersion' => 1];
            $event = $this->service->events->insert($this->calendarId, $event, $optParams);

            return [
                'id' => $event->id,
                'htmlLink' => $event->htmlLink,
                'hangoutLink' => $event->hangoutLink,
                'status' => 'success'
            ];
        } catch (\Exception $e) {
            Log::error('Google Calendar Error: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}
