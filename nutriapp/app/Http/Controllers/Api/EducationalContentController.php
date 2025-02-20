<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EducationalContent;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EducationalContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = EducationalContent::latest()->paginate(10); // Paginação para listar os conteúdos
        return response()->json($contents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'content_type' => 'nullable|string|max:50', // Opcional: validação do tipo de conteúdo
        ]);

        $content = EducationalContent::create($request->all());
        return response()->json($content, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EducationalContent $educationalContent)
    {
        return response()->json($educationalContent);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EducationalContent $educationalContent)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'content_type' => 'nullable|string|max:50', // Opcional: validação do tipo de conteúdo
        ]);

        $educationalContent->update($request->all());
        return response()->json($educationalContent, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EducationalContent $educationalContent)
    {
        $educationalContent->delete();
        return response()->json(null, 204);
    }
}