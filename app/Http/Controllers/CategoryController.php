<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;

class CategoryController extends SiteBaseController
{
    /**
     * Show the Categories page
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;

        $data['routes'] = [
            'department' => route('departments.index', []),
            'category' => route('categories.index', [])
        ];

        $data['route'] = \Request::route()->getName();

        return view('categories.index')->with('data', $data);
    }
}
