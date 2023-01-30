
@extends('layouts.admin-layout')
@section('content')
<link href="{{ asset('/css/dropzone/dropzone.css') }}" rel="stylesheet" />
<style>
    .dropzone .dz-preview.dz-image-preview {
        background-color: transparent;
    }

    .dropzone {
        min-height: 134px;
        border: 1px dashed rgba(112, 112, 112, 0.8);
        border-radius: 5px;
        padding: 1rem 1rem;
        background-color: #393939;
    }

    .dropzone .dz-message {
        text-align: center;
        margin: 2.3em 0;
    }

    .add_volunteer {
        float:right;
        margin-right: 10px;
        cursor: pointer;
        color: var(--bs-link-color);
    }

    .add_volunteer:hover {
        color: var(--bs-link-color);
    }
</style>
@include('admin.includes.side-menu')  
<div class="main-content position-relative max-height-vh-100 h-100">
    <!-- Navbar -->
    @include('admin.includes.nav-bar')  
    <!-- End Navbar -->
    <div class="container-fluid px-2 px-md-4">
      <div class="page-header min-height-300 border-radius-xl mt-4" style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');">
        <span class="mask  bg-gradient-primary  opacity-6"></span>
      </div>
      <div class="card card-body mx-3 mx-md-4 mt-n6">
        <div class="row gx-4 mb-2">
          <div class="col-auto">
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">
                @if(Request::is('admin/student-volunteers/add'))
                    Add
                @else
                    Edit
                @endif Student Volunteer
              </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <div class="col-12 col-xl-4">
              <div class="card card-plain h-100">
                <div class="card-header pb-0 p-3">
                  <div class="row">
                    <div class="col-md-8 d-flex align-items-center">
                      <h6 class="mb-0">Fill Information</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3">
                    @if(@$student->image_url) <a class="add_volunteer" href="{{ $student->image_url }}" target="_blank" >View Previously Uploaded Image</a> @endif
                    <div class="form_group mb-3">
                        <label class="custom_label">Image(Less than 1 mb)</label>
                        <form class="dropzone" id="uploader">
                            @csrf
                        </form>
                    </div>
                    <form role="form" class="text-start" id="volunteerForm" name="volunteerForm" enctype="multipart/form-data" >
                        <input type="hidden" id="volunteerImageURL" name="volunteerImageURL" value="{{@$student->image_url}}" />
                        <input type="hidden" id="id" name="id" value="{{@$student->id}}" />
                        <div class="input-group input-group-outline my-3 {{@$student->name?'is-filled':''}} ">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" value="{{@$student->name}}" />
                        </div>
                        <div class="input-group input-group-outline mb-3 {{@$student->designation?'is-filled':''}} ">
                            <label class="form-label">Designation</label>
                            <input type="text" class="form-control" id="designation" name="designation" value="{{@$student->designation}}" />
                        </div>
                        <div class="input-group input-group-outline mb-3 {{@$student->description?'is-filled':''}}">
                            <label class="form-label">One Liner</label>
                            <input type="text" class="form-control" id="description" name="description" value="{{@$student->description}}" />
                        </div>
                        <div class="text-center">
                            <button type="button" id="submit-volunteer-form" onclick="submitVolunteerForm()" class="btn bg-gradient-primary w-100 my-4 mb-2">
                                @if(Request::is('admin/student-volunteers/add'))
                                    Save
                                @else
                                    Update
                                @endif
                            </button>
                        </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    @include('admin.includes.footer')  
  </div>
  @push('script')
  <script src="{{ asset('/js/dropzone/dropzone-min.js') }}"></script>
  <script>

    function volunteerFormValidation(){
            $("#volunteerForm").validate({
                ignore:'',
                rules: {
                    name: {
                        required: true,
                    },
                    designation: {
                        required: true
                    },
                },
                messages: {
                    name: {
                        required: "Please enter a name."
                    },
                    designation: {
                        required: "Please enter a designation."
                    },
                },
                errorPlacement: function(error, element) {
                    error.insertAfter(element.parent());
                },
                success: function(label,element) {
                },
            });
        }

        function submitVolunteerForm(){            
            volunteerFormValidation();
            var valid = $("#volunteerForm").valid();
            if(!valid){
                return false;
            }
            var formData = {};
            let serializedForm = $("#volunteerForm").serializeArray();
            serializedForm.forEach(element => {
                formData[element.name] = element.value;
            });
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('admin/student-volunteers/add') }}";
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res);
                    if (response.status == "success") {
                        $("#volunteerForm")[0].reset();
                        dropzoneReset('uploader');
                        location.href = "{{ url('/admin/student-volunteers/listing') }}";
                    }
                }, error: function(res)
                {
                },
            });
        }

        const myDropzoneForVolunteerImg = new Dropzone("#uploader", {
            url: "/admin/student-volunteers/image",
            addRemoveLinks: true,
            // maxFilesize: 1, // MB
            maxFiles:1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;""
                this.on("addedfile", function() {          
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);               
                    }
                });
                this.on('removedfile', function(file) {  
                    $("#volunteerImageURL").val("");              
                });
                this.on('sending', function(file, xhr, formData) {
                    $("#submit-volunteer-form").html("Upload in progress..");
                    $("#submit-volunteer-form").prop("disabled", true);
                });
                this.on('success', function( file, xhRes ){
                    let res = JSON.parse(xhRes);
                    $("#volunteerImageURL").val(res.data.image_url);
                    $("#submit-volunteer-form").html("{{ Request::is('admin/student-volunteers/detail/*') ? 'Save' : 'Update' }}");
                    $("#submit-volunteer-form").prop("disabled", false);
                });
            }
        });

        function dropzoneReset(id) {
            let uploader = document.querySelector(`#${id} > div.dz-preview.dz-processing.dz-image-preview.dz-success.dz-complete > a`);
            if(uploader){
                uploader.click();
            }
        }

  </script>
  @endpush
@stop