<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        // Hardcoded Admin Credentials
        $adminEmail = 'admin@example.com';
        $adminPassword = 'admin@123';
    
        if ($request->email === $adminEmail && $request->password === $adminPassword) {
          
            $adminUser = User::firstOrCreate(
                ['email' => $adminEmail],
                ['password' => bcrypt($adminPassword), 'name' => 'Admin']
            );
    
           
            $token = $adminUser->createToken('admin-token')->plainTextToken;
    
            return response()->json([
                'message' => 'Admin logged in successfully',
                'token' => $token,
                'user' => [
                    'email' => $adminEmail,
                    'role' => 'admin'
                ]
            ], 200);
        }
    
        // Authenticate regular users
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], 200);
    }
    

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
