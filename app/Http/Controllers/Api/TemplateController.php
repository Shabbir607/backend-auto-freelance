<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TemplateController extends Controller
{
    public function index(Request $request)
    {
        $query = Template::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Optionally filter by user if needed, or allow admins to see all
        // $query->where('user_id', Auth::id());

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:email,resume',
            'content' => 'nullable|array',
            'html' => 'nullable|string',
        ]);

        $template = Template::create([
            'uuid' => Str::uuid(),
            'user_id' => Auth::id(),
            'name' => $request->name,
            'type' => $request->type,
            'content' => $request->content,
            'html' => $request->html,
        ]);

        return response()->json($template, 201);
    }

    public function show($uuid)
    {
        $template = Template::where('uuid', $uuid)->firstOrFail();
        return response()->json($template);
    }

    public function update(Request $request, $uuid)
    {
        $template = Template::where('uuid', $uuid)->firstOrFail();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'content' => 'nullable|array',
            'html' => 'nullable|string',
        ]);

        $template->update($request->only(['name', 'content', 'html']));

        return response()->json($template);
    }

    public function destroy($uuid)
    {
        $template = Template::where('uuid', $uuid)->firstOrFail();
        $template->delete();

        return response()->json(['message' => 'Template deleted successfully']);
    }
}
