<?php

use Illuminate\Database\Seeder;
use App\Job;
use App\Question;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('jobs')->delete();

        $isJobDieCut = Question::where('alias', '=' , str_slug('Is the job die cut?'))->firstOrFail();

        $isJobCustom = Question::where('alias', '=' , str_slug('Is the job a custom process'))->firstOrFail();

         //insert some base categories
         DB::table('jobs')->insert(array(
             array(
                'code' => 'LOBOA4ENV01',
                'title'=> 'Lobo A4 Envelopes',
                'question_id' => $isJobDieCut->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
             array(
                'code' => 'LOBOBOX01',
                'title'=> 'Lobo Custom Box',
                'question_id' => $isJobDieCut->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
             array(
                'code' => 'LOBOPACK01',
                'title'=> 'Lobo Packaging',
                'question_id' => $isJobCustom->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
        ));
    }
}
