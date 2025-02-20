<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurpleQuestion;
use Illuminate\Http\Request;

class PurpleQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = PurpleQuestion::all();
        return response()->json($questions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $question = PurpleQuestion::create($request->all());
        return response()->json($question, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(PurpleQuestion $purpleQuestion)
    {
        return response()->json($purpleQuestion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PurpleQuestion $purpleQuestion)
    {
        $purpleQuestion->update($request->all());
        return response()->json($purpleQuestion, 200); // 200 OK
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurpleQuestion $purpleQuestion)
    {
        $purpleQuestion->delete();
        return response()->json(null, 204); // 204 No Content (recurso deletado com sucesso)
    }
}