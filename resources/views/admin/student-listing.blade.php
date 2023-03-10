@extends('layouts.admin-layout')
@section('content')
    <style>

        .export-btn {
            width: 120px !important;
            float: right;
            margin-top: -40px !important;
            margin-right: 35px;
        }
        
    </style>
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
                        <button class="btn bg-gradient-info mt-4 w-100 export-btn" onclick="showDateFilterModal()" >Export</button>
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
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
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
                                <td class="align-middle text-center">
                                    <p class="text-xs font-weight-bold mb-0">{{ \Carbon\Carbon::parse(@$student->created_at)->format('d M Y') }}</p>
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
    <div class="modal fade" id="dateFilterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Date Filter</h5>
                </div>
                <div class="modal-body">
                    From:
                    <input type="date" id="start" >
                    To:
                    <input type="date" id="end" >
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeDateFilterModal()" >Close</button>
                    <button type="button" onclick="exportFilterData()" class="btn btn-primary">Download</button>
                </div>
            </div>
        </div>
    </div>
@stop
@push('script')
    <script>

        function closeDateFilterModal(){
            $('#dateFilterModal').modal('hide')
        }

        function showDateFilterModal(){
            $('#dateFilterModal').modal('show')
        }

        function exportFilterData(){
            let exportURL = "{{ url('admin/export/students') }}";
            window.open(exportURL, '_blank');
            $('#dateFilterModal').modal('hide')
        }
    </script>
@endpush