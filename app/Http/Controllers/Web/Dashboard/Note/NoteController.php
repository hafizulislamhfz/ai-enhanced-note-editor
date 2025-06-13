<?php

namespace App\Http\Controllers\Web\Dashboard\Note;

use App\Http\Controllers\Controller;
use App\Models\Note\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        $notes = auth()->user()->notes()->latest()->get();

        return Inertia::render('dashboard/notes/index', [
            'notes' => $notes,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:10000'],
        ]);

        $request->user()->notes()->create($validatedData);

        return redirect()->back();
    }

    public function update(Request $request, Note $note)
    {
        // $this->authorize('update', $note);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:10000'],
        ]);

        $note->update($validatedData);

        return redirect()->back();
    }

    public function destroy(Note $note)
    {
        // $this->authorize('delete', $note);
        $note->delete();

        return redirect()->back();
    }
}
