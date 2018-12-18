<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ClearanceMiddleware
{
   /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user()->hasPermissionTo('Manage')) {
            return $next($request);
        }

        $method = $request->method();

        if (in_array($method, ['POST', 'PUT', 'DELETE', 'PATCH'])) {
            if (!Auth::user()->hasPermissionTo('Manage')) {
                $response = [
                    'success' => false,
                    'message' => 'Not Authorized',
                ];

                return response()->json($response, 401);
            } else {
                return $next($request);
            }
        }

        return $next($request);
    }
}
