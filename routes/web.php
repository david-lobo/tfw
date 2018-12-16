<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::resource('users', 'UserController');
Route::resource('roles', 'RoleController');
Route::resource('permissions', 'PermissionController');
Route::resource('posts', 'PostController');



Route::group(['middleware' => ['auth', 'clearance']], function() {

    Route::get('/customers','CustomerController@index');
    Route::get('/customers/pdf','CustomerController@export_pdf');

    Route::get('/',['uses'=>'HomeController@index'])->name('home');
    //Route::get('/checklist',['uses'=>'ChecklistController@index'])->name('checklist');
    Route::get('/jobs/{id}/checklist',['uses'=>'ChecklistController@index'])->name('checklist');
    Route::get('/jobs/{id}/checklist/view',['uses'=>'ChecklistController@view'])->name('checklist.view');

        Route::get('/jobs/{id}/checklist/export',['uses'=>'ChecklistController@export'])->name('checklist.export');

    Route::get('/questions',['uses'=>'QuestionController@index'])->name('questions');

    Route::get('/subquestions/{id?}',['uses'=>'SubQuestionController@index'])->name('subquestions');

    Route::get('/checks',['uses'=>'CheckController@index'])->name('checks');
    Route::get('/checks/{id}',['uses'=>'CheckController@index'])->name('checks_id');

    Route::get('/departments',['uses'=>'DepartmentController@index'])->name('departments');
    Route::get('/categories',['uses'=>'CategoryController@index'])->name('categories');
    Route::get('/',['uses'=>'JobController@index'])->name('jobs');

    Route::get('/clients',['uses'=>'ClientController@index'])->name('clients');
    Route::get('/accountmanagers',['uses'=>'AccountManagerController@index'])->name('accountmanagers');
});

Route::group(['middleware' => ['auth', 'clearance']], function() {
    Route::resource('d5-api/categories', 'API\CategoryController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/questions', 'API\QuestionController', [
      'except' => []
    ]);

    Route::resource('d5-api/departments', 'API\DepartmentController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/clients', 'API\ClientController', [
      'except' => ['show']
    ]);


    Route::resource('d5-api/accountmanagers', 'API\AccountManagerController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/subquestions', 'API\SubQuestionController', [
    ]);

    Route::put('d5-api/checks/reorder', ['uses'=>'API\CheckController@reorder'])->name('checks.reorder');

    Route::resource('d5-api/checks', 'API\CheckController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/notes', 'API\NoteController', [
      'except' => []
    ]);

    Route::resource('d5-api/jobs', 'API\JobController', [
      'except' => []
    ]);


    Route::get('d5-api/checks/{id}', ['uses'=>'API\CheckController@index'])->name('checks.index');


    Route::get('d5-api/subquestions/{id}/tree',['uses'=>'API\SubQuestionController@tree'])->name('subquestions.tree');

    Route::put('d5-api/jobs/{id}/answers',['uses'=>'API\JobController@updateAnswers'])->name('jobs.answers.update');

    Route::get('d5-api/jobs/{id}/answers',['uses'=>'API\JobController@listAnswers'])->name('jobs.answers.list');

    Route::get('d5-api/jobs/{id}/checklist',['uses'=>'API\JobController@checklist'])->name('jobs.checklist');

    Route::get('d5-api/categories/all',['uses'=>'API\CategoryController@all'])->name('categories.all');

    Route::get('d5-api/questions/all',['uses'=>'API\QuestionController@all']);

});
