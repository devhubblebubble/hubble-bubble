
@extends('layouts.admin-layout')
@section('content')
<style>
    .add_volunteer {
        float:right;
        margin-right: 10px;
        cursor: pointer;
        color: #fff;
    }
    .add_volunteer:hover {
        color: #fff;
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
                {{ ucwords($student->name) }}
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
                    <div class="col-md-8 d-flex align-items-grid">
                        <a href="{{url('/admin/student-volunteers/edit/'.$student->id)}}" class="add_volunteer" >
                            <h6 class="mb-0">
                                <button type="button" class="btn btn-primary">Edit</buutton>  
                            </h6>
                        </a>
                        <h6 class="mb-0">
                            <button type="button" class="btn btn-primary" onclick="showDeleteModal()" >Delete</button>
                        </h6>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3">
                  <ul class="list-group">
                    <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Name:</strong> &nbsp; {{ ucwords($student->name) }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Designation:</strong> &nbsp; {{ $student->designation }}</li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">One Liner:</strong> &nbsp; {{ @$student->description ? : "--"}}</li>
                    @if(@$student->image_url)
                      <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Image </strong> &nbsp;<a href="{{ $student->image_url }}" target="_blank" >View</a></li>
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
  <!-- Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirm</h5>
        </div>
        <div class="modal-body">
          Are you sure want to delete this volunteer?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()" >Close</button>
          <button type="button" onclick="deleteVolunteer()" class="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  </div>
  @push('script')
    <script>
        function closeModal(){
            $('#deleteModal').modal('hide')
        }

        function showDeleteModal(){
            $('#deleteModal').modal('show')
        }

        function deleteVolunteer(){      
            let formData = {};      
            formData._token =  '{{csrf_token()}}';
            formData.id =  '{{@$student->id}}';
            let ajaxURL = "{{ url('/admin/student-volunteers/delete') }}";
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res);
                    if (response.status == "success") {
                        location.href = "{{ url('/admin/student-volunteers/listing') }}";
                    }
                }, error: function(res)
                {
                },
            });
        }
    </script>
  @endpush
@stop