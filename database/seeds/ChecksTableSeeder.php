<?php

use Illuminate\Database\Seeder;
use App\Question;
use App\Category;
use App\Department;

class ChecksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('checks')->delete();

        $departmentProd = Department::where('alias', '=' , str_slug('Production'))->firstOrFail();

        $departmentRepro = Department::where('alias', '=' , str_slug('Repro'))->firstOrFail();

        $question = Question::where('alias', '=' , str_slug('Is the job die cut?'))->firstOrFail();

         //insert some base categories
         DB::table('checks')->insert(array(
             array(
                'content'=> 'Ensure previous cutter ref and instructions to set to previous cutter are on job bag',
                'alias' => str_slug('Ensure previous cutter ref and instructions to set to previous cutter are on job bag'),
                'answer' => 1,
                'question_id' => $question->id,
                'department_id' => $departmentProd->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
             array(
                'content'=> 'Check artwork is set to previous cutter',
                'alias' => str_slug('Check artwork is set to previous cutter'),
                'answer' => 1,
                'question_id' => $question->id,
                'department_id' => $departmentProd->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'content'=> 'Confirm cutter laydown with finishing manager and brief repro',
                'alias' => str_slug('Confirm cutter laydown with finishing manager and brief repro'),
                'answer' => 0,
                'question_id' => $question->id,
                'department_id' => $departmentRepro->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
        ));
    }
}
