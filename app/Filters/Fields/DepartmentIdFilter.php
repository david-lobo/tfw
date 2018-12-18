<?php

namespace App\Filters\Fields;

class DepartmentIdFilter
{
    public function filter($builder, $value)
    {
        return $builder->where('department_id', $value);
    }
}
