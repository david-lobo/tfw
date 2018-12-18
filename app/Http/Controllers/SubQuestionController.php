<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class SubQuestionController extends SiteBaseController
{
    /**
     * Show the SubQuestions page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        $question = Question::findOrFail($id);
        $data = $this->data;
        $data['question'] = $question;

        return view('subquestions.index')->with('data', $data);
    }
}
