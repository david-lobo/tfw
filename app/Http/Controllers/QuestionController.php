<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class QuestionController extends Controller
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
            'subquestions' => route('subquestions', []),
            'question' => route('questions.index', [])
        ];
        //$question = Question::findOrFail($id);
        //$data['question'] = $question;
        $data['route'] = \Request::route()->getName();
        return view('questions.index')->with('data', $data);
    }
}
