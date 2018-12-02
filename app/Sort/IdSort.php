<?php

// TypeFilter.php

namespace App\Sort;

class IdSort
{
    public function sort($builder, $value, $direction)
    {
        if ($value === 'id') {
            return $builder->orderBy($value, $direction);
        }

        return $builder;
    }
}
