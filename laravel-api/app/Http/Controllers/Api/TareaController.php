<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tareas = Tarea::with('usuario')->orderBy('created_at', 'desc')->get();
        return response()->json($tareas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => ['required', Rule::in(['pendiente', 'en_proceso', 'completada'])],
            'fecha_vencimiento' => 'nullable|date',
            'prioridad' => ['required', Rule::in(['baja', 'media', 'alta'])],
            'usuario_id' => 'required|exists:usuarios,id',
        ]);

        $tarea = Tarea::create($validated);
        
        if (!$tarea) {
            return response()->json([
                'message' => 'Error al crear la tarea',
                'status' => false
            ], 500);
        }

        return response()->json([
            'message' => 'Tarea creada correctamente',
            'data' => $tarea->load('usuario'),
            'status' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tarea = Tarea::with('usuario')->findOrFail($id);
        return response()->json($tarea);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tarea = Tarea::findOrFail($id);

        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => ['sometimes', 'required', Rule::in(['pendiente', 'en_proceso', 'completada'])],
            'fecha_vencimiento' => 'nullable|date',
            'prioridad' => ['sometimes', 'required', Rule::in(['baja', 'media', 'alta'])],
            'usuario_id' => 'sometimes|required|exists:usuarios,id',
        ]);

        $tarea->update($validated);

        return response()->json([
            'message' => 'Tarea actualizada correctamente',
            'data' => $tarea->load('usuario')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tarea = Tarea::findOrFail($id);
        $tarea->delete();

        return response()->json([
            'message' => 'Tarea eliminada correctamente',
            'status' => true
        ], 200);
    }
}
