<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api', 'prefix' => 'auth'], function (){
    Route::post('login', 'AuthController@login');
    Route::post('access-token', 'AuthController@getAccessToken');
});

Route::group(['namespace' => 'Api', 'middleware' => ['auth:api']], function () {
    //api请求。。。
});