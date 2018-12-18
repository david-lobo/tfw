<?php

namespace App\Filters;

use App\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Filters\Fields\DepartmentIdFilter;

class CheckFilter extends AbstractFilter
{
    protected $filters = [
        'department' => DepartmentIdFilter::class
    ];
}
