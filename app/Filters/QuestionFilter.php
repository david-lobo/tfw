<?php

// ProductFilter.php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class QuestionFilter extends AbstractFilter
{
    protected $filters = [
        'id' => IdFilter::class,
        'content' => ContentFilter::class,
        'category' => CategoryFilter::class
    ];
}
