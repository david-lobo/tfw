<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Job;
use App\Question;
use App\Services\ChecklistService;

class JobController extends APIBaseController
{
    public function __construct(ChecklistService $checklistService)
    {
        $this->checklistService = $checklistService;
    }

    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index(Request $request)
    {
        $fn = function () use ($request) {
            $numRecords = $request->input('limit', 10);
            return Job::paginate($numRecords);
        };
        return parent::list($request, $fn);
    }

    /**
     * show resource
     *
     * @param  int  $id
     * @return \Illuminate\Http\Request
     */
    public function show(int $id)
    {
        $job = Job::findOrFail($id);
        $result = $job->toArray();
        $minutes = 0;
        $cacheId = 'jobs_' . $id;
        $answers = [];
        if (!is_null($job->question())) {
            $answers = Job::answers($job);
        }
        $result['answers'] = $answers;

        return response($result, Response::HTTP_OK);
    }

    /**
     * list all resources
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        $minutes = 0;
        $cacheId = 'jobs_all';

        $jobs = Cache::remember($cacheId, $minutes, function () {
            return Job::all();
        });

        return response($jobs->jsonSerialize(), Response::HTTP_OK);
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
            'code' => 'required|String|unique:jobs,code',
            'title' => 'required|String|unique:jobs,title|max:255|min:10',
            'category_id' => 'required|Int|exists:categories,id',
            'client_id' => 'required|Int|exists:clients,id',
            'account_manager_id' => 'required|Int|exists:account_managers,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $job = new Job;
        $job->title = $input['title'];
        $job->code = $input['code'];
        $job->category_id = $input['category_id'];
        $job->client_id = $input['client_id'];
        $job->account_manager_id = $input['account_manager_id'];

        $job->save();

        Cache::flush();

        return $this->sendResponse($job->toArray(), 'Job created successfully.');
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
        $job = Job::findOrFail($id);

        $validator = \Validator::make($input, [
            'code' => 'required|String|unique:jobs,code,' . $job->id,
            'title' => 'required|String|unique:jobs,title,' . $job->id . '|max:255|min:10',
            'category_id' => 'required|Int|exists:categories,id',
            'client_id' => 'required|Int|exists:clients,id',
            'account_manager_id' => 'required|Int|exists:account_managers,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $job->title = $input['title'];
        $job->code = $input['code'];
        $job->category_id = $input['category_id'];
        $job->client_id = $input['client_id'];
        $job->account_manager_id = $input['account_manager_id'];

        $job->save();

        Cache::flush();

        return $this->sendResponse($job->toArray(), 'Job updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        Cache::flush();

        return $this->sendResponse([], 'Job deleted successfully.');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateAnswers(Request $request, $id)
    {
        $input = $request->all();
        $job = Job::with('question')->findOrFail($id);
        $question = Question::findOrFail($input['question_id']);
        $questions = Question::subquestionsWithQuestion($question);

        $validator = \Validator::make($input, [
            'question_id' => 'Int|required|exists:questions,id',
            "questions"    => "required|array|min:" . count($questions),
            "questions.*"  => "boolean|required",
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        if (!is_null($question->parent_id)) {
            return $this->sendError('Validation Error', [
                "Must be a parent question, subquestion selected"
            ]);
        }

        $inputQuestions = Question::find(array_keys($input['questions']));

        if (count($inputQuestions) !== count($questions)) {
            return $this->sendError('Validation Error', [
                "Question requires" . count($questions). " answers not " .count($inputQuestions)
            ]);
        }

        $questionIds = collect($questions)->pluck('id')->toArray();
        $job->question_id = $input['question_id'];
        $toSync = [];
        $invalidAnswer = false;

        foreach ($inputQuestions as $key => $question) {
            if (!in_array($question->id, $questionIds)) {
                $invalidAnswer = true;
                break;
            }

            $record = [
                'answer' => $input['questions'][$question->id],
            ];

            $toSync[$question->id] = $record;
        }

        if ($invalidAnswer) {
            return $this->sendError('Validation Error', [
                "Answer submitted for invalid subquestion"
            ]);
        }

        $job->questionAnswers()->sync($toSync);
        $job->save();

        Cache::flush();

        $result = $job->toArray();
        $answers = [];

        if (!is_null($job->question)) {
            $answers = Job::answers($job);
        }

        $result['answers'] = $answers;

        return $this->sendResponse($result, 'Job updated successfully.');
    }

    public function checklist($id)
    {
        $job = Job::findOrFail($id);
        $result = $this->checklistService->getChecks($job);

        return response($result, Response::HTTP_OK);
    }
}
