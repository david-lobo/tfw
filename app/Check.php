<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\CheckFilter;
use Illuminate\Database\Eloquent\Builder;

class Check extends Model
{
    protected $visible = ['id', 'alias', 'priority', 'content', 'question', 'department', 'answer', 'question_id'];
    protected $with = ['question', 'department'];

    /**
     * Get the phone record associated with the user.
     */
    public function department()
    {
        return $this->belongsTo('App\Department');
    }


    public function question()
    {
        return $this->belongsTo('App\Question');
    }

    public function jobs()
    {
       return $this->belongsToMany(Job::class);
    }

    public function scopeFilter(Builder $builder, $request)
    {
        return (new CheckFilter($request))->filter($builder);
    }
}
