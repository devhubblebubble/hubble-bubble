
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
                {{ ucwords($student->first_name." ".$student->last_name) }}
              </h5>
              <p class="mb-0 font-weight-normal text-sm">
                {{ @$student->email_address ?: "--" }}
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
                    <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; {{ ucwords($student->first_name." ".$student->last_name) }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong> &nbsp; {{ $student->phone_number }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; {{ @$student->email_address ? : "--"}}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Preffered Country:</strong> &nbsp; {{ @$student->preffered_country ?: "--" }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Preffered University:</strong> &nbsp; {{ @$student->university ?: "--"  }}</li>
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