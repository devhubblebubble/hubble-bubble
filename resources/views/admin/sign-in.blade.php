@extends('layouts.admin-layout')
@section('content')
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="main-content  mt-0">
    <div class="page-header align-items-start min-vh-100" style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  <div class="row mt-3">
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div id="login-error" class="alert alert-danger font_error" role="alert">
                    Login attempt failed! Please Check credentials
                </div>
                <form role="form" class="text-start" id="signInForm" name="signInForm" >
                  <div class="input-group input-group-outline my-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" />
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" />
                  </div>
                  <div class="form-check form-switch d-flex align-items-center mb-3">
                    <input class="form-check-input" type="checkbox" id="rememberMe" checked>
                    <label class="form-check-label mb-0 ms-3" for="rememberMe">Remember me</label>
                  </div>
                  <div class="text-center">
                    <button type="button" onclick="submitSignInForm()" class="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div class="copyright text-center text-sm text-white text-lg-start">
                © <script>
                  document.write(new Date().getFullYear())
                </script>,
                <a href="#" class="font-weight-bold text-white" target="_blank">Hubble Bubble</a>
                towards better future.
              </div>
            </div>
            <div class="col-12 col-md-6">
              <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                <li class="nav-item">
                  <a href="#" class="nav-link text-white" target="_blank">Hubble Bubble</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-white" target="_blank">About Us</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-white" target="_blank">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
  @push('script')
    <script>
        function signInFormValidation(){
            $("#signInForm").validate({
                ignore:'',
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                },
                messages: {
                    email: {
                        email: "Please enter a valid email.",
                        required: "Please enter a email."
                    },
                    password: {
                        required: "Please enter your password."
                    },
                },
                errorPlacement: function(error, element) {
                    error.insertAfter(element.next());
                },
                success: function(label,element) {
                },
            });
        }

        function submitSignInForm(){            
            signInFormValidation();
            var valid = $("#signInForm").valid();
            if(!valid){
                return false;
            }
            var formData = {};
            let serializedForm = $("#signInForm").serializeArray();
            serializedForm.forEach(element => {
                formData[element.name] = element.value;
            });
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('admin/login-check') }}";
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    if (res.status == "success") {
                        location.href = "{{ url('/admin/students/listing') }}";
                    } else {
                        $("#login-error").show()
                    }
                }, error: function(res)
                {
                },
            });
        }
    </script>
  @endpush
@stop