<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::create([
            'title' => 'Atomic Habits',
            'author' => 'James Clear',
            'description' => 'An easy and proven way to build good habits and break bad ones.',
            'cover_image' => 'covers/atomic_habits.jpg',
            'pdf_file' => 'books/atomic_habits.pdf',
            'pages' => 320,
            'isbn' => '9780735211292',
            'published_year' => 2018,
        ]);

        Book::create([
            'title' => 'Deep Work',
            'author' => 'Cal Newport',
            'description' => 'Rules for focused success in a distracted world.',
            'cover_image' => 'covers/deep_work.jpg',
            'pdf_file' => 'books/deep_work.pdf',
            'pages' => 296,
            'isbn' => '9781455586691',
            'published_year' => 2016,
        ]);

        Book::create([
            'title' => 'The Pragmatic Programmer',
            'author' => 'Andrew Hunt, David Thomas',
            'description' => 'Your journey to mastery in software craftsmanship.',
            'cover_image' => 'covers/pragmatic_programmer.jpg',
            'pdf_file' => 'books/pragmatic_programmer.pdf',
            'pages' => 352,
            'isbn' => '9780201616224',
            'published_year' => 1999,
        ]);

        Book::create([
            'title' => 'Clean Code',
            'author' => 'Robert C. Martin',
            'description' => 'A handbook of agile software craftsmanship.',
            'cover_image' => 'covers/clean_code.jpg',
            'pdf_file' => 'books/clean_code.pdf',
            'pages' => 464,
            'isbn' => '9780132350884',
            'published_year' => 2008,
        ]);

        Book::create([
            'title' => 'Thinking, Fast and Slow',
            'author' => 'Daniel Kahneman',
            'description' => 'A groundbreaking tour of the mind and how we think.',
            'cover_image' => 'covers/thinking_fast_and_slow.jpg',
            'pdf_file' => 'books/thinking_fast_and_slow.pdf',
            'pages' => 499,
            'isbn' => '9780374533557',
            'published_year' => 2011,
        ]);
    }
}
