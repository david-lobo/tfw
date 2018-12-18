<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\QuestionFilter;
use App\Sort\QuestionSort;
use Illuminate\Database\Eloquent\Builder;

class Question extends Model
{
    public $fillable = ['content','parent_id', 'answer'];
    protected $visible = [
        'id',
        'alias',
        'content',
        'parent_id',
        'category',
        'answer',
        'childs'
    ];

    protected $with = ['category'];

    public function childs()
    {
        return $this->hasMany('App\Question', 'parent_id', 'id') ;
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function checks()
    {
        return $this->hasMany('App\Check');
    }

    public function jobs()
    {
        return $this->hasMany('App\Job');
    }

    public static function subquestions($question)
    {
        $subquestions = self::subquestionsWithQuestion($question);

        if (isset($subquestions[0])) {
            unset($subquestions[0]);
            array_values($subquestions);
        }

        return $subquestions;
    }

    public static function subquestionsWithQuestion($question, $results = [])
    {
        if (!isset($question->childs) || empty($question->childs)) {
            return $results;
        }

        $results[] = $question;

        return self::subquestionsWithQuestion($question->childs->first(), $results);
    }

    public function jobAnswers()
    {
        return $this->belongsToMany('App\Job')->withPivot('answer')->withTimestamps();
    }

    public function scopeFilter(Builder $builder, $request)
    {
        return (new QuestionFilter($request))->filter($builder);
    }

    public function scopeSort(Builder $builder, $request)
    {
        return (new QuestionSort($request))->sort($builder);
    }
}
