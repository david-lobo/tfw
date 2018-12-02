<?php

// ProductFilter.php

namespace App\Sort;

use App\Sort\AbstractSort;
use Illuminate\Database\Eloquent\Builder;

class QuestionSort extends AbstractSort
{
    protected $sorts = [
        'id' => IdSort::class,
        //'content' => ContentFilter::class,
        //'category' => CategoryFilter::class
    ];
}
