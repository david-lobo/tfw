<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class WebParamResponse
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request  $request
     * @param \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $menu = \App\Http\Controllers\SiteBaseController::getMenu();
        $manageMenu = \App\Http\Controllers\SiteBaseController::getManageMenu();

        //This variable is available globally on all the views, and sub-views
        view()->share('menu', $menu);
        view()->share('manageMenu', $manageMenu);

        return $next($request);
    }
}
