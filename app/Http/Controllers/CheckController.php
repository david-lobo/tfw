<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class CheckController extends SiteBaseController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //this.endpoints['jobs.checklist'].replace('ID', this.job.id)
        $data = $this->data;
        /*$data['routes'] = [
            'check' => route('checks.index', ['id' => 'ID']),
            'check.add' => route('checks.store', []),
            'check.update' => route('checks.update', ['id' => 'ID']),
            'check.delete' => route('checks.destroy', ['id' => 'ID']),
            'department' => route('departments.index', []),
            'question' => route('questions.index', []),
            'check.reorder' => route('checks.reorder'),
        ];*/
        $data['route'] = \Request::route()->getName();
        $data['test'] = true;
        if (!is_null($id)) {
            $question = Question::findOrFail($id);
            $data['question'] = $question;
        }
        return view('checks.index')->with('data', $data);
    }
}
