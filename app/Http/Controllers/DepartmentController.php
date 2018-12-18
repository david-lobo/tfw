<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;

class DepartmentController extends SiteBaseController
{
    /**
     * Show the Departments page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;
        $data['route'] = \Request::route()->getName();

        return view('departments.index')->with('data', $data);
    }
}
