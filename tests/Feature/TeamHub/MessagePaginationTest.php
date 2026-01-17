<?php

namespace Tests\Feature\TeamHub;

use App\Models\Channel;
use App\Models\Team;
use App\Models\TeamMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MessagePaginationTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $channel;
    protected $team;

    protected function setUp(): void
    {
        parent::setUp();

        // Create admin role if not exists
        if (!\Spatie\Permission\Models\Role::where('name', 'admin')->exists()) {
            \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        }

        $this->user = User::factory()->create();
        $this->user->assignRole('admin');
        
        // Create team and channel
        $this->team = Team::create([
            'name' => 'Test Team',
            'admin_id' => $this->user->id,
            'uuid' => 'team-uuid',
        ]);

        $this->channel = Channel::create([
            'team_id' => $this->team->id,
            'name' => 'general',
            'uuid' => 'channel-uuid',
            'created_by' => $this->user->id,
        ]);
        
        $this->channel->members()->attach($this->user->id);
    }

    public function test_can_fetch_paginated_messages()
    {
        $this->actingAs($this->user, 'api');

        // Create 100 messages
        // We create them with different timestamps to ensure order
        $now = now();
        $messages = [];
        for ($i = 0; $i < 100; $i++) {
            $messages[] = [
                'uuid' => \Illuminate\Support\Str::uuid()->toString(),
                'channel_id' => $this->channel->id,
                'user_id' => $this->user->id,
                'content' => "Message $i",
                'created_at' => $now->copy()->subMinutes(100 - $i),
                'updated_at' => $now->copy()->subMinutes(100 - $i),
            ];
        }
        \DB::table('team_messages')->insert($messages);

        // 1. Fetch first page (latest 50 messages)
        $response = $this->getJson("/api/team-hub/channels/{$this->channel->uuid}/chat-messages");

        $response->assertStatus(200);
        
        // Check structure
        $response->assertJsonStructure([
            'data',
            'next_cursor'
        ]);

        $data = $response->json('data');
        $this->assertCount(50, $data);
        
        // Verify order: should be chronological (oldest to newest) for the slice
        // The slice is the *latest* 50 messages.
        // So the last message in the list should be "Message 99"
        $this->assertEquals('Message 99', $data[49]['content']);
        $this->assertEquals('Message 50', $data[0]['content']);

        $nextCursor = $response->json('next_cursor');
        $this->assertNotNull($nextCursor);

        // 2. Fetch second page (older 50 messages)
        $response2 = $this->getJson("/api/team-hub/channels/{$this->channel->uuid}/chat-messages?cursor={$nextCursor}");
        
        $response2->assertStatus(200);
        $data2 = $response2->json('data');
        $this->assertCount(50, $data2);

        // Verify content
        // Should be messages 0 to 49
        $this->assertEquals('Message 49', $data2[49]['content']);
        $this->assertEquals('Message 0', $data2[0]['content']);

        // 3. Fetch third page (should be empty)
        $nextCursor2 = $response2->json('next_cursor');
        // Depending on implementation, next_cursor might be null if exactly 50 items were fetched and no more exist,
        // or it might return a cursor but the next call returns empty.
        // Let's assume if we have a cursor, we try to fetch.
        
        if ($nextCursor2) {
            $response3 = $this->getJson("/api/team-hub/channels/{$this->channel->uuid}/chat-messages?cursor={$nextCursor2}");
            $response3->assertStatus(200);
            $this->assertEmpty($response3->json('data'));
            $this->assertNull($response3->json('next_cursor'));
        } else {
            $this->assertNull($nextCursor2);
        }
    }
}
