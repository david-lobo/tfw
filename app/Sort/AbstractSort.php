<?php

namespace App\Sort;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

abstract class AbstractSort
{
    protected $request;
    protected $sorts = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function sort(Builder $builder)
    {
        $params = $this->getSort();

        $value = $params['sortBy'] ?? null;
        $direction = $params['direction'] ?? null;

        if (!empty($value) && !empty($direction)) {
            $this->resolveSort($value)->sort($builder, $value, $direction);
        }
        return $builder;
    }

    protected function getSorts()
    {
        return array_filter($this->request->only(array_keys($this->sorts)));
    }

    protected function getSort()
    {
        return array_filter($this->request->only(['sortBy', 'direction']));
    }


    protected function resolveSort($sort)
    {
        return new $this->sorts[$sort];
    }
}
