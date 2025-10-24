<?php
use Illuminate\Support\Facades\Route;


Route::get('/test', function () {
    return response()->json(['message' => 'API ishlayapti!']);
});

Route::get('/ping', function () {
    return response()->json(['status' => 'API ishlayapti!']);
});
