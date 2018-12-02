<?php

use Illuminate\Database\Seeder;
use App\Department;
use App\Job;
use App\Note;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departmentProd = Department::where('alias', '=' , str_slug('Production'))->firstOrFail();

        $departmentRepro = Department::where('alias', '=' , str_slug('Repro'))->firstOrFail();

        $job1 = Job::where('code', '=' , 'LOBOA4ENV01')->firstOrFail();

        DB::table('notes')->delete();

         //insert some base categories
         DB::table('notes')->insert(
            array(
                array(
                    'content'=> 'This is a note for production department.',
                    'job_id' => $job1->id,
                    'department_id' => $departmentProd->id,
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                ),
                array(
                    'content'=> 'This is a note for repro department.',
                    'job_id' => $job1->id,
                    'department_id' => $departmentRepro->id,
                    'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                    'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
                ),
            )
        );
    }
}
