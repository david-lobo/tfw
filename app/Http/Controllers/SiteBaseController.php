<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller as Controller;

abstract class SiteBaseController extends Controller
{
    protected $data;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->data = [];
        $this->data['route'] = \Request::route()->getName();
        $this->data['routes'] = self::getRoutes();
    }

    /**
     * Get routes config
     *
     * @return array
     */
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
            'jobs.answers' => route('jobs.answers.list', ['id' => 'ID']),
            'notes.index' => route('notes.index', []),
            'notes.update' => route('notes.update', ['id' => 'ID']),
            'question' => route('questions.index', []),
            'question' => route('questions.index', []),
            'subquestions' => route('subquestions.tree', ['id' => 'ID']),
        ];
    }

    /**
     * Get menu for managers
     *
     * @return array
     */
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
            function ($item) use ($current) {
                $route = route($item['id'], []);
                $item['url'] = $route;
                $item['active'] = $current === $route;

                return $item;
            },
            $menuItems
        );

        return $routes;
    }

    /**
     * Get menu for users
     *
     * @return array
     */
    public static function getMenu()
    {
        $menuItems = [
            ['id' => 'jobs', 'text' => 'Jobs'],
        ];

        $routes = array_map(
            function ($item) {
                $item['url'] = route($item['id'], []);
                return $item;
            },
            $menuItems
        );

        return $routes;
    }
}
