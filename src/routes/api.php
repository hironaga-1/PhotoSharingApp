<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [Controllers\Auth\RegisterController::class, 'register'])->name('register');
Route::post('/login', [Controllers\Auth\LoginController::class, 'login'])->name('login');
Route::post('/logout', [Controllers\Auth\LoginController::class, 'logout'])->name('logout');
Route::get('/user', fn() => Auth::user())->name('user');
