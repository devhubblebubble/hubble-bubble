<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentPersonalInfo;
use App\Models\ContactSupport;

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

    public function contactSupportListing(){
        $students = ContactSupport::all();
        return view('admin.contact-support-listing', compact('students'));
    }

    public function contactSupportDetail($id){
        $student = ContactSupport::find($id);
        return view('admin.contact-support-detail', compact('student'));
    }
}
