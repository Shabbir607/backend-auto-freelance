<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('team.channel.{uuid}', function ($user, $uuid) {
    $channel = \App\Models\Channel::where('uuid', $uuid)->first();
    
    if (!$channel) {
        return false;
    }

    // Check if user belongs to the team
    if ($user->team_id !== $channel->team_id) {
        return false;
    }

    // If channel is private, check if user is a member (TODO: Implement channel members table/logic fully)
    // For now, if it's private, we assume only team members can access (which is already checked above)
    // In a real scenario with private channels, you'd check the channel_members table.
    
    return true;
});
