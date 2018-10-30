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
    Route::get('/',['uses'=>'CategoryController@index'])->name('home');
});

Route::group(['middleware' => ['auth', 'clearance']], function() {
    Route::resource('d5-api/categories', 'API\CategoryController', [
      'except' => ['show']
    ]);

    Route::resource('d5-api/items', 'API\ItemController', [
      'except' => ['show']
    ]);

    Route::get('d5-api/categories/all',['uses'=>'API\CategoryController@all']);
});
