<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Category;
use App\Item;
use Illuminate\Http\Request;

class ItemController extends APIBaseController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $input = $request->all();

        if (!isset($input['category']) || $input['category'] == 0) {

            $minutes = 10;
            $cacheId = 'items';

            $items = Cache::remember($cacheId, $minutes, function () {
                return Item::with('categories')->get();
            });

            return response($items->toArray(), Response::HTTP_OK);
        }

        $validator = \Validator::make($input, [
            'category' => 'Int|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if (isset($input['category'])) {

            $minutes = 10;
            $cacheId = 'items_' . $input['category'];

            $items = Cache::remember($cacheId, $minutes, function () use ($input) {

                $category = Category::where('id', '=', $input['category'])->firstOrFail();
                $items = $category->items;

                foreach ($items as $key => $value) {
                    $itemCategories = $value->categories;
                }
                return $items;
            });
        }

        return response($items->jsonSerialize(), Response::HTTP_OK);
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
            'title' => 'required|String|unique:items,title',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $item = new Item;
        $item->title = $input['title'];
        $item->alias = str_slug($input['title']);
        $item->save();

        $category = Category::find($input['category_ids']);
        $item->categories()->attach($category);

        Cache::flush();

        return $this->sendResponse($item->toArray(), 'Item created successfully.');
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
        $item = item::findOrFail($id);

        $validator = \Validator::make($input, [
            'title' => 'required|String|unique:categories,title',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $item->title = $input['title'];
        $item->alias = str_slug($input['title']);

        $item->save();

        $category = Category::find($input['category_ids']);
        $item->categories()->sync($category);

        Cache::flush();

        return $this->sendResponse($item->toArray(), 'Item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        Cache::flush();

        return $this->sendResponse([], 'Item deleted successfully.');
    }
}
