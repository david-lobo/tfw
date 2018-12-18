<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Category;

class Item extends Model
{
    protected $visible = ['id', 'alias', 'title', 'categories'];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
