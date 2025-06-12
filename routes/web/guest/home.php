<?php

use App\Http\Controllers\Web\Guest\HomeController;

Route::get('/', [HomeController::class, 'home'])->name('home');
