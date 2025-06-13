<?php

namespace App\Http\Controllers\Web\Dashboard\Note;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NoteAiController extends Controller
{
    public function __invoke(Request $request)
    {
        $validatedData = $request->validate([
            'mode' => ['required', 'in:generate-title,generate-content'],
            'title' => ['required_if:mode,generate-content', 'string', 'max:255'],
            'content' => ['required_if:mode,generate-title', 'string', 'max:10000'],
        ], [
            'title.required_if' => 'The title is required when generating content.',
            'title.max' => 'The title may not be greater than 255 characters.',

            'content.required_if' => 'The content is required when generating title.',
            'content.max' => 'The content may not be greater than 10000 characters.',
        ]);

        try {
            $prompt = match ($validatedData['mode']) {
                'generate-title' => 'Generate a concise, relevant, and clear title for this note content: '.$validatedData['content'],
                'generate-content' => 'Expand the following title into a full note content with meaningful elaboration. Do not include the title itself in the response: '.$validatedData['title'],
            };

            $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/responses', [
                'model' => 'gpt-4.1-nano-2025-04-14',
                'input' => [
                    ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            if (! $response->ok()) {
                return redirect()->back()->withErrors(['message' => "Failed to {$validatedData['mode']}."]);
            }

            $aiText = trim($response->json('output.0.content.0.text') ?? '');

            return redirect()->back()->with('data', $aiText);
        } catch (\Exception) {

            return redirect()->back()->withErrors(['message' => "Failed to {$validatedData['mode']}."]);
        }
    }
}
