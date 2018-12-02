<?php

// TypeFilter.php

namespace App\Filters;

use App\Category;

class CategoryFilter
{
    public function filter($builder, $value)
    {
            $categories = Category::where('title', $value)
            ->orWhere('title', 'like', '%' . $value . '%')->get();

            $ids = $categories->pluck('id');

        return $builder->whereIn('category_id', $ids);
    }
}
