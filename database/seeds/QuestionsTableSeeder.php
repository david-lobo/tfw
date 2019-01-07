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
        $category = Category::where('alias', '=', str_slug('Packaging - FBB'))->firstOrFail();

        //insert some base categories
        DB::table('questions')->insert(array(
            array(
                'content'=> 'Is the job die cut?',
                'alias' => str_slug('Is the job die cut?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job lithographically printed?',
                'alias' => str_slug('Is the job lithographically printed?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Are there any spot colours used?',
                'alias' => str_slug('Are there any spot colours used?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job foiled, embossed or de-bossed?',
                'alias' => str_slug('Is the job foiled, embossed or de-bossed?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is there spot UV on the job?',
                'alias' => str_slug('Is there spot UV on the job?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job machine glued?',
                'alias' => str_slug('Is the job machine glued?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job wet proofed?',
                'alias' => str_slug('Is the job wet proofed?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job hand glued?',
                'alias' => str_slug('Is the job hand glued?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job printed both sides?',
                'alias' => str_slug('Is the job printed both sides?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job overall UV varnished?',
                'alias' => str_slug('Is the job overall UV varnished?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Is the job FSC?',
                'alias' => str_slug('Is the job FSC?'),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
        ));

        /*$isJobDieCut = Question::where('alias', '=', str_slug('Is the job die cut?'))->firstOrFail();

        DB::table('questions')->insert(array(
             array(
                'content'=> 'Is the cutter standing from a reprint?',
                'alias' => str_slug('Is the cutter standing from a reprint?'),
                'parent_id' => $isJobDieCut->id,
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            )
        ));


        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            $title = $faker->sentence($nbWords = 6, $variableNbWords = true);
            DB::table('questions')->insert([
                'content' => $title,
                'alias' => str_slug($title),
                'category_id' => $category->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ]);
        }*/
    }
}
