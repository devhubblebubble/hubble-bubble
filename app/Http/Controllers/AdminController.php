<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentPersonalInfo;
use App\Models\ContactSupport;
use App\Models\StudentVolunteers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use App\Exports\StudentsExport;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{

    public function studentListing(){
        $students = StudentPersonalInfo::orderBy('created_at', 'desc')->get();
        return view('admin.student-listing', compact('students'));
    }
    
    public function studentDetail($id){
        $student = StudentPersonalInfo::find($id);
        return view('admin.student-detail', compact('student'));
    }

    public function contactSupportListing(){
        $students = ContactSupport::orderBy('created_at', 'desc')->get();
        return view('admin.contact-support-listing', compact('students'));
    }

    public function contactSupportDetail($id){
        $student = ContactSupport::find($id);
        return view('admin.contact-support-detail', compact('student'));
    }

    public function studentVolunteersListing(){
        $students = StudentVolunteers::where('delete_status', false)->get();
        return view('admin.student-volunteers-listing', compact('students'));
    }

    public function studentVolunteerDetail($id){
        $student = StudentVolunteers::find($id);
        return view('admin.student-volunteers-detail', compact('student'));
    }

    public function  editStudentVolunteerDetail($id){
        $student = StudentVolunteers::find($id);
        return view('admin.add-student-volunteers', compact('student'));
    }

    public function showAddStudentVolunteerPage() {
        return view('admin.add-student-volunteers');
    }

    public function addStudentVolunteer(Request $req) {
        
        $id = $req->input('id');
        if($id){
            $studentInfo = StudentVolunteers::find($id);
        } else {
            $studentInfo = new StudentVolunteers();
        }
        $studentInfo->name = $req->input('name');
        $studentInfo->designation = $req->input('designation');
        $studentInfo->image_url = $req->input('volunteerImageURL');
        $studentInfo->description = $req->input('description');
        $studentInfo->save();

        $response = ["status" => "success", "data" => ["id" => $studentInfo->id], 
            "message" => "Successfully saved step one"];

        return json_encode($response);
    }

    public function deleteStudentVolunteer(Request $req) {
        
        $id = $req->input('id');
        
        $studentInfo = StudentVolunteers::find($id);
        $studentInfo->delete_status = true;
        $studentInfo->save();

        $response = [
            "status" => "success",
            "data" => ["studentId" => $studentInfo->id], 
            "message" => "Successfully deleted student volunteer"
        ];

        return json_encode($response);
    }


    /* Upload files send from dropzone to S3 */
    public function uploadStudentVolunteerImage(Request $req){
        $file=$req->file;
        if($file){
            $original_name=$file->getClientOriginalName();
            $extension=explode('.', $original_name)[1];
            $name=explode('.', $original_name)[0];
            $image_url = $this->cloudUpload($file, $name, "documents");

            $response = ["status" => "success", "data" => [
                "image_url" => $image_url, 
            ], 
            "message" => "Successfully uploaded volunteer Image to S3"];

            return json_encode($response);
        }
    }

    public function cloudUpload($file, $name, $directory)
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = $name . '-' . time() . '-' . uniqid() . '.' . $extension;
        $filePath = $directory."/" . $fileName;
        $disk = Storage::disk('s3');
        $disk->put($filePath, fopen($file, 'r+'), 'public'); //uploading as streams, useful for large uploads.
        $file_url = 'https://s3-' .
            Config::get('filesystems.disks.s3.region') . '.amazonaws.com/' .
            Config::get('filesystems.disks.s3.bucket') . '/'.$directory.'/' .
            $fileName;
        
        return $file_url;
    }

    public function exportStudentDetails(Request $req) 
    {
        $start_date = $req->from;
        $end_date = $req->to;
        /* add 1 day to end date and substract 1 day from start date */ 
        $start_date = date('Y-m-d', strtotime('-1 day', strtotime($start_date)));
        $end_date = date('Y-m-d', strtotime('+1 day', strtotime($end_date)));
        /* Fetch students between the start date and end date */
        $students = StudentPersonalInfo::whereBetween('created_at', [$start_date, $end_date])
            ->orderBy('created_at', 'desc')->get();

        return Excel::download(new StudentsExport($students), 'students.xlsx');
    }
           
}
