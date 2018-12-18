<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Question;
use App\Category;

class QuestionController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index(Request $request)
    {
        $cacheKey = $this->cacheKey();
        $input = $request->all();
        $numRecords = $input['limit'] ?? 10;
        $minutes = 0;

        $questions = Cache::remember($cacheKey, $minutes, function () use ($numRecords, $request) {
            return Question::filter($request)->sort($request)->where('parent_id', '=', null)->with('childs')->paginate($numRecords);
        });
        $questions = is_null($questions) ? [] : $questions;
        return response($questions->jsonSerialize(), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::with('childs')->findOrFail($id);
        //$data = $question->toArray();
        $question = is_null($question) ? [] : $question;

        return $this->sendResponse($question->jsonSerialize(), Response::HTTP_OK);
    }

    /**
     * list all resources
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        $minutes = 0;
        $cacheId = 'questions_all';

        $questions = Cache::remember($cacheId, $minutes, function () {
            return Question::all();
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
            'content' => 'required|String|unique:questions,content',
            'parent_id' => 'Int|nullable|exists:questions,id|unique:questions,parent_id',
            'category_id' => 'Int|exists:categories,id'
        ]);

        $input['parent_id'] = empty($input['parent_id']) ? 0 : $input['parent_id'];
        $input['category_id'] = empty($input['category_id']) ? 0 : $input['category_id'];

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $question = new Question;
        $question->content = $input['content'];
        $question->alias = str_slug($input['content']);

        if ($input['parent_id']) {
            $parent = Question::where('id', '=', $input['parent_id'])-> firstOrFail();
            $question->parent_id = $parent->id;
        }

        if ($input['category_id']) {
            $category = Category::where('id', '=', $input['category_id'])-> firstOrFail();
            $question->category_id = $category->id;
        }

        $question->save();

        Cache::flush();

        return $this->sendResponse($question->toArray(), 'Post created successfully.');
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
        $question = Question::findOrFail($id);

        $validator = \Validator::make($input, [
            'content' => 'required|String|unique:questions,content,' . $id,
            'parent_id' => 'Int|nullable|exists:questions,id',
            'category_id' => 'Int|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $question->content = $input['content'];
        $question->alias = str_slug($input['content']);

        if (isset($input['parent_id'])) {
            $parent = Question::where('id', '=', $input['parent_id'])-> firstOrFail();
            $question->parent_id = $parent->id;
        }

        if ($input['category_id']) {
            $category = Category::where('id', '=', $input['category_id'])-> firstOrFail();
            $question->category_id = $category->id;
        }

        $question->save();

        Cache::flush();

        return $this->sendResponse($question->toArray(), 'Question updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        Cache::flush();

        return $this->sendResponse([], 'Question deleted successfully.');
    }
}
