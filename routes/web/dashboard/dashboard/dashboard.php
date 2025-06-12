<?php

use App\Http\Controllers\Web\Dashboard\Dashboard\DashboardController;

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
