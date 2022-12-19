<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test', [\App\Http\Controllers\Api\AuthController::class, "index"]);
Route::post('/signup', [\App\Http\Controllers\Api\AuthController::class, 'processSignup']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'processLogin']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'processLogout']);
    Route::group(["prefix" => "todo"], function () {
        Route::get("/", [\App\Http\Controllers\Api\ToDoController::class, 'index']);
        Route::get("/{id}/getTask", [\App\Http\Controllers\Api\ToDoController::class, 'getTaskById']);
        Route::post("/add", [\App\Http\Controllers\Api\ToDoController::class, 'add']);
        Route::post("/{id}/update", [\App\Http\Controllers\Api\ToDoController::class, 'update']);
        Route::post("/{id}/delete", [\App\Http\Controllers\Api\ToDoController::class, 'delete']);
    });
    Route::group(["prefix" => "reminder"], function () {
        Route::get("/{id}", [\App\Http\Controllers\Api\ToDoController::class, 'getReminder']);
        Route::post("/{id}/update", [\App\Http\Controllers\Api\ToDoController::class, 'updateReminder']);
    });

    Route::group(["prefix" => "music"], function () {
        Route::get("/", [\App\Http\Controllers\Api\MusicController::class, 'index']);
        Route::get("/getMusic", [\App\Http\Controllers\Api\MusicController::class, 'getMusicById']);
        Route::post("/add", [\App\Http\Controllers\Api\MusicController::class, 'add']);
        Route::post("/{id}/update", [\App\Http\Controllers\Api\MusicController::class, 'update']);
        Route::post("/{id}/delete", [\App\Http\Controllers\Api\MusicController::class, 'delete']);
    });
});

