<?php

use Illuminate\Database\Seeder;
use App\Question;
use App\Category;
use Faker\Factory as Faker;

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


        $faker = Faker::create();
        foreach (range(1,20) as $index) {
            $title = $faker->sentence($nbWords = 6, $variableNbWords = true);
            DB::table('questions')->insert([
                'content' => $title,
                'alias' => str_slug($title),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ]);
    }


    }
}
