<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;
use App\Http\Controllers\SiteBaseController;

class JobController extends SiteBaseController
{
    /**
     * Show the Jobs page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;

        return view('jobs.index')->with('data', $data);
    }
}
