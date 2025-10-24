<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminBookController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public book routes
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);

// Protected routes (requires authentication)
Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Book download (authenticated users only)
    Route::get('/books/{id}/download', [BookController::class, 'download']);

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::post('/books', [AdminBookController::class, 'store']);
        Route::post('/books/{id}', [AdminBookController::class, 'update']);
        Route::delete('/books/{id}', [AdminBookController::class, 'destroy']);
    });
});
