<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Check;
use App\Note;

class Department extends Model
{
    public $fillable = ['title'];
    protected $visible = ['id', 'alias', 'title'];

    public function questions()
    {
        return $this->hasMany(Check::class);
    }

    public function notes()
    {
        return $this->hasMany(Notes::class);
    }
}
