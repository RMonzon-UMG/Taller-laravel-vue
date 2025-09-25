<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TareaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas para el controlador de usuarios, asignando nombres personalizados

Route::middleware('auth:sanctum')->prefix('usuarios')->group(function () {
    Route::get('/listUsers', [UsuarioController::class, 'index']);
    Route::post('/addUser', [UsuarioController::class, 'store']);
    Route::get('/getUser/{id}', [UsuarioController::class, 'show']);
    Route::put('/updateUser/{id}', [UsuarioController::class, 'update']);
    Route::delete('/deleteUser/{id}', [UsuarioController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('tareas')->group(function () {
    Route::get('/listTareas', [TareaController::class, 'index']);
    Route::post('/addTarea', [TareaController::class, 'store']);
    Route::get('/getTarea/{id}', [TareaController::class, 'show']);
    Route::put('/updateTarea/{id}', [TareaController::class, 'update']);
    Route::delete('/deleteTarea/{id}', [TareaController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
