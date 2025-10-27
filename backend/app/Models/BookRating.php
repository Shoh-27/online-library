<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'rating',
        'review',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    // Rating saqlanganidan keyin kitob ratingini yangilash
    protected static function booted()
    {
        static::created(function ($rating) {
            $rating->book->updateRating();
        });

        static::updated(function ($rating) {
            $rating->book->updateRating();
        });

        static::deleted(function ($rating) {
            $rating->book->updateRating();
        });
    }
}
