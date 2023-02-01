@extends('layouts.admin-layout')
@section('content')
    @include('admin.includes.side-menu')  
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <!-- Navbar -->
        @include('admin.includes.nav-bar')  
        <!-- End Navbar -->
        <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Students List</h6>
                </div>
                </div>
                <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0" id="table_id">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Qualification</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Contact</th>
                            <th class="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($students as $student)
                            <tr>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{@$student->name}}</p>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">{{@$student->email?:"--"}}</p>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0">{{@$student->qualification}}</p>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{@$student->contact_number}}</span>
                                </td>
                                <td class="align-middle">
                                    <a href="{{url('/admin/students/detail/'.@$student->id)}}" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="View user">
                                    View
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
        @include('admin.includes.footer')  
        </div>
    </main>
@stop