<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name=“ theme-color” content=“#151515>
    <title>Hubble Bubble</title>

    <link rel="icon" type="image/png" href="" />

    <link href="{{ asset('/css/bootstrap/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
    <link href="{{ asset('/css/swiper/swiper-bundle.min.css') }}" rel="stylesheet">
    <link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
    <link href="{{ asset('/css/select2/select2.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('/css/dropzone/dropzone.css') }}" rel="stylesheet" />
    <link href="{{ asset('/css/main.css') }}" rel="stylesheet">
    <!-- Main -->
</head>

<body>
    @yield('content')
    <!-- Core JS Files -->
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script src="{{ asset('/js/TweenMax/TweenMax.min.js') }}"></script>
    <script src="{{ asset('/js/mobile-nav/mobile-nav.js') }}"></script>
    <script src="{{ asset('/js/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('/js/video-js/video.min.js') }}"></script>
    <script src="{{ asset('/js/modal/modal.js') }}"></script>
    <script src="{{ asset('/js/select2/select2.min.js') }}"></script>
    <script src="{{ asset('/js/smartwizard/jquery.smartWizard.min.js') }}"></script>
    <script src="{{ asset('/js/dropzone/dropzone-min.js') }}"></script>
    @include('scripts.home-scripts')
    @stack('script')
</body>

</html>
