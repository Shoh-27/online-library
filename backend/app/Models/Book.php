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
    ];

    protected $casts = [
        'published_year' => 'integer',
        'pages' => 'integer',
    ];

    /**
     * Get the full URL for the cover image
     */
    public function getCoverImageUrlAttribute(): ?string
    {
        if ($this->cover_image) {
            return asset('storage/' . $this->cover_image);
        }
        return null;
    }

    /**
     * Get the full URL for the PDF file
     */
    public function getPdfFileUrlAttribute(): string
    {
        return asset('storage/' . $this->pdf_file);
    }
}
