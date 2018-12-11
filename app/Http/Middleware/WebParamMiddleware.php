<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class WebParamResponse
{
    /**
     - Handle an incoming request.
     *
     - @param  \Illuminate\Http\Request  $request
     - @param  \Closure  $next
     - @param  string|null  $guard
     - @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
       //$request->merge(array("all_categories" => "abc"));
        //$request['all_categories']= 'abc';

        $menu = \App\Http\Controllers\SiteBaseController::getMenu();
        $manageMenu = \App\Http\Controllers\SiteBaseController::getManageMenu();
        /**
         * This variable is available globally on all your views, and sub-views
         */
        //view()->share('global_all_categories', 'abc');
        view()->share('menu', $menu);
        view()->share('manageMenu', $manageMenu);

        return $next($request);
    }
}
