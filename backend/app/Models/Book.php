<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'description',
        'cover_image',
        'pdf_file',
        'pages',
        'isbn',
        'published_year',
        'is_premium',
        'rating',
        'rating_count',
    ];

    protected $casts = [
        'published_year' => 'integer',
        'pages' => 'integer',
        'is_premium' => 'boolean',
        'rating' => 'float',
        'rating_count' => 'integer',
    ];

    protected $appends = ['cover_image_url', 'pdf_file_url'];

    public function getCoverImageUrlAttribute(): ?string
    {
        if ($this->cover_image) {
            return asset('storage/' . $this->cover_image);
        }
        return null;
    }

    public function getPdfFileUrlAttribute(): string
    {
        return asset('storage/' . $this->pdf_file);
    }

    public function ratings()
    {
        return $this->hasMany(BookRating::class);
    }

    public function updateRating()
    {
        $avgRating = $this->ratings()->avg('rating');
        $count = $this->ratings()->count();

        $this->update([
            'rating' => $avgRating ?: 0,
            'rating_count' => $count,
        ]);
    }
}
