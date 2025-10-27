<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    /**
     * Kitobga rating berish yoki yangilash
     */
    public function store(Request $request, $bookId)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $book = Book::find($bookId);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ], 404);
        }

        // Mavjud ratingni yangilash yoki yangi yaratish
        $rating = BookRating::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'book_id' => $bookId,
            ],
            [
                'rating' => $request->rating,
                'review' => $request->review,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Rating saved successfully',
            'data' => $rating,
        ]);
    }

    /**
     * Ratingni o'chirish
     */
    public function destroy($bookId)
    {
        $rating = BookRating::where('user_id', auth()->id())
            ->where('book_id', $bookId)
            ->first();

        if (!$rating) {
            return response()->json([
                'success' => false,
                'message' => 'Rating not found',
            ], 404);
        }

        $rating->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rating deleted successfully',
        ]);
    }
}
