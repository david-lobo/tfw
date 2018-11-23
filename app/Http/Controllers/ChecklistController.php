<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use PDF;
use App\Job;
use  Illuminate\Support\Facades\App;


class ChecklistController extends Controller
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
    public function index(Request $request, $id)
    {
        $input = $request->all();
        $job = Job::findOrFail($id);

/*$router = App::make(Router::class);
$collection = $router->getRoutes();
dd($collection);die();
//


$routes = [];

foreach($collection as $route) {
$routes[] = $route->getPath();
}

dd($routes);
die();*/

        $data = [];
        $data['route'] = \Request::route()->getName();
        $data['routes'] = [
            'department' => route('departments.index', []),
            'question' => route('questions.index', []),
            'jobs.answers.update' => route('jobs.answers.update', ['id' => $id])
        ];
        $data['job'] = $job->toArray();

        //dd($data);die();
        return view('checklist.index')->with('data', $data);
    }

    public function view($id)
    {
        $data = $this->getData();

        return view('checklist.view')->with('data', $data);
    }

    public function export($id)
    {
        $data = $this->getData();
                // Send data to the view using loadView function of PDF facade
        $pdf = PDF::loadView('checklist.view', ['data' => $data]);
        // If you want to store the generated pdf to the server then you can use the store function
        $pdf->save(storage_path().'_filename.pdf');
        // Finally, you can download the file using download function
        return $pdf->stream('checklist.pdf');
    }

    protected function getData()
    {
        $data = [];
        $url = 'https://i.imgur.com/Gw0dhlx.png';
        $imageData = $this->base64Encode($url);

        $data['route'] = \Request::route()->getName();
        $data['routes'] = [
            'department' => route('departments.index', []),
            'question' => route('questions.index', [])
        ];
        $data['tfwLogo'] = $imageData;

        return $data;
    }

    protected function base64Encode($url)
    {

        //$avatarUrl = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';
        //$url = 'https://i.imgur.com/Gw0dhlx.png';
        $arrContextOptions=array(
                        "ssl"=>array(
                            "verify_peer"=>false,
                            "verify_peer_name"=>false,
                        ),
                    );
        $type = pathinfo($url, PATHINFO_EXTENSION);
        $avatarData = file_get_contents($url, false, stream_context_create($arrContextOptions));
        $avatarBase64Data = base64_encode($avatarData);
        $imageData = 'data:image/' . $type . ';base64,' . $avatarBase64Data;

        return $imageData;
    }
}
