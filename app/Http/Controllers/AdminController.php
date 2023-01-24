<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentPersonalInfo;

class AdminController extends Controller
{

    public function studentListing(){
        $students = StudentPersonalInfo::all();
        return view('admin.student-listing', compact('students'));
    }
    
    public function studentDetail($id){
        $student = StudentPersonalInfo::find($id);
        return view('admin.student-detail', compact('student'));
    }
}
