<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Client;
use App\Category;

class ClientController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index(Request $request)
    {
        $fn = function () use ($request) {
            $numRecords = $request->input('limit', 10);
            return Client::paginate($numRecords);
        };
        return parent::list($request, $fn);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:clients,title'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $client = new Client;
        $client->title = $input['title'];
        $client->alias = str_slug($input['title']);

        $client->save();

        Cache::flush();

        return $this->sendResponse($client->toArray(), 'Client created successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $client = Client::findOrFail($id);

        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:clients,title,' . $id
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $client->title = $input['title'];
        $client->alias = str_slug($input['title']);

        $client->save();

        Cache::flush();

        return $this->sendResponse($client->toArray(), 'Client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        Cache::flush();

        return $this->sendResponse([], 'Client deleted successfully.');
    }
}
