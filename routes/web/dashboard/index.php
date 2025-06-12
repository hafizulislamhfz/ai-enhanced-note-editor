<?php

Route::middleware(['auth'])->group(function () {
    require 'dashboard/dashboard.php';
    require 'notes/notes.php';
});
