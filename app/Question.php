<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public $fillable = ['content','parent_id', 'answer'];

    protected $visible = ['id', 'alias', 'content','parent_id', 'category', 'answer', 'childs'];
    protected $with = ['category', 'childs'];

    /**
     * Get the index name for the model.
     *
     * @return string
    */
    public function childs() {
        return $this->hasMany('App\Question','parent_id','id') ;
    }

        /**
     * Get the phone record associated with the user.
     */
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
            //die($question->childs);
            return $results;
        }

        $results[] = $question;

        return self::subquestionsWithQuestion($question->childs->first(), $results);

    }

    public function jobAnswers()
    {
       return $this->belongsToMany('App\Job')->withPivot('answer')->withTimestamps();
    }
}
