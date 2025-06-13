<?php

namespace App\Http\Controllers\Web\Dashboard\Note;

use App\Http\Controllers\Controller;
use App\Models\Note\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 5);
        $search = $request->query('search');

        $notes = auth()->user()->notes()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest()->paginate(perPage: $perPage, page: $page)
            ->withQueryString();

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
