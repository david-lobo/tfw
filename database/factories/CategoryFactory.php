<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Model;
use App\Category;

$factory->define(App\Category::class, function (Faker $faker) {
    $random_category = Category::inRandomOrder()->first();
    return [
        'title' => $faker->sentence(5),
        'parent_id' => $random_category->id
    ];
});
