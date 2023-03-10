
@extends('layouts.admin-layout')
@section('content')
<link rel="stylesheet" href="{{ asset('admin/assets/css/trumbowyg.css') }}">
<style>

    .add_career {
        float:right;
        margin-right: 10px;
        cursor: pointer;
        color: var(--bs-link-color);
    }

    .add_career:hover {
        color: var(--bs-link-color);
    }

    .error{
        color: red;
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
                        @if(Request::is('admin/career/add'))
                            Add
                        @else
                            Edit
                        @endif Career
                    </h5>
                </div>
            </div>
            </div>
            <div class="row">
                <div class="col-12 col-xl-4">
                    <div id="student-career-message" class="alert alert-success alert-dismissible text-white" role="alert" style="display: none;" >
                        <span class="text-sm">Career
                        @if(Request::is('admin/career/add'))
                            added
                        @else
                            updated
                        @endif successfully</span>
                        <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card card-plain h-100">
                        <div class="card-header pb-0 p-3">
                            <div class="row">
                                <div class="col-md-8 d-flex align-items-center">
                                <h6 class="mb-0">Fill Information</h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3" style="width: 300%;" >
                        <form role="form" class="text-start" id="careerForm" name="careerForm" enctype="multipart/form-data" >
                            <input type="hidden" id="id" name="id" value="{{@$career->id}}" />
                            <div class="input-group input-group-outline my-3 {{@$career->name?'is-filled':''}} ">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" name="name" value="{{@$career->name}}" />
                            </div>
                            <div class="input-group input-group-outline mb-3 {{@$career->experience?'is-filled':''}} ">
                                <label class="form-label">Experience</label>
                                <input type="text" class="form-control" id="experience" name="experience" value="{{@$career->experience}}" />
                            </div>
                            <div class="input-group input-group-outline mb-3 {{@$career->location?'is-filled':''}} ">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-control" id="location" name="location" value="{{@$career->location}}" />
                            </div>
                            <div class="input-group input-group-outline mb-3 {{@$career->no_of_vacancy?'is-filled':''}} ">
                                <label class="form-label">No of vacancy</label>
                                <input type="number" class="form-control" id="no_of_vacancy" name="no_of_vacancy" value="{{@$career->no_of_vacancy}}" />
                            </div>
                            <div class="input-group input-group-outline mb-3">
                                <div id="job_description" name="job_description" >
                                    {!! @$career->job_description !!}
                                </div>
                                <label for="job_description" id="job_description-error" class="error" style="display:none;" >Please select a end date</label>
                            </div>
                            <div class="text-center">
                                <button type="button" id="submit-career-form" onclick="submitCareerForm()" class="btn bg-gradient-primary w-100 my-4 mb-2">
                                    @if(Request::is('admin/career/add'))
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
    @include('admin.includes.footer')  
  </div>
@push('script')
<script src="{{ asset('admin/assets/js/trumbowyg.min.js') }}"></script>
<script>

    $(document).ready(function(){
        $('#job_description').trumbowyg({
            btns: [
                ['viewHTML'],
                ['undo', 'redo'],
                ['strong'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['removeformat'],
                ['fullscreen']
            ],
            svgPath: "{{asset('img/icons/icons.svg')}}",
            svgAbsoluteUsePath: true,
            semantic:{ div: 'div'}
        });
        $('#job_description').keyup(function(event){
            if($('#job_description').trumbowyg('html')){
                $('#job_description-error').hide();
            }
        });
    });
    function careerFormValidation(){
            $("#careerForm").validate({
                ignore:'',
                rules: {
                    name: {
                        required: true,
                    },
                    experience: {
                        required: true,
                    },
                    location: {
                        required: true,
                    },
                    job_description: {
                        required: true,
                    },
                },
                messages: {
                    name: {
                        required: "Please enter career name."
                    },
                    experience: {
                        required: "Please enter experience."
                    },
                    location: {
                        required: "Please enter location."
                    },
                    job_description: {
                        required: "Please enter a job description."
                    },
                },
                errorPlacement: function(error, element) {
                    error.insertAfter(element.parent());
                },
                success: function(label,element) {
                },
            });
        }

        function submitCareerForm(){            
            careerFormValidation();
            var valid = $("#careerForm").valid();
            if(!$('#job_description').trumbowyg('html')){
                $('#job_description-error').show();
            }
            if(!valid){
                return false;
            }
            var formData = {};
            let serializedForm = $("#careerForm").serializeArray();
            serializedForm.forEach(element => {
                formData[element.name] = element.value;
            });
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('admin/career/add') }}";
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res);
                    if (response.status == "success") {
                        @if(Request::is('admin/career/add'))
                            $("#careerForm")[0].reset();
                        @endif
                        let id = response.data.id;
                        $("#student-career-message").show();
                        setTimeout(() => {
                            $("#student-career-message").hide();
                        }, 4000);
                    }
                }, error: function(res)
                {
                },
            });
        }

  </script>
  @endpush
@stop