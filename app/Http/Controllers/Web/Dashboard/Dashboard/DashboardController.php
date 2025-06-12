<?php

namespace App\Http\Controllers\Web\Dashboard\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $notesCount = auth()->user()->notes()->count();

        return Inertia::render('dashboard/dashboard/index', [
            'notesCount' => $notesCount,
        ]);
    }
}
