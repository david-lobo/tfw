<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Department;
use App\Job;

class Note extends Model
{
    public $fillable = ['content'];
    protected $visible = ['id', 'content', 'department'];
    protected $with = ['department'];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
