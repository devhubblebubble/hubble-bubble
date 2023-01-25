<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(session('auth')){
            if(Auth::user()){
                return $next($request);
            } else{
                return redirect('/admin/login'); 
            }  
        }               
        return redirect('/admin/login');
        
    }
}
