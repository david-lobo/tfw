<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;

class CategoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];

        $data['routes'] = [
            'department' => route('departments.index', []),
            'category' => route('categories.index', [])
        ];
        //$question = Question::findOrFail($id);
        //$data['question'] = $question;
        $data['route'] = \Request::route()->getName();
        return view('categories.index')->with('data', $data);
    }
}
