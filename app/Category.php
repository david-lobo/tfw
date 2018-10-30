<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Item;

class Category extends Model
{
    public $fillable = ['title','parent_id'];

    protected $visible = ['id', 'alias', 'title','parent_id', 'childs', 'items'];
    protected $with = ['childs', 'items'];

    public function items()
    {
        return $this->belongsToMany(Item::class);
    }


    /**
     * Get the index name for the model.
     *
     * @return string
    */
    public function childs() {
        return $this->hasMany('App\Category','parent_id','id') ;
    }
}
