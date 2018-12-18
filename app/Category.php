<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\Job;

class Category extends Model
{
    public $fillable = ['title'];
    protected $visible = ['id', 'alias', 'title', 'questions', 'jobs'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
