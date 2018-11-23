<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Department;
use App\Category;

class DepartmentController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index()
    {
        $minutes = 0;
        $cacheId = 'departments';

        $departments = Cache::remember($cacheId, $minutes, function () {
            return Department::all();
        });
        $departments = is_null($departments) ? [] : $departments;
        return response($departments->jsonSerialize(), Response::HTTP_OK);
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
            'title' => 'required|String|unique:departments,title'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $department = new Department;
        $department->title = $input['title'];
        $department->alias = str_slug($input['title']);

        $department->save();

        Cache::flush();

        return $this->sendResponse($department->toArray(), 'Post created successfully.');
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
        $department = Department::findOrFail($id);

        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:departments,title,' . $id
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $department->title = $input['title'];
        $department->alias = str_slug($input['title']);

        $department->save();

        Cache::flush();

        return $this->sendResponse($department->toArray(), 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        Cache::flush();

        return $this->sendResponse([], 'Department deleted successfully.');
    }
}
