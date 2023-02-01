<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('admin/assets/img/apple-icon.png') }}">
        <link rel="icon" type="image/png" href="{{ asset('admin/assets/img/favicon.png') }}">
        <title>
        Admin | Hubble Bubble
        </title>
        <!--     Fonts and icons     -->
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
        <!-- Nucleo Icons -->
        <link href="{{ asset('admin/assets/css/nucleo-icons.css') }}" rel="stylesheet" />
        <link href="{{ asset('admin/assets/css/nucleo-svg.css') }}" rel="stylesheet" />
        <!-- Font Awesome Icons -->
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
        <!-- Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
        <!-- CSS Files -->
        <link id="pagestyle" href="{{ asset('admin/assets/css/material-dashboard.css?v=3.0.4') }}" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">
        <style>
            div#table_id_filter {
                margin-right: 29px;
            }
            .dataTables_length, #table_id_info {
                margin-left: 22px !important;
            }
            .font_error{
                color: #ffff;
                display:none;
            }
        </style>
    </head>

    <body class="g-sidenav-show  bg-gray-200">
        @yield('content')
          <!-- Modal -->
        <div class="modal fade" id="logOutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" >Confirm</h5>
                </div>
                <div class="modal-body">
                    Are you sure want to logout?
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeLogOutModal()" >Close</button>
                <button type="button" onclick="logOut()" class="btn btn-primary">Log Out</button>
                </div>
            </div>
            </div>
        </div>
        <!--   Core JS Files   -->
        <script src="{{ asset('admin/assets/js/core/popper.min.js') }}"></script>
        <script src="{{ asset('admin/assets/js/core/bootstrap.min.js') }}"></script>
        <script src="{{ asset('admin/assets/js/plugins/perfect-scrollbar.min.js') }}"></script>
        <script src="{{ asset('admin/assets/js/plugins/smooth-scrollbar.min.js') }}"></script>
        <script>
            var win = navigator.platform.indexOf('Win') > -1;
            if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
            }
        </script>
        <!-- Github buttons -->
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
        <script src="{{ asset('admin/assets/js/material-dashboard.min.js?v=3.0.4') }}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>
        <script>
            $(document).ready( function () {
                $('#table_id').DataTable();
            });
        </script>
        @stack('script')
    </body>

</html>