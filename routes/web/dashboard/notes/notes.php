<?php

use App\Http\Controllers\Web\Dashboard\Note\NoteController;

Route::resource('notes', NoteController::class)
    ->only(['index', 'store', 'update', 'destroy']);
