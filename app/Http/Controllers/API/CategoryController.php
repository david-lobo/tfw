<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Category;
use App\Item;

class CategoryController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index()
    {
        $minutes = 10;
        $cacheId = 'categories';

        $categories = Cache::remember($cacheId, $minutes, function () {
            return Category::where('parent_id', '=', null)->with('childs')->get();
        });
        $categories = is_null($categories) ? [] : $categories;
        return response($categories->jsonSerialize(), Response::HTTP_OK);
    }

    public function all()
    {
        $minutes = 10;
        $cacheId = 'categories_all';

        $categories = Cache::remember($cacheId, $minutes, function () {
            return Category::all();
        });

        return response($categories->jsonSerialize(), Response::HTTP_OK);
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
            'title' => 'required|String|unique:categories,title',
            'parent_id' => 'Int|exists:categories,id'
            //'description' => 'required'
        ]);

        $input['parent_id'] = empty($input['parent_id']) ? 0 : $input['parent_id'];

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $category = new Category;
        $category->title = $input['title'];
        $category->alias = str_slug($input['title']);

        if ($input['parent_id']) {
            $parent = Category::where('id', '=', $input['parent_id'])-> firstOrFail();
            $category->parent_id = $parent->id;
        }

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
            'title' => 'required|String|unique:categories,title,' . $id,
            'parent_id' => 'Int|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $category->title = $input['title'];
        $category->alias = str_slug($input['title']);

        if (isset($input['parent_id'])) {
            $parent = Category::where('id', '=', $input['parent_id'])-> firstOrFail();
            $category->parent_id = $parent->id;
        }

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
