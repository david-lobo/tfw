<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\AccountManager;
use App\Category;

class AccountManagerController extends APIBaseController
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
            return AccountManager::paginate($numRecords);
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
            'title' => 'required|String|unique:account_managers,title'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $accountmanager = new AccountManager;
        $accountmanager->title = $input['title'];
        $accountmanager->alias = str_slug($input['title']);

        $accountmanager->save();

        Cache::flush();

        return $this->sendResponse($accountmanager->toArray(), 'Post created successfully.');
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
        $accountmanager = AccountManager::findOrFail($id);

        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:account_managers,title,' . $id
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $accountmanager->title = $input['title'];
        $accountmanager->alias = str_slug($input['title']);

        $accountmanager->save();

        Cache::flush();

        return $this->sendResponse($accountmanager->toArray(), 'AccountManager updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $accountmanager = AccountManager::findOrFail($id);
        $accountmanager->delete();

        Cache::flush();

        return $this->sendResponse([], 'AccountManager deleted successfully.');
    }
}
