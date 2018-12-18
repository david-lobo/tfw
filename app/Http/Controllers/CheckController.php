<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class CheckController extends SiteBaseController
{
    /**
     * Show the Checks page
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $data = $this->data;
        $data['route'] = \Request::route()->getName();
        $data['test'] = true;

        if (!is_null($id)) {
            $question = Question::findOrFail($id);
            $data['question'] = $question;
        }

        return view('checks.index')->with('data', $data);
    }
}
