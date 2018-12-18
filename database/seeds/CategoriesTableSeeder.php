<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->delete();

         //insert some base categories
         DB::table('categories')->insert(array(
            array(
                'title'=> 'Packaging - FBB',
                'alias' => str_slug('Packaging - FBB'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
             array(
                'title'=> 'Boxes',
                'alias' => str_slug('Boxes'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()),
             array(
                'title'=> 'Envelopes',
                'alias' => str_slug('Envelopes'),
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString())
            ));
    }
}
