
@extends('layouts.admin-layout')
@section('content')
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
                {{ ucwords($student->name) }}
              </h5>
              <p class="mb-0 font-weight-normal text-sm">
                {{ @$student->email ?: "--" }}
              </p>
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
                      <h6 class="mb-0">Profile Information</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3">
                  <ul class="list-group">
                    <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; {{ ucwords($student->name) }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong> &nbsp; {{ $student->contact_number }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; {{ @$student->email ? : "--"}}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Age:</strong> &nbsp; {{ @$student->age?:"--" }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Preffered Country:</strong> &nbsp; {{ @$student->prefferedCountry ? implode(", ",json_decode(@$student->prefferedCountry)) : "--" }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Preffered University:</strong> &nbsp; {{ @$student->university ? implode(", ",json_decode(@$student->university)) : "--"  }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Status of Student:</strong> &nbsp;</li>
                    <li class="list-group-item border-0 ps-0 text-sm">{{ $student->step2Choice }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm">{{ $student->step4Choice }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Documents uploaded:</strong> &nbsp;</li>
                    @if($student->plusTwoDocURL)
                      <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">+2 Certificate</strong> &nbsp;<a href="{{ $student->plusTwoDocURL }}" target="_blank" >View</a></li>
                    @endif
                    @if($student->degreeDocURL)
                      <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Degree Certificate</strong> &nbsp;<a href="{{ $student->degreeDocURL }}" target="_blank" >View</a></li>
                    @endif
                    @if($student->thirdDocURL)
                      <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Third Certificate</strong> &nbsp;<a href="{{ $student->thirdDocURL }}" target="_blank" >View</a></li>
                    @endif
                    @if($student->fourthDocURL)
                      <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Fourth Certificate</strong> &nbsp;<a href="{{ $student->fourthDocURL }}" target="_blank" >View</a></li>
                    @endif
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    @include('admin.includes.footer')  
  </div>
@stop