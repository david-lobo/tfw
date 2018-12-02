<?php

// TypeFilter.php

namespace App\Filters;

class IdFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('id', $value);
    }
}
