<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::all(); // Ou use paginação para grandes volumes de dados
        return response()->json($foods);
    }

    // ... (Você pode adicionar outros métodos CRUD se precisar, como show, store, update, destroy)
}