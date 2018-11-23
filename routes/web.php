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
    Route::get('/checklist/{id}',['uses'=>'ChecklistController@index'])->name('checklist');
    Route::get('/checklist/view/{id}',['uses'=>'ChecklistController@view'])->name('checklist_view');

        Route::get('/checklist/export/{id}',['uses'=>'ChecklistController@export'])->name('checklist_export');

    Route::get('/questions',['uses'=>'QuestionController@index'])->name('questions');

    Route::get('/subquestions/{id?}',['uses'=>'SubQuestionController@index'])->name('subquestions');

    Route::get('/checks',['uses'=>'CheckController@index'])->name('checks');
    Route::get('/checks/{id}',['uses'=>'CheckController@index'])->name('checks_id');

    Route::get('/departments',['uses'=>'DepartmentController@index'])->name('departments');
    Route::get('/categories',['uses'=>'CategoryController@index'])->name('categories');
    Route::get('/jobs',['uses'=>'JobController@index'])->name('jobs');
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

    Route::resource('d5-api/subquestions', 'API\SubQuestionController', [
    ]);

    Route::resource('d5-api/checks', 'API\CheckController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/jobs', 'API\JobController', [
      'except' => []
    ]);

    Route::get('d5-api/checks/{id}',['uses'=>'API\CheckController@index']);

    Route::put('d5-api/jobs/{id}/answers',['uses'=>'API\JobController@updateAnswers'])->name('jobs.answers.update');

    Route::get('d5-api/jobs/{id}/answers',['uses'=>'API\JobController@listAnswers'])->name('jobs.answers.list');

    Route::get('d5-api/categories/all',['uses'=>'API\CategoryController@all']);

    Route::get('d5-api/questions/all',['uses'=>'API\QuestionController@all']);

});
