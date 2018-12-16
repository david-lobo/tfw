<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;
use App\Http\Controllers\SiteBaseController;

class JobController extends SiteBaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;
        /*$data['routes'] = [
            'department' => route('departments.index', []),
            'category' => route('categories.index', []),
            'categories.all' => route('categories.all', []),
            'job' => route('jobs.index', []),
            'client' => route('clients.index', []),
            'accountmanager' => route('accountmanagers.index', []),
            'checklist' => route('checklist', ['id' => 'ID']),
        ];*/
        return view('jobs.index')->with('data', $data);
    }
}
