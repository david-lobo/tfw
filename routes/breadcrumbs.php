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
    $trail->push('Questions', route('questions'));
    $trail->push('Sub-Questions', route('subquestions', $question->parent_id));
    $trail->push('Checks', route('checks'));
});
