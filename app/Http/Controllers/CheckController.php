<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class CheckController extends Controller
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
        $data = [];
        $data['routes'] = [
            'check' => route('checks.index', []),
            'department' => route('departments.index', []),
            'question' => route('questions.index', [])
        ];
        $data['route'] = \Request::route()->getName();
        $data['test'] = true;
        if (!is_null($id)) {
            $question = Question::findOrFail($id);
            $data['question'] = $question;
        }
        return view('checks.index')->with('data', $data);
    }
}
