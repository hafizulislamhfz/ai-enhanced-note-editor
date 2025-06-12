<?php

use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('login');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);
