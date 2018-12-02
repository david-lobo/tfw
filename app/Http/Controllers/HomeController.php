<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Classes\Tfw\PDFCheckList;

class HomeController extends Controller
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
        $pdf = new PDFCheckList();

        /*$isJobDieCut = Question::where('alias', '=' , str_slug('Is the job die cut?'))->firstOrFail();
        $subquestions = Question::subquestions($isJobDieCut);

        foreach ($subquestions as $key => $subquestion) {
           //var_dump($subquestion->toArray());
           $checks = $subquestion->checks;
           foreach ($checks as $key => $check) {
               var_dump($check->toArray());
           }

        }

        die();*/
        $data = [];
        $data['route'] = \Request::route()->getName();
        return view('home.index')->with('data', $data);
    }


}
