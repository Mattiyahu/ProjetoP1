<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EducationalContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationalContentController extends Controller
{
    public function index()
    {
        $contents = EducationalContent::with('user')->latest()->get();
        return response()->json($contents);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'content_type' => 'required|string',
            'status' => 'required|in:draft,published'
        ]);

        $validated['user_id'] = Auth::id();

        $content = EducationalContent::create($validated);

        return response()->json($content, 201);
    }

    public function show(EducationalContent $content)
    {
        return response()->json($content->load('user'));
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

        return response()->json($content);
    }

    public function destroy(EducationalContent $content)
    {
        $this->authorize('delete', $content);
        
        $content->delete();

        return response()->json(null, 204);
    }
}
