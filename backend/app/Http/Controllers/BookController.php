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
        $filter = $request->get('filter', 'all'); // all, free, premium

        $query = Book::query();

        // Search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by type (free/premium)
        if ($filter === 'free') {
            $query->where('is_premium', false);
        } elseif ($filter === 'premium') {
            $query->where('is_premium', true);
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
        // Kitobni ratings bilan birga olish
        $book = Book::with(['ratings' => function($query) {
            $query->with('user:id,name')->latest()->take(10);
        }])->find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        $book->cover_image_url = $book->cover_image_url;
        $book->pdf_file_url = $book->pdf_file_url;

        // Agar user login qilgan bo'lsa, uning rating'ini ham qo'shamiz
        if (auth()->check()) {
            $book->user_rating = auth()->user()->getRatingForBook($id);
        }

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

        // Premium kitob tekshiruvi
        if ($book->is_premium) {
            // Agar user login qilmagan bo'lsa
            if (!auth()->check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please login to download this book',
                ], 401);
            }

            // Agar premium bo'lmasa
            if (!auth()->user()->isPremium() && !auth()->user()->isAdmin()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This book requires a premium subscription',
                    'is_premium_required' => true,
                ], 403);
            }
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
