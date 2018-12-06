<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AccountManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use  Illuminate\Support\Facades\App;

class AccountManagerController extends SiteBaseController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

/*$router = App::make(Router::class);
$collection = $router->getRoutes();
dd($collection);die();
//


$routes = [];

foreach($collection as $route) {
$routes[] = $route->getPath();
}

dd($routes);
die();*/
        $data = $this->data;

        $data['routes'] = [
            'accountManager' => route('accountmanagers.index', [])
        ];
        //$question = Question::findOrFail($id);
        //$data['question'] = $question;
        $data['route'] = \Request::route()->getName();
        return view('accountmanagers.index')->with('data', $data);
    }
}
