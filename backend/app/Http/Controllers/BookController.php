<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Get all books with pagination and search
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 12);
        $search = $request->get('search', '');

        $query = Book::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $books = $query->latest()->paginate($perPage);

        // Add full URLs to the response
        $books->getCollection()->transform(function ($book) {
            $book->cover_image_url = $book->cover_image_url;
            $book->pdf_file_url = $book->pdf_file_url;
            return $book;
        });

        return response()->json([
            'success' => true,
            'data' => $books,
        ]);
    }

    /**
     * Get single book details
     */
    public function show($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        $book->cover_image_url = $book->cover_image_url;
        $book->pdf_file_url = $book->pdf_file_url;

        return response()->json([
            'success' => true,
            'data' => $book,
        ]);
    }

    /**
     * Download book PDF
     */
    public function download($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        $filePath = storage_path('app/public/' . $book->pdf_file);

        if (!file_exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found',
            ], 404);
        }

        return response()->download($filePath, $book->title . '.pdf');
    }
}
