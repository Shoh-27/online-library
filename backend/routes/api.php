<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminBookController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SubscriptionController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Guest - Public book routes (faqat ko'rish)
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);

// Protected routes (authenticated users)
Route::middleware('auth:api')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Book actions (download - requires auth)
    Route::get('/books/{id}/download', [BookController::class, 'download']);

    // Ratings
    Route::post('/books/{id}/rate', [RatingController::class, 'store']);
    Route::delete('/books/{id}/rate', [RatingController::class, 'destroy']);

    // Subscription
    Route::prefix('subscription')->group(function () {
        Route::post('/subscribe', [SubscriptionController::class, 'subscribe']);
        Route::post('/cancel', [SubscriptionController::class, 'cancel']);
        Route::get('/status', [SubscriptionController::class, 'status']);
    });

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::post('/books', [AdminBookController::class, 'store']);
        Route::post('/books/{id}', [AdminBookController::class, 'update']);
        Route::delete('/books/{id}', [AdminBookController::class, 'destroy']);
    });
});
