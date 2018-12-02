<?php

// TypeFilter.php

namespace App\Filters;

class ContentFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('content', $value)
            ->orWhere('content', 'like', '%' . $value . '%');
    }
}
