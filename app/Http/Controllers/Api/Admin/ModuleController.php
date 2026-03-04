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
        $module = Module::create($request->validated());
        return new ModuleResource($module);
    }

    public function update(ModuleRequest $request, Module $module)
    {
        $module->update($request->validated());
        return new ModuleResource($module);
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(['message' => 'Module deleted successfully']);
    }
}
