<?php

namespace App\Http\Controllers;

use App\Models\EducationalContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationalContentController extends Controller
{
    public function index()
    {
        $contents = EducationalContent::with('user')->latest()->get();
        return Inertia::render('EducationalContent/Index', [
            'contents' => $contents
        ]);
    }

    public function create()
    {
        return Inertia::render('EducationalContent');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'content_type' => 'required|string',
            'status' => 'required|in:draft,published'
        ]);

        $validated['user_id'] = auth()->id();

        $content = EducationalContent::create($validated);

        return redirect()->route('educational.content.index')
            ->with('message', 'Conteúdo criado com sucesso!');
    }

    public function edit(EducationalContent $content)
    {
        return Inertia::render('EducationalContent/Edit', [
            'content' => $content
        ]);
    }

    public function update(Request $request, EducationalContent $content)
    {
        $this->authorize('update', $content);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'content_type' => 'required|string',
            'status' => 'required|in:draft,published'
        ]);

        $content->update($validated);

        return redirect()->route('educational.content.index')
            ->with('message', 'Conteúdo atualizado com sucesso!');
    }

    public function destroy(EducationalContent $content)
    {
        $this->authorize('delete', $content);
        
        $content->delete();

        return redirect()->route('educational.content.index')
            ->with('message', 'Conteúdo excluído com sucesso!');
    }
}
