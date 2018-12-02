<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Job;
use App\Question;
use App\Note;

class Job extends Model
{
    public $fillable = ['code', 'title'];
    protected $visible = ['id', 'code', 'title', 'checks', 'question', 'notes'];
    protected $with = ['question', 'notes'];

    /*public function checks()
    {
       return $this->belongsToMany('App\Check');
    }*/

    public function questionAnswers()
    {
       return $this->belongsToMany('App\Question')->withPivot('answer')->withTimestamps();
    }

    public function question()
    {
        return $this->belongsTo('App\Question');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public static function answers(Job $job, Question $question = null)
    {
        if (is_null($question)) {
            $question = $job->question;
        }

        if (!is_null($question)) {
            $questions = Question::subquestionsWithQuestion($question);
            $questionIds = collect($questions)->pluck('id')->toArray();
            //var_dump(collect($questions)->pluck('id')->toArray());die();
        }

        $answers = $job->questionAnswers()->whereIn('question_id', $questionIds)->orderBy('id')->get();
        $result = $job->toArray();
        $records = [];
        foreach ($answers as $key => $value) {
          $pivot = [];
          $subQuestion = Question::find($value->pivot->question_id);
          $pivot['job_id'] = $value->pivot->job_id;
          $pivot['question'] = $subQuestion;
          $pivot['answer'] = $value->pivot->answer;
          $records[] = $pivot;

        }
        return $records;
    }
}
