<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class QuestionController extends SiteBaseController
{
    /**
     * Show the Questions page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->data;

        $data['routes']['subquestions'] = route('subquestions', []);
        $data['route'] = \Request::route()->getName();

        return view('questions.index')->with('data', $data);
    }
}
