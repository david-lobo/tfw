<?php

use Illuminate\Database\Seeder;
use App\Question;
use App\Category;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('questions')->delete();

        $category = Category::where('alias', '=' , str_slug('Packaging - FBB'))->firstOrFail();

         //insert some base categories
         DB::table('questions')->insert(array(
             array(
                'content'=> 'Is the job die cut?',
                'alias' => str_slug('Is the job die cut?'),
                //'answer' => 1,
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job a custom process?',
                'alias' => str_slug('Is the job a custom process'),
                //'answer' => 0,
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
        ));

        $isJobDieCut = Question::where('alias', '=' , str_slug('Is the job die cut?'))->firstOrFail();

         DB::table('questions')->insert(array(
             array(
                'content'=> 'Is the cutter standing from a reprint?',
                'alias' => str_slug('Is the cutter standing from a reprint?'),
                //'answer' => 1,
                'parent_id' => $isJobDieCut->id,
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            )
        ));

         /*
        //insert some Food categories
        $food = Category::where('alias', '=' ,'food')->firstOrFail();

        DB::table('categories')->insert(array(
             array('title'=> 'Dairy', 'alias' => str_slug('Dairy'), 'parent_id' => $food->id),
             array('title'=> 'Meat', 'alias' => str_slug('Meat'), 'parent_id' => $food->id),
             array('title'=> 'Fish', 'alias' => str_slug('Fish'), 'parent_id' => $food->id),
             array('title'=> 'Confectionary', 'alias' => str_slug('Confectionary'), 'parent_id' => $food->id),
             array('title'=> 'Frozen', 'alias' => str_slug('Frozen'), 'parent_id' => $food->id),
        ));

        //insert some Confectionary categories
        $confectionary = Category::where('alias', '=' ,'confectionary')->firstOrFail();

        DB::table('categories')->insert(array(
             array('title'=> 'Chocolate', 'alias' => str_slug('Chocolate'), 'parent_id' => $confectionary->id),
             array('title'=> 'Lolly', 'alias' => str_slug('Lolly'), 'parent_id' => $confectionary->id)
        ));

        //insert some Dairy categories
        $dairy = Category::where('alias', '=' ,'dairy')->firstOrFail();

        DB::table('categories')->insert(array(
             array('title'=> 'Milk', 'alias' => str_slug('Milk'), 'parent_id' => $dairy->id),
             array('title'=> 'Butter', 'alias' => str_slug('Butter'), 'parent_id' => $dairy->id),
             array('title'=> 'Cheese', 'alias' => str_slug('Cheese'), 'parent_id' => $dairy->id),
             array('title'=> 'Cream', 'alias' => str_slug('Cream'), 'parent_id' => $dairy->id),
        ));

        //insert some Electronics categories
        $music = Category::where('alias', '=' ,'Music')->firstOrFail();

        DB::table('categories')->insert(array(
             array('title'=> 'CD', 'alias' => str_slug('CD'), 'parent_id' => $music->id),
             array('title'=> 'Vinyl', 'alias' => str_slug('Vinyl'), 'parent_id' => $music->id),
             array('title'=> 'Digital', 'alias' => str_slug('Digital'), 'parent_id' => $music->id)
        ));*/
    }
}
