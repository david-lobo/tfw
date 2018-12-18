<?php

namespace App\Filters;

use App\Category;

class CategoryIdFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('category_id', $value);
    }
}
