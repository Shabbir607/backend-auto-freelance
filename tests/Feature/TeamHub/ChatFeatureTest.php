<?php

namespace Tests\Feature\TeamHub;

use App\Models\User;
use App\Models\Team;
use App\Models\Channel;
use App\Models\TeamMessage;
use App\Events\UserTyping;
use App\Events\MessageRead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ChatFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_typing_event_is_broadcast()
    {
        Event::fake();

        $user = User::factory()->create();
        $team = Team::create([
            'uuid' => 'test-team-uuid',
            'name' => 'Test Team',
            'admin_id' => $user->id,
        ]);
        $channel = Channel::create([
            'uuid' => 'test-channel-uuid',
            'name' => 'Test Channel',
            'team_id' => $team->id,
        ]);

        $this->actingAs($user)
            ->postJson("/api/team-hub/channels/{$channel->uuid}/typing")
            ->assertOk();

        Event::assertDispatched(UserTyping::class);
    }

    public function test_mark_as_read_updates_status()
    {
        Event::fake();

        $user = User::factory()->create();
        $team = Team::create([
            'uuid' => 'test-team-uuid-2',
            'name' => 'Test Team 2',
            'admin_id' => $user->id,
        ]);
        $channel = Channel::create([
            'uuid' => 'test-channel-uuid-2',
            'name' => 'Test Channel 2',
            'team_id' => $team->id,
        ]);
        $message = TeamMessage::create([
            'uuid' => 'test-message-uuid',
            'channel_id' => $channel->id,
            'user_id' => $user->id,
            'content' => 'Test message',
        ]);

        $this->actingAs($user)
            ->postJson("/api/team-hub/channels/{$channel->uuid}/read", ['message_id' => $message->id])
            ->assertOk();

        $this->assertDatabaseHas('channel_read_status', [
            'channel_id' => $channel->id,
            'user_id' => $user->id,
            'last_read_message_id' => $message->id,
        ]);

        Event::assertDispatched(MessageRead::class);
    }
}
