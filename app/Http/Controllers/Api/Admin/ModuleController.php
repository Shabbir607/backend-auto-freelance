<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ModuleRequest;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(ModuleRequest $request)
    {
        $data = array_filter($request->all(), fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));
        $module = Module::create($data);
        return new ModuleResource($module);
    }

    public function update(ModuleRequest $request, Module $module)
    {
        $data = array_filter($request->all(), fn($value) => !($value instanceof \Illuminate\Http\UploadedFile));
        $module->update($data);
        return new ModuleResource($module);
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(['message' => 'Module deleted successfully']);
    }
}
