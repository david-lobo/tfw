<?php

// Home
Breadcrumbs::for('questions', function ($trail) {
    $trail->push('Questions', route('questions'));
});

Breadcrumbs::for('subquestions', function ($trail, $question) {
    $trail->push('Questions', route('questions'));
    $trail->push('Sub-Questions', route('subquestions', $question->id));
});


Breadcrumbs::for('checks', function ($trail, $question) {

    $id = is_null($question->parent_id) ? $question->id : $question->parent_id;
    $trail->push('Questions', route('questions'));
    $trail->push('Sub-Questions', route('subquestions', $id));
    $trail->push('Checks', route('checks'));
});

Breadcrumbs::for('checklist', function ($trail, $job) {
    $trail->push('Jobs', route('jobs'));
    $trail->push('Checklist', route('checklist', $job['id']));
});
