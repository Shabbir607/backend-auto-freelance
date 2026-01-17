<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class OAuthState extends Model
{
    protected $table = 'oauth_states';
    
    protected $fillable = [
        'user_id',
        'state',
        'provider',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    /**
     * Relationship to User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for active (non-expired) states
     */
    public function scopeActive($query)
    {
        return $query->where('expires_at', '>', now());
    }

    /**
     * Generate a unique state token for a user
     */
    public static function generateForUser(int $userId, string $provider = 'google', int $expiresInMinutes = 5): self
    {
        // Clean up expired states for this user
        self::where('user_id', $userId)
            ->where('expires_at', '<', now())
            ->delete();

        // Generate unique state token
        $state = Str::random(64);

        return self::create([
            'user_id' => $userId,
            'state' => $state,
            'provider' => $provider,
            'expires_at' => now()->addMinutes($expiresInMinutes),
        ]);
    }

    /**
     * Validate and retrieve user from state token
     */
    public static function validateAndGetUser(string $state): ?User
    {
        $oauthState = self::active()
            ->where('state', $state)
            ->first();

        if (!$oauthState) {
            return null;
        }

        $user = $oauthState->user;
        
        // Delete the used state (one-time use)
        $oauthState->delete();

        return $user;
    }
}
