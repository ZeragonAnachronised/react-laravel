<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Contracts\HasApiTokens;

class UserController extends Controller
{
    public function reg(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8'
        ], [
            'email.unique' => 'Этот емейл уже занят',
            'email.required' => 'Емейл не введен',
            'email.email' => 'Емейл введен неверно'
        ]);
        if($validator->fails())
        {
            $errors = $validator->errors();
            return response()->json([
                'error' => [
                    'code' => 422,
                    'message' => 'Ошибка валидации',
                    'errors' => $errors
                ]
            ], 422);
        }
        else
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'admin' => false
            ]);
            $token = $user->createToken('api_token')->plainTextToken;
            return response()->json([
                'data' => [
                    'user_token' => $token
                ]
            ], 201);
        }
    }
    public function auth(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ], [
            'email.required' => 'Емейл не введен',
            'email.email' => 'Емейл введен неверно'
        ]);
        if($validator->fails())
        {
            $errors = $validator->errors();
            return response()->json([
                'error' => [
                    'code' => 422,
                    'message' => 'Ошибка валидации',
                    'errors' => $errors
                ]
            ], 422);
        }
        else
        {
            if(Auth::attempt($validator->valid()))
            {
                $user = Auth::user();
                $token = $user->createToken('api_token')->plainTextToken;
                $name = $user->name;
                return response()->json([
                    'Всё круто' => 'зашибись)',
                    'token' => $token,
                    'name' => $name
                ], 201);
            }
            else {
                return response()->json([
                    'error' => [
                        'code' => 422,
                        'message' => 'Неа'
                    ]
                ], 422);
            }
        }
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'success' => true,
            'message' => 'log out'
        ], 201);
    }
}
