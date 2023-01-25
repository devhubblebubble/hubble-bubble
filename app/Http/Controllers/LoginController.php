<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{

    public function adminLogin(){
        return view('admin.sign-in');
    }

    public function login(Request $req){
        $req->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $email = $req->input('email');
        $password = $req->input('password');
        $email = trim($email);
        $password = trim($password);
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            session([
                'auth' => Auth::user()
            ]);
            return response()->json(['status' => "success", 'data' =>' You Have Successfully Logged In!']);
        } else {
            return response()->json(['status' => "error", 'data' =>'Login failed. Please check your credentials.']);
        }
    }

    public function logOut()
    {
        Auth::logout();
        Session::flush();

        return response()->json(['status' => "success", 'data' =>[]]);
    }
    
}
