<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;

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

Route::get('/',  [HomeController::class, 'homePage']);
Route::post('/save-step-one',  [HomeController::class, 'saveStepOne']);
Route::post('/save-step-two',  [HomeController::class, 'saveStepTwo']);
Route::post('/save-step-three',  [HomeController::class, 'saveStepThree']);
Route::post('/save-step-four',  [HomeController::class, 'saveStepFour']);
Route::post('/save-step-five',  [HomeController::class, 'saveStepFive']);
Route::post('/save-documents/{documentType}',  [HomeController::class, 'saveDocuments']);
Route::post('/save-contact-support',  [HomeController::class, 'saveContactSupport']);

/* Admin Routes */
Route::get('/admin/login',  [LoginController::class, 'adminLogin']);
Route::post('/admin/login-check',  [LoginController::class, 'login']);
Route::post('/admin/logout', [LoginController::class, 'logOut']);

Route::prefix('admin')->middleware('loginVerification')->group(function() {
    Route::get('/students/listing',  [AdminController::class, 'studentListing']);
    Route::get('/students/detail/{id}',  [AdminController::class, 'studentDetail']);
    Route::get('/contact-support/listing',  [AdminController::class, 'contactSupportListing']);
    Route::get('/contact-support/detail/{id}',  [AdminController::class, 'contactSupportDetail']);
    Route::get('/student-volunteers/listing',  [AdminController::class, 'studentVolunteersListing']);
    Route::get('/student-volunteers/add',  [AdminController::class, 'showAddStudentVolunteerPage']);
    Route::post('/student-volunteers/add',  [AdminController::class, 'addStudentVolunteer']);
    Route::post('/student-volunteers/image',  [AdminController::class, 'uploadStudentVolunteerImage']);
    Route::get('/student-volunteers/detail/{id}',  [AdminController::class, 'studentVolunteerDetail']);
    Route::get('/student-volunteers/edit/{id}',  [AdminController::class, 'editStudentVolunteerDetail']);
    Route::post('/student-volunteers/delete',  [AdminController::class, 'deleteStudentVolunteer']);
});