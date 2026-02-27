<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\WorkflowAiGeneratorService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Exception;

class WorkflowAiGeneratorServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        
        // Mock config
        config(['longcat.api_keys' => ['key1', 'key2', 'key3']]);
        config(['longcat.base_url' => 'https://api.test/v1']);
    }

    public function test_it_rotates_on_429_and_eventually_succeeds()
    {
        Http::fake([
            'https://api.test/v1' => Http::sequence()
                ->push(['error' => 'Rate limit'], 429) // key1 fails
                ->push(['error' => 'Rate limit'], 429) // key2 fails
                ->push([
                    'choices' => [
                        ['message' => ['content' => 'Success with key3']]
                    ]
                ], 200)
        ]);

        $service = new WorkflowAiGeneratorService();
        
        // Use reflection to call protected method for testing
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('makeApiRequest');
        $method->setAccessible(true);

        $result = $method->invoke($service, [['role' => 'user', 'content' => 'test']]);

        $this->assertEquals('Success with key3', $result);
        $this->assertEquals(2, Cache::get('longcat_current_key_index'));
    }

    public function test_it_retries_on_500_before_rotating()
    {
        Http::fake([
            'https://api.test/v1' => Http::sequence()
                ->push(['error' => 'Server error'], 500) // key1 retry 1
                ->push(['error' => 'Server error'], 500) // key1 retry 2
                ->push(['error' => 'Server error'], 500) // key1 finally fails, rotate to key2
                ->push([
                    'choices' => [
                        ['message' => ['content' => 'Success with key2']]
                    ]
                ], 200)
        ]);

        $service = new WorkflowAiGeneratorService();
        
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('makeApiRequest');
        $method->setAccessible(true);

        // We set retriesPerKey to 1 for faster test
        $result = $method->invoke($service, [['role' => 'user', 'content' => 'test']], 1);

        $this->assertEquals('Success with key2', $result);
        $this->assertEquals(1, Cache::get('longcat_current_key_index'));
    }

    public function test_it_throws_exception_when_all_keys_exhausted()
    {
        Http::fake([
            'https://api.test/v1' => Http::response(['error' => 'Rate limit'], 429)
        ]);

        $service = new WorkflowAiGeneratorService();
        
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('makeApiRequest');
        $method->setAccessible(true);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('All LongCat API keys are exhausted.');

        $method->invoke($service, [['role' => 'user', 'content' => 'test']]);
    }

    public function test_it_wraps_around_keys()
    {
        Cache::put('longcat_current_key_index', 2); // Start at last key (key3)
        
        Http::fake([
            'https://api.test/v1' => Http::sequence()
                ->push(['error' => 'Rate limit'], 429) // key3 fails, rotate to key1 (wrap)
                ->push([
                    'choices' => [
                        ['message' => ['content' => 'Success with key1']]
                    ]
                ], 200)
        ]);

        $service = new WorkflowAiGeneratorService();
        
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('makeApiRequest');
        $method->setAccessible(true);

        $result = $method->invoke($service, [['role' => 'user', 'content' => 'test']]);

        $this->assertEquals('Success with key1', $result);
        $this->assertEquals(0, Cache::get('longcat_current_key_index'));
    }
}
