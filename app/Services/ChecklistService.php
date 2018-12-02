<?php

namespace App\Services;

use App\User;
use App\Job;
use App\Question;
use App\Check;
use App\Note;
use Illuminate\Support\Facades\DB;

class ChecklistService {

    public function getChecklist(Job $job): array {
        $result = [];
        $notes = $this->getNotes($job->id);
        $checks = $this->getChecks($job);

        $result['notes'] = $notes;
        $result['checks'] = $checks;

        return $result;
    }

    public function getChecks(Job $job): array {
        /*
        select * from checks c
        left join job_question jq
        on jq.question_id = c.question_id
        where jq.answer = c.answer
        and c.question_id in(16)
        and jq.job_id = 17
         */
        $jobId = $job->id;
        $questions = Question::subquestionsWithQuestion($job->question);

        $questionIds = collect($questions)->pluck('id')->toArray();
        //var_dump($jobId, $questionIds);
        $grouped = $this->getChecksGrouped($jobId, $questionIds);

        //dd($query->toSQL());

        //dd($grouped);
        return $grouped;
    }

    public function getNotes(int $jobId): array
    {
        return Note::where('job_id', '=', $jobId)
            ->get()
            ->keyBy('department_id')
            ->toArray();
    }

    public function getChecksGrouped(int $jobId, array $questionId): array
    {
        $query = DB::table('checks AS c')
        ->select('c.id', 'c.content', 'c.answer', 'c.department_id')
        ->leftJoin('job_question AS jq', 'jq.question_id', '=', 'c.question_id')
        ->whereRaw('jq.answer = c.answer')
        ->whereIn('c.question_id', $questionId)
        ->where('jq.job_id', '=', $jobId);
        //$results = $query->get();

        $results = $query->pluck('id')->toArray();
        $checks = Check::find($results)->toArray();
        $collection = collect($checks);

        $grouped = $collection->groupBy('department.title');
        $grouped = $grouped->toArray();

        return $grouped;
    }
    public function generateChecklist2(int $jobId, int $questionId): array
    {
        $query = DB::table('t1')->select('t1.id', 't1.content', 't1.answer', 't1.department_id');

        $data = $query->fromSub(function ($query) use ($questionId) {
            $query = $query->select('c.id as id', 'c.content', 'c.answer', 'c.department_id')
            ->from('questions AS q')
            ->leftJoin('checks AS c', 'c.question_id', '=', 'q.id')
            ->where('q.id', '=', $questionId);
        }, 't1');
        //->toSQL();
        //->get();
        //dd($data);

        //$data = $data->leftJoin('t1', 't2.id', '=', 't1.id')->toSQL();
        //$new = DB::table('t1')
        //
        //
        //

            $subQuery = DB::table('job_question AS jq')
            ->select('c.id as id', 'c.content', 'jq.answer', 'c.department_id')
            ->from('job_question AS jq')
            ->leftJoin('jobs AS j', 'j.id', '=', 'jq.job_id')
            ->leftJoin('questions AS q', 'q.id', '=', 'jq.question_id')
            ->rightJoin('checks AS c', 'c.question_id', '=', 'q.id')
            ->where('jq.job_id', '=', $jobId)
            ->where('jq.question_id', '=', $questionId);

        $data->leftJoinSub($subQuery, 't2', function ($join) {
            $join->on('t2.id', '=', 't1.id')->whereRaw('(t1.answer = t2.answer)');

        });

        //echo '<pre>';
        //print_r($data->get());
        dd($data->toSQL());
        //echo '<pre>';
        //die();
        return $result;

        /*
        select t1.id, t1.content, t1.answer, t1.department_id from (
        select c.id as id, c.content, c.answer, c.department_id
        from questions q
        left join checks c on c.question_id = q.id
        where q.id = 16 ) t1

        left join (
        select c.id as id, c.content, jq.answer, c.department_id
        from job_question jq
        left join jobs j on j.id = jq.job_id
        left join questions q on q.id = jq.question_id
        right join checks c on c.question_id = q.id
        where jq.job_id = 17
        and jq.question_id = 16) t2 on t2.id = t1.id
        where t1.answer = t2.answer;
         */

    }

}
