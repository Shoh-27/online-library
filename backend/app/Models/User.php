<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Carbon\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'subscription_type',
        'subscription_expires_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'subscription_expires_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,
            'subscription_type' => $this->subscription_type,
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isPremium(): bool
    {
        if ($this->subscription_type === 'premium') {
            // Agar subscription muddati o'tmagan bo'lsa
            if ($this->subscription_expires_at && $this->subscription_expires_at->isFuture()) {
                return true;
            }
            // Muddat o'tgan bo'lsa, free'ga o'tkazish
            if ($this->subscription_expires_at && $this->subscription_expires_at->isPast()) {
                $this->update(['subscription_type' => 'free']);
                return false;
            }
        }
        return false;
    }

    public function bookRatings()
    {
        return $this->hasMany(BookRating::class);
    }

    public function hasRatedBook($bookId): bool
    {
        return $this->bookRatings()->where('book_id', $bookId)->exists();
    }

    public function getRatingForBook($bookId)
    {
        return $this->bookRatings()->where('book_id', $bookId)->first();
    }
}
