<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Category;

class CategoryController extends APIBaseController
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
            return Category::paginate($numRecords);
        };
        return parent::list($request, $fn);
    }

    public function all()
    {
        $minutes = 0;
        $cacheId = 'categories_all';

        $questions = Cache::remember($cacheId, $minutes, function () {
            return Category::all();
        });

        return response($questions->jsonSerialize(), Response::HTTP_OK);
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
            'title' => 'required|String|unique:categories,title'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $category = new Category;
        $category->title = $input['title'];
        $category->alias = str_slug($input['title']);

        $category->save();

        Cache::flush();

        return $this->sendResponse($category->toArray(), 'Post created successfully.');
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
        $category = Category::findOrFail($id);

        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:categories,title,' . $id
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $category->title = $input['title'];
        $category->alias = str_slug($input['title']);

        $category->save();

        Cache::flush();

        return $this->sendResponse($category->toArray(), 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        Cache::flush();

        return $this->sendResponse([], 'Category deleted successfully.');
    }
}
