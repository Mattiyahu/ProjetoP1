<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\R24hQuestionnaireItem;
use Illuminate\Http\Request;

class R24hQuestionnaireItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = R24hQuestionnaireItem::with('section')->orderBy('order')->get(); // Carrega a seção relacionada e ordena por 'order'
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = R24hQuestionnaireItem::create($request->all());
        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(R24hQuestionnaireItem $r24hQuestionnaireItem)
    {
        return response()->json($r24hQuestionnaireItem->load('section')); // Carrega a seção relacionada
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, R24hQuestionnaireItem $r24hQuestionnaireItem)
    {
        $r24hQuestionnaireItem->update($request->all());
        return response()->json($r24hQuestionnaireItem, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(R24hQuestionnaireItem $r24hQuestionnaireItem)
    {
        $r24hQuestionnaireItem->delete();
        return response()->json(null, 204);
    }
}