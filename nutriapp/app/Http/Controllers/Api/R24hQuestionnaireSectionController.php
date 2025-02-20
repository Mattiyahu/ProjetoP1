<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\R24hQuestionnaireSection;
use Illuminate\Http\Request;

class R24hQuestionnaireSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = R24hQuestionnaireSection::with('items')->orderBy('order')->get(); // Carrega os items relacionados e ordena por 'order'
        return response()->json($sections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $section = R24hQuestionnaireSection::create($request->all());
        return response()->json($section, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(R24hQuestionnaireSection $r24hQuestionnaireSection)
    {
        return response()->json($r24hQuestionnaireSection->load('items')); // Carrega os items relacionados
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, R24hQuestionnaireSection $r24hQuestionnaireSection)
    {
        $r24hQuestionnaireSection->update($request->all());
        return response()->json($r24hQuestionnaireSection, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(R24hQuestionnaireSection $r24hQuestionnaireSection)
    {
        $r24hQuestionnaireSection->delete();
        return response()->json(null, 204);
    }
}