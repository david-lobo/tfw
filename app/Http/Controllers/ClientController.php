<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;

class ClientController extends SiteBaseController
{
    /**
     * Show the Client page
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;
        $data['route'] = \Request::route()->getName();

        return view('clients.index')->with('data', $data);
    }
}
