<?php

// Home
Breadcrumbs::for('questions', function ($trail) {
    $trail->push('Questions', route('questions'));
});

Breadcrumbs::for('subquestions', function ($trail, $question) {
    $trail->push('Questions', route('questions'));
    $trail->push($question['id'], null);
    $trail->push('Sub-Questions', route('subquestions', $question->id));
});


Breadcrumbs::for('checks', function ($trail, $question) {

    //$id = is_null($question->parent_id) ? $question->id : $question->parent_id;
    $id = $question->id;
    $parentId = $question->parent_id;
    $trail->push('Questions', route('questions'));
    $trail->push(is_null($parentId) ? $id : $parentId, null);
    $trail->push('Sub-Questions', route('subquestions', is_null($parentId) ? $id : $parentId));
    $trail->push($id, null);

    $trail->push('Checks', route('checks'));
});

Breadcrumbs::for('checklist', function ($trail, $job) {
    $trail->push('Jobs', route('jobs'));
    $trail->push($job['id'], null);
    $trail->push('Checklist', route('checklist', $job['id']));
});
