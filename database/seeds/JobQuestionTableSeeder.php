<?php

use Illuminate\Database\Seeder;
use App\Job;
use App\Question;

class JobQuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('job_question')->delete();

        $job1 = Job::where('code', '=' , 'LOBOA4ENV01')->firstOrFail();
        $job2 = Job::where('code', '=' , 'LOBOBOX01')->firstOrFail();
        $job2 = Job::where('code', '=' , 'LOBOPACK01')->firstOrFail();

        $subquestions = Question::subquestions($job1->question);

        $answer = 0;

        foreach ($subquestions as $key => $subquestion) {
            //var_dump($value->toArray());
            $checks = $subquestion->checks;

                $answer = $answer === 1 ? 0 : 1;
                $subquestion->jobAnswers()->sync(
                    [
                        $job1->id => [
                            'answer' => $answer,
                            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                        ]
                    ]
                );


            //$job1->checks()->sync($checks->merge($job1->checks));
            /*foreach ($checks as $key => $check) {
                //var_dump($check->toArray( ));
                $answer = $answer === 1 ? 0 : 1;
                $check->jobs()->sync(
                    [
                        $job1->id => [
                            'answer' => $answer,
                            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                            'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                        ]
                    ]
                );

                //$check->jobs()->save($role, ['expires' => $expires]);
            }*/
            //$job1->save();
        }


    }
}
