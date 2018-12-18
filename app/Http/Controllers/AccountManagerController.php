<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AccountManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\App;

class AccountManagerController extends SiteBaseController
{
    /**
     * Show the Account Manager page
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;
        $data['route'] = \Request::route()->getName();

        return view('accountmanagers.index')->with('data', $data);
    }
}
