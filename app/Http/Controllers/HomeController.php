<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentPersonalInfo;
use App\Models\ContactSupport;
use App\Models\StudentVolunteers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class HomeController extends Controller
{
    
    public function homePage(){
        $studentVolunteers = StudentVolunteers::where('delete_status', false)->get();
        $calendly_link = Config::get('calendly.link');
       
        return view('home', compact('calendly_link', 'studentVolunteers'));
    }

    /* Save step one of eligibility test */
    public function saveStepOne(Request $req){

        $id = $req->input('id');
        if($id){
            $studentInfo = StudentPersonalInfo::find($id);
        } else {
            $studentInfo = new StudentPersonalInfo();
        }
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

    /* Save step two of eligibility test */
    public function saveStepTwo(Request $req){

        $id = $req->input('id');
        $studentInfo = StudentPersonalInfo::find($id);
        $studentInfo->step2Choice = $req->input('step2');
        $studentInfo->save();

        $response = ["status" => "success", "data" => null, 
            "message" => "Successfully saved step two"];

        return json_encode($response);
    }

    /* Save step three of eligibility test */
    public function saveStepThree(Request $req){

        $id = $req->input('id');
        $studentInfo = StudentPersonalInfo::find($id);
        $studentInfo->prefferedCountry = $req->input('country');
        $studentInfo->university = $req->input('university');
        $studentInfo->save();

        $response = ["status" => "success", "data" => null, 
            "message" => "Successfully saved step three"];

        return json_encode($response);
    }

    /* Save step four of eligibility test */
    public function saveStepFour(Request $req){

        $id = $req->input('id');
        $studentInfo = StudentPersonalInfo::find($id);
        $studentInfo->step4Choice = $req->input('step4');
        $studentInfo->save();

        $response = ["status" => "success", "data" => null, 
            "message" => "Successfully saved step four"];

        return json_encode($response);
    }

    /* Upload files send from dropzone to S3 */
    public function saveDocuments($documentType, Request $req){
        $file=$req->file;
        if($file){
            $original_name=$file->getClientOriginalName();
            $extension=explode('.', $original_name)[1];
            $name=explode('.', $original_name)[0];
            $image_url = $this->cloudUpload($file, $name, "documents");

            $response = ["status" => "success", "data" => [
                "image_url" => $image_url, 
                "document_type" => $documentType
            ], 
            "message" => "Successfully saved step four"];

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

    /* Save step five of eligibility test */
    public function saveStepFive(Request $req){
        $id = $req->input('id');

        $studentInfo = StudentPersonalInfo::find($id);
        $studentInfo->tempDoc1URL = $req->input('tempDoc1URL');
        $studentInfo->tempDoc2URL = $req->input('tempDoc2URL');
        $studentInfo->tempDoc3URL = $req->input('tempDoc3URL');
        $studentInfo->tempDoc4URL = $req->input('tempDoc4URL');
        $studentInfo->tempDoc5URL = $req->input('tempDoc5URL');
        $studentInfo->passportFrontDocURL = $req->input('passportFrontDocURL');
        $studentInfo->passportBackDocURL = $req->input('passportBackDocURL');
        $studentInfo->plusTwoDocURL = $req->input('plusTwoDocURL');
        $studentInfo->degreeConsolDocURL = $req->input('degreeConsolDocURL');
        $studentInfo->degreeTranscDocURL = $req->input('degreeTranscDocURL');
        $studentInfo->degreeCertDocURL = $req->input('degreeCertDocURL');
        $studentInfo->save();

        $response = ["status" => "success", "data" => null, 
        "message" => "Successfully saved step four"];

        return json_encode($response);
    }

    /* Save step five of eligibility test */
    public function saveContactSupport(Request $req){
        
        $contactSupport = new ContactSupport();
        $contactSupport->first_name = $req->input('first_name');
        $contactSupport->last_name = $req->input('last_name');
        $contactSupport->phone_number = $req->input('phone_number');
        $contactSupport->email_address = $req->input('email_address');
        $contactSupport->preffered_country = $req->input('contact_preffered_country');
        $contactSupport->university = $req->input('contact_university');
        $contactSupport->save();

        $response = ["status" => "success", "data" => null, 
        "message" => "Successfully saved contact support"];

        return json_encode($response);
    }

}
