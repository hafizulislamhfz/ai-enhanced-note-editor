<?php

namespace App\Http\Controllers\Web\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('guest/welcome');
    }
}
