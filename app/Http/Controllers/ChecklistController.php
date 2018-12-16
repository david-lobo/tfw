<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use PDF;
use App\Job;
use  Illuminate\Support\Facades\App;
use App\Services\ChecklistService;

class ChecklistController extends SiteBaseController
{
    protected $checklistService;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request, ChecklistService $checklistService)
    {
        $this->checklistService = $checklistService;
        parent::__construct($request);
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

        $data = $this->data;
        $data['route'] = \Request::route()->getName();

        $routes = [
            'jobs.answers.update' => route('jobs.answers.update', ['id' => $id]),
            'jobs.checklist' => route('jobs.checklist', ['id' => $id]),
            'checklist.view' => route('checklist.view', ['id' => $job->id]),
            'checklist.export' => route('checklist.export', ['id' => $job->id])
        ];
        //$routes = $this->data['routes'];
        //var_dump(array_merge($existingRoutes, $routes));die();
        $data['routes'] = array_merge($data['routes'], $routes);
        //var_dump($data['routes']);die();
        /*$data['routes'] = [
            'notes.index' => route('notes.index', []),
            'notes.update' => route('notes.update', ['id' => 'ID']),
            'department' => route('departments.index', []),
            'question' => route('questions.index', []),
            'jobs.answers.update' => route('jobs.answers.update', ['id' => $id]),
            'jobs.checklist' => route('jobs.checklist', ['id' => $id]),
            'jobs.show' => route('jobs.show', ['id' => 'ID']),
            'checklist.view' => route('checklist.view', ['id' => $job->id]),
            'checklist.export' => route('checklist.export', ['id' => $job->id])

        ];*/
        $data['job'] = $job->toArray();
        $data['checklist'] = $this->checklistService->getChecklist($job);

        //dd($data);die();
        return view('checklist.index')->with('data', $data);
    }

    public function view($id)
    {
        $data = $this->getData();
        $job = Job::findOrFail($id);

        $data['job'] = $job->toArray();
        $data['checklist'] = $this->checklistService->getChecklist($job);

        //var_dump($data['checklist']['checks']);die();
        //var_dump($data);die();
        return view('checklist.view')->with('data', $data);
    }

    public function export($id)
    {
        $data = $this->getData();
        $job = Job::findOrFail($id);
        $data['job'] = $job->toArray();
        $data['checklist'] = $this->checklistService->getChecklist($job);
                // Send data to the view using loadView function of PDF facade
        $pdf = PDF::loadView('checklist.view', ['data' => $data]);
        // If you want to store the generated pdf to the server then you can use the store function
        //$pdf->save(storage_path('app/tfw_checklist.pdf'));
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
