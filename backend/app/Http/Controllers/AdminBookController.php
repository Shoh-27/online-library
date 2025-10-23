<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminBookController extends Controller
{
    /**
     * Store a new book
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'pdf_file' => 'required|file|mimes:pdf|max:51200', // Max 50MB
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120', // Max 5MB
            'pages' => 'nullable|integer|min:1',
            'isbn' => 'nullable|string|max:20',
            'published_year' => 'nullable|integer|min:1000|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle PDF upload
        $pdfPath = $request->file('pdf_file')->store('books/pdfs', 'public');

        // Handle cover image upload
        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('books/covers', 'public');
        }

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'description' => $request->description,
            'pdf_file' => $pdfPath,
            'cover_image' => $coverPath,
            'pages' => $request->pages ?? 0,
            'isbn' => $request->isbn,
            'published_year' => $request->published_year,
        ]);

        $book->cover_image_url = $book->cover_image_url;
        $book->pdf_file_url = $book->pdf_file_url;

        return response()->json([
            'success' => true,
            'message' => 'Book created successfully',
            'data' => $book,
        ], 201);
    }

    /**
     * Update existing book
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:51200',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'pages' => 'nullable|integer|min:1',
            'isbn' => 'nullable|string|max:20',
            'published_year' => 'nullable|integer|min:1000|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle PDF upload if new file provided
        if ($request->hasFile('pdf_file')) {
            // Delete old PDF
            if ($book->pdf_file) {
                Storage::disk('public')->delete($book->pdf_file);
            }
            $book->pdf_file = $request->file('pdf_file')->store('books/pdfs', 'public');
        }

        // Handle cover image upload if new file provided
        if ($request->hasFile('cover_image')) {
            // Delete old cover
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $book->cover_image = $request->file('cover_image')->store('books/covers', 'public');
        }

        $book->update([
            'title' => $request->title,
            'author' => $request->author,
            'description' => $request->description,
            'pages' => $request->pages ?? $book->pages,
            'isbn' => $request->isbn,
            'published_year' => $request->published_year,
        ]);

        $book->cover_image_url = $book->cover_image_url;
        $book->pdf_file_url = $book->pdf_file_url;

        return response()->json([
            'success' => true,
            'message' => 'Book updated successfully',
            'data' => $book,
        ]);
    }

    /**
     * Delete book
     */
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        // Delete files
        if ($book->pdf_file) {
            Storage::disk('public')->delete($book->pdf_file);
        }
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Book deleted successfully',
        ]);
    }
}
