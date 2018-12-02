<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Question;
use App\Category;
use App\Check;

class CheckController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index(Request $request, $id)
    {
        $minutes = 0;
        $cacheId = 'checks';

        if (!is_null($id)) {
            $cacheId .= '_$id';
        }

        $checks = Cache::remember($cacheId, $minutes, function () use ($id, $request) {
            if (!is_null($id)) {
                return Check::filter($request)->where('question_id', '=', $id)->orderBy('priority', 'asc')->get();
            }

            return Check::where('question_id', '!=', null)->get();
        });
        $checks = is_null($checks) ? [] : $checks;
        return response($checks->jsonSerialize(), Response::HTTP_OK);
    }

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
            'content' => 'required|String|unique:checks,content',
            'answer' => 'boolean|required',
            'question_id' => 'Int|required|exists:questions,id',
            'department_id' => 'Int|required|exists:departments,id'
            //'parent_id' => 'Int|nullable|exists:questions,id',
            //'category_id' => 'Int|exists:categories,id'
            //'description' => 'required'
        ]);

        //$input['parent_id'] = empty($input['parent_id']) ? 0 : $input['parent_id'];
        //$input['category_id'] = empty($input['category_id']) ? 0 : $input['category_id'];

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $check = new Check;
        $check->content = $input['content'];
        $check->alias = str_slug($input['content']);
        $check->answer = $input['answer'];
        $check->question_id = $input['question_id'];
        $check->department_id = $input['department_id'];

        $check->save();

        Cache::flush();

        return $this->sendResponse($check->toArray(), 'Check created successfully.');
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
        $check = Check::findOrFail($id);

        $validator = \Validator::make($input, [
            'content' => 'required|String|unique:checks,content,' . $id,
            'answer' => 'boolean|required',
            'question_id' => 'Int|required|exists:questions,id',
            'department_id' => 'Int|required|exists:departments,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $check->content = $input['content'];
        $check->answer = $input['answer'];
        $check->alias = str_slug($input['content']);
        $check->question_id = $input['question_id'];
        $check->department_id = $input['department_id'];

        /*if (isset($input['parent_id'])) {
            $parent = Question::where('id', '=', $input['parent_id'])-> firstOrFail();
            $question->parent_id = $parent->id;
        }

        if ($input['category_id']) {
            $category = Category::where('id', '=', $input['category_id'])-> firstOrFail();
            $question->category_id = $category->id;
        }*/

        $check->save();

        Cache::flush();

        return $this->sendResponse($check->toArray(), 'Check updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $input = $request->all();

        $validator = \Validator::make($input, [
            'id' => 'Int|required|exists:checks,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $entity = Check::findOrFail($id);

        $entity->delete();

        Cache::flush();

        return $this->sendResponse([], 'Check deleted successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reorder(Request $request)
    {
        $input = $request->all();
        //var_dump($input);die();

        $validator = \Validator::make($input, [
            //"question_id" => 'Int|required|exists:questions,id',
            "checks"    => "required|array|min:2",
            "checks.*"  => "Int|required|exists:checks,id",
            //"questions.*"  => "boolean|required",
            //"questions_id"    => "required|array|min:" . count($questions),
            //"questions_id.*"  => "Int|required|exists:questions,id",
            //"questions_value"    => "required|array|min:" . count($questions),
            //"questions_value.*"  => "boolean|required",
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }
        $checks = $input['checks'];
        $inputChecks = Check::find(array_keys($checks));

        $inputChecks->each(function ($item, $key) use ($checks) {
           $item->priority = $checks[$item->id];
           $item->save();
        });

        //var_dump($inputChecks->toArray());

        /*if (!is_null($question->parent_id)) {
            return $this->sendError('Validation Error', [
                "Must be a parent question, subquestion selected"
            ]);
        }*/

        return $this->sendResponse($inputChecks->toArray(), 'Check updated successfully.');
    }


}
