<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Check extends Model
{
    protected $visible = ['id', 'alias', 'content', 'question', 'department', 'answer', 'question_id'];
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
}
