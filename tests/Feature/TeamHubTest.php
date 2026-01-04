<?php

namespace Tests\Feature;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use App\Notifications\NewMessageNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class TeamHubTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_team()
    {
        \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create();
        $user->assignRole('admin');
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/team-hub/team', [
            'name' => 'My Awesome Team',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('name', 'My Awesome Team');

        $this->assertDatabaseHas('teams', [
            'name' => 'My Awesome Team',
            'admin_id' => $user->id,
        ]);

        $this->assertDatabaseHas('channels', [
            'name' => 'general',
        ]);
    }

    public function test_regular_user_cannot_create_team()
    {
        $user = User::factory()->create();
        // No role assigned (or regular member role)
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/team-hub/team', [
            'name' => 'My Awesome Team',
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_invite_member()
    {
        \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $this->actingAs($admin, 'api');

        // Create team first
        $this->postJson('/api/team-hub/team', ['name' => 'Test Team']);

        $response = $this->postJson('/api/team-hub/team/invite', [
            'email' => 'newmember@example.com',
            'role' => 'member',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['message', 'invitation', 'invitation_url']);

        $this->assertDatabaseHas('team_invitations', [
            'email' => 'newmember@example.com',
            'status' => 'pending',
        ]);
    }

    public function test_user_can_accept_invitation()
    {
        $admin = User::factory()->create();
        $team = Team::create([
            'name' => 'Test Team',
            'admin_id' => $admin->id,
            'uuid' => 'team-uuid',
        ]);
        
        $invitation = TeamInvitation::create([
            'team_id' => $team->id,
            'email' => 'invitee@example.com',
            'token' => 'valid-token',
            'status' => 'pending',
        ]);

        $user = User::factory()->create(['email' => 'invitee@example.com']);
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/team-hub/team/join', [
            'token' => 'valid-token',
        ]);

        $response->assertStatus(200);

        $this->assertEquals($team->id, $user->fresh()->team_id);
        $this->assertEquals('accepted', $invitation->fresh()->status);
    }

    public function test_user_can_create_channel()
    {
        \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create();
        $user->assignRole('admin');
        $this->actingAs($user, 'api');
        $this->postJson('/api/team-hub/team', ['name' => 'Test Team']);

        $response = $this->postJson('/api/team-hub/channels', [
            'name' => 'random',
            'description' => 'Random stuff',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('name', 'random');
            
        $this->assertDatabaseHas('channels', [
            'name' => 'random',
        ]);
    }

    public function test_user_can_send_message()
    {
        Event::fake();
        Notification::fake();

        \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create();
        $user->assignRole('admin'); // Need admin to create team
        $this->actingAs($user, 'api');
        
        // Create team and get default channel
        $teamResponse = $this->postJson('/api/team-hub/team', ['name' => 'Test Team']);
        $channelUuid = $teamResponse->json('channels.0.uuid');

        // Add another member to notify
        $member = User::factory()->create(['team_id' => $user->team_id]);

        $response = $this->postJson("/api/team-hub/channels/{$channelUuid}/chat-messages", [
            'content' => 'Hello World',
        ]);
        
        $response->assertStatus(201);

        $this->assertDatabaseHas('team_messages', [
            'content' => 'Hello World',
        ]);

        Event::assertDispatched(MessageSent::class);
        Notification::assertSentTo($member, NewMessageNotification::class);
    }
}
