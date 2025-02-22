<?php

namespace App\Http\Controllers;

use App\Models\EducationalContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class EducationalContentController extends Controller
{
    protected $strapiUrl = 'http://localhost:1337/api';

    public function index()
    {
        // Busca conteúdos do Strapi
        $response = Http::get($this->strapiUrl . '/posts');
        $contents = $response->json()['data'] ?? [];

        return Inertia::render('EducationalContent', [
            'contents' => $contents
        ]);
    }

    public function create()
    {
        return Inertia::render('EducationalContent/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'image_url' => 'nullable|url',
            'tags' => 'nullable|string',
            'status' => 'required|string|in:draft,published',
        ]);

        // Envia dados para o Strapi
        $response = Http::post($this->strapiUrl . '/posts', [
            'data' => $request->all()
        ]);

        if ($response->successful()) {
            return redirect()->route('educational-content')->with('success', 'Conteúdo criado com sucesso!');
        }

        return back()->withErrors(['error' => 'Erro ao criar conteúdo.']);
    }

    public function edit($id)
    {
        $response = Http::get($this->strapiUrl . '/posts/' . $id);
        
        if ($response->successful()) {
            $content = $response->json()['data'];
            return Inertia::render('EducationalContent/Edit', [
                'content' => $content
            ]);
        }

        return redirect()->route('educational-content')->withErrors(['error' => 'Conteúdo não encontrado.']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'image_url' => 'nullable|url',
            'tags' => 'nullable|string',
            'status' => 'required|string|in:draft,published',
        ]);

        // Atualiza dados no Strapi
        $response = Http::put($this->strapiUrl . '/posts/' . $id, [
            'data' => $request->all()
        ]);

        if ($response->successful()) {
            return redirect()->route('educational-content')->with('success', 'Conteúdo atualizado com sucesso!');
        }

        return back()->withErrors(['error' => 'Erro ao atualizar conteúdo.']);
    }

    public function destroy($id)
    {
        // Remove conteúdo do Strapi
        $response = Http::delete($this->strapiUrl . '/posts/' . $id);

        if ($response->successful()) {
            return redirect()->route('educational-content')->with('success', 'Conteúdo removido com sucesso!');
        }

        return back()->withErrors(['error' => 'Erro ao remover conteúdo.']);
    }
}
