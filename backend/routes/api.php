<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/create/blog', [BlogController::class, 'createBlog']);

    Route::get('/blog', [BlogController::class, 'fetchAllBlog']);
    Route::delete('/blog/delete/{id}', [BlogController::class, 'destroy']);
    Route::post('/blogs/{id}', [BlogController::class, 'update']); 

    Route::get('/blog/{id}', [BlogController::class, 'fetchBlog']);
});
