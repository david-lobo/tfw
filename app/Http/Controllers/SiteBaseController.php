<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use  Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller as Controller;

class SiteBaseController extends Controller
{
    protected $data;

    public function __construct(Request $request)
    {
        $this->data = [];
        $this->data['route'] = \Request::route()->getName();
        $this->data['routes'] = self::getRoutes();

        //$this->data['menu'] = $this->getMenu();
    }

    public static function getRoutes()
    {
        return [
            'accountmanager' => route('accountmanagers.index', []),
            'accountManager' => route('accountmanagers.index', []),
            'category' => route('categories.index', []),
            'categories.all' => route('categories.all', []),
            'check' => route('checks.index', ['id' => 'ID']),
            'checks' => route('checks', []),
            'checklist' => route('checklist', ['id' => 'ID']),
            'check.add' => route('checks.store', []),
            'check.delete' => route('checks.destroy', ['id' => 'ID']),
            'check.update' => route('checks.update', ['id' => 'ID']),
            'check.reorder' => route('checks.reorder'),
            'client' => route('clients.index', []),
            'department' => route('departments.index', []),
            'job' => route('jobs.index', []),
            'jobs.show' => route('jobs.show', ['id' => 'ID']),
            'notes.index' => route('notes.index', []),
            'notes.update' => route('notes.update', ['id' => 'ID']),
            'question' => route('questions.index', []),
            'question' => route('questions.index', []),
            'subquestions' => route('subquestions.tree', ['id' => 'ID']),
        ];
    }

    public static function getManageMenu()
    {
        $menuItems = [
            ['id' => 'questions', 'text' => 'Questions'],
            ['id' => 'categories', 'text' => 'Categories'],
            ['id' => 'departments', 'text' => 'Departments'],
            ['id' => 'clients', 'text' => 'Clients'],
            ['id' => 'accountmanagers', 'text' => 'Account Managers'],
        ];



        $current = url()->current();

        $routes = array_map(
            function($item) use ($current) {
                $route = route($item['id'], []);
                $item['url'] = $route;
                $item['active'] = $current === $route;

                return $item;
            },
        $menuItems);

        return $routes;
    }

    public static function getMenu()
    {
        /*$x = \Request::route()->getName();
        $router = App::make(Router::class);
        $collection = $router->getRoutes();
        dd($collection);die();
        //


        $routes = [];

        foreach($collection as $route) {
        $routes[] = $route->getPath();
        }

        dd($routes);*/

        $menuItems = [
            ['id' => 'jobs', 'text' => 'Jobs'],
        ];
        /*foreach ($menuItems as $key => $value) {
            $item = $menuItems[$key];
            $item['url'] = route($value, []);
            $menuItems[$key] = $item;
        }*/

        $routes = array_map(
            function($item) {
                $item['url'] = route($item['id'], []);
                return $item;
            },
        $menuItems);

        return $routes;
    }
}
