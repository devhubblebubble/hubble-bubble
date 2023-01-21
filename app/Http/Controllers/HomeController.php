<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentPersonalInfo;
class HomeController extends Controller
{
    
    public function homePage(){
        return view('home');
    }

    /* Save step one of eligibility test */
    public function saveStepOne(Request $req){

        $studentInfo = new StudentPersonalInfo();
        $studentInfo->name = $req->input('name');
        $studentInfo->age = $req->input('age');
        $studentInfo->qualification = $req->input('qualification');
        $studentInfo->contact_number = $req->input('contact_number');
        $studentInfo->email = $req->input('email');
        $studentInfo->save();

        $response = ["status" => "success", "data" => ["studentId" => $studentInfo->id], 
            "message" => "Successfully saved step one"];

        return json_encode($response);
    }

}
