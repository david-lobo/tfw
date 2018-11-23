<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Check;

class Department extends Model
{
    public $fillable = ['title'];
    protected $visible = ['id', 'alias', 'title'];
    //protected $with = ['childs', 'items'];

    public function questions()
    {
        return $this->hasMany(Check::class);
    }


    /**
     * Get the index name for the model.
     *
     * @return string
    */
    /*public function childs() {
        return $this->hasMany('App\Category','parent_id','id') ;
    }*/
}
