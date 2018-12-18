<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Job;

class Client extends Model
{
    public $fillable = ['title'];
    protected $visible = ['id', 'alias', 'title'];

    public function jobs()
    {
        return $this->hasMany(Jobs::class);
    }
}
