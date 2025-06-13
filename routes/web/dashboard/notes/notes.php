<?php

use App\Http\Controllers\Web\Dashboard\Note\NoteAiController;
use App\Http\Controllers\Web\Dashboard\Note\NoteController;

Route::post('notes/ai/generate', NoteAiController::class)
    ->middleware('throttle:10,30')
    ->name('notes.ai.generate');

Route::resource('notes', NoteController::class)
    ->only(['index', 'store', 'update', 'destroy']);
