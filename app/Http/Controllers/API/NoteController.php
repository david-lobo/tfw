<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests;
use App\Note;
use App\Category;

class NoteController extends APIBaseController
{
    /**
     * list resource
     *
     * @return \Illuminate\Http\Request
     */
    public function index()
    {
        $minutes = 0;
        $cacheId = 'notes';

        $notes = Cache::remember($cacheId, $minutes, function () {
            return Note::all();
        });
        $notes = is_null($notes) ? [] : $notes;
        return response($notes->jsonSerialize(), Response::HTTP_OK);
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
        $validator = self::makeValidator($input, $request, false);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $note = new Note;
        $note->content = $input['content'];
        $note->job_id = $input['job_id'];
        $note->department_id = $input['department_id'];

        $note->save();

        Cache::flush();

        return $this->sendResponse($note->toArray(), 'Post created successfully.');
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
        $note = Note::findOrFail($id);

        $validator = self::makeValidator($input, $request, true);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors());
        }

        $note->content = $input['content'];

        $note->save();

        Cache::flush();

        return $this->sendResponse($note->toArray(), 'Note updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $note = Note::findOrFail($id);

        $note->delete();

        Cache::flush();

        return $this->sendResponse([], 'Note deleted successfully.');
    }

    /**
     * Extend the validator to check Notes
     *
     * @param  array  $input
     * @param  \Illuminate\Http\Request  $request
     * @param  boolean  $update
     * @return \Illuminate\Http\Response
     */
    public static function makeValidator(array $input, Request $request, $update = false)
    {
        \Validator::extend('uniqueNote', function ($attribute, $value, $parameters, $validator) {
            $count = \DB::table('notes')->where('department_id', $value)
                                        ->where('job_id', $parameters[0])
                                        ->count();
            return $count === 0;
        });

        $messages = [
            'unique_note' => 'Note already exists for department',
        ];

        $rules = [
            'content' => 'required|String|min:10|max:500',
            'job_id' => 'required|Int|exists:jobs,id',
            'department_id' => 'required|Int|exists:departments,id'
        ];

        if (!$update) {
            $rules['department_id'] = "uniqueNote:{$request->job_id}";
        }

        $validator = \Validator::make($input, $rules, $messages);

        return $validator;
    }
}
