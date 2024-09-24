<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

Route::post('/reg', [UserController::class, 'reg']);
Route::post('/auth', [UserController::class, 'auth']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [UserController::class, 'logout']);
});
