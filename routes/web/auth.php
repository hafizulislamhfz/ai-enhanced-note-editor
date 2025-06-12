<?php

use App\Http\Controllers\Web\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Web\Auth\GoogleAuthController;

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('login');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
