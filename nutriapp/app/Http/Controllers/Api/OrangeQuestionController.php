<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrangeQuestion;
use Illuminate\Http\Request;

class OrangeQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = OrangeQuestion::all();
        return response()->json($questions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $question = OrangeQuestion::create($request->all());
        return response()->json($question, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(OrangeQuestion $orangeQuestion)
    {
        return response()->json($orangeQuestion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrangeQuestion $orangeQuestion)
    {
        $orangeQuestion->update($request->all());
        return response()->json($orangeQuestion, 200); // 200 OK
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrangeQuestion $orangeQuestion)
    {
        $orangeQuestion->delete();
        return response()->json(null, 204); // 204 No Content (recurso deletado com sucesso)
    }
}