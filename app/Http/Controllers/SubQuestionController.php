<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class SubQuestionController extends Controller
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
    public function index($id = null)
    {
        $question = Question::findOrFail($id);
        $data = [];
        $data['routes'] = [
            'checks' => route('checks', []),
            //'subquestions' => route('subquestions', []),
            'subquestions' => route('subquestions.tree', ['id' => 'ID']),
            'question' => route('questions.index', [])
        ];


        $data['route'] = \Request::route()->getName();
        $data['question'] = $question;
        return view('subquestions.index')->with('data', $data);
    }
}
