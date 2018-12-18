<?php

namespace App\Services;

use App\User;
use App\Job;
use App\Question;
use App\Check;
use App\Note;
use Illuminate\Support\Facades\DB;

class ChecklistService
{
    public function getChecklist(Job $job): array
    {
        $result = [];
        $notes = $this->getNotes($job->id);
        $checks = $this->getChecks($job);

        $result['notes'] = $notes;
        $result['checks'] = $checks;

        return $result;
    }

    public function getChecks(Job $job): array
    {
        $jobId = $job->id;
        $questions = Question::subquestionsWithQuestion($job->question);
        $questionIds = collect($questions)->pluck('id')->toArray();
        $grouped = $this->getChecksGrouped($jobId, $questionIds);

        //dd($query->toSQL());
        //dd($grouped);

        return $grouped;
    }

    protected function getNotes(int $jobId): array
    {
        return Note::where('job_id', '=', $jobId)
            ->get()
            ->keyBy('department_id')
            ->toArray();
    }

    protected function getChecksGrouped(int $jobId, array $questionId): array
    {
        $query = DB::table('checks AS c')
        ->select('c.id', 'c.content', 'c.answer', 'c.department_id')
        ->leftJoin('job_question AS jq', 'jq.question_id', '=', 'c.question_id')
        ->whereRaw('jq.answer = c.answer')
        ->whereIn('c.question_id', $questionId)
        ->where('jq.job_id', '=', $jobId)
        ->orderBy('c.priority', 'asc');

        $results = $query->pluck('id')->toArray();
        $checks = Check::find($results)->toArray();
        $collection = collect($checks);
        $grouped = $collection->sortBy('priority');
        $grouped = $grouped->groupBy('department.title');

        $grouped = $grouped->toArray();

        return $grouped;
    }
}
