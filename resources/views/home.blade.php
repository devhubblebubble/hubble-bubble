@extends('layouts.home-layout')
@section('content')
    <!-- Web Version -->
    <div id="web_layout">
        <h3>
            Our web version is coming soon. <br>
            Please use the mobile version to know more details.
        </h3>
        <h3>
            To use the existing web version please visit <a href="https://youhavejz.com/" target="_blank">www.youhavejz.com</a>
        </h3>
    </div>
    <!--/. Web Version -->

    <!-- Mobile Version -->
    <div id="mobile_layout">
        <!--Menu-->
        @include('templates.side-menu')
        <!--/Menu-->

        <!-- Content -->
        <div id="app_swiper" class="swiper-container">
            <div class="swiper-wrapper">

                <!-- Home -->
                <div class="swiper-slide bark_bg">
                    <div id="page_home" class="bottom_spacing">

                        <canvas id="canv"></canvas>

                        <div class="slide_header">
                            <div class="header_flex">
                                <div class="menu__trigger js-menu-trigger header_toggle_btn">
                                    <i class="ri-menu-2-line"></i>
                                </div>
                                <div class="brand_icon">
                                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.89 23.18">
                                        <path fill="#f05525" d="M7.46,8.83A3.73,3.73,0,0,0,3.73,5.1a3.77,3.77,0,0,0-1.58.35.45.45,0,0,1-.64-.4V.75A.76.76,0,0,0,0,.75V12.58a.76.76,0,1,0,1.51,0V8.83h0A2.22,2.22,0,0,1,6,8.83H6v3a.76.76,0,0,0,1.51,0v-3h0v0" />
                                        <path fill="#f05525" d="M10.91,15.91a3.77,3.77,0,0,0-3.44.53,0,0,0,0,1,0,0V11.35a.3.3,0,0,0-.3-.3h-.9a.3.3,0,0,0-.31.3v8.09a3.74,3.74,0,1,0,7.26-1.24,3.55,3.55,0,0,0-2.3-2.29m-1,5.75a2.23,2.23,0,1,1,2-2,2.23,2.23,0,0,1-2,2" />
                                        <path fill="#f05525" d="M19.65,15.51a.84.84,0,0,1,.61.24.89.89,0,0,1,.23.61v3.56a3.28,3.28,0,0,1-.82,2.36,3.16,3.16,0,0,1-2.39.87,3.12,3.12,0,0,1-2.38-.87,3.32,3.32,0,0,1-.82-2.36V16.36a.85.85,0,0,1,.24-.61.88.88,0,0,1,1.21,0,.85.85,0,0,1,.24.61v3.56a1.77,1.77,0,0,0,.38,1.27,1.44,1.44,0,0,0,1.13.42,1.46,1.46,0,0,0,1.15-.42,1.82,1.82,0,0,0,.38-1.27V16.36a.85.85,0,0,1,.24-.61.81.81,0,0,1,.6-.24" />
                                        <path fill="#f05525" d="M39.07,22.16a.86.86,0,0,1-.25.61.84.84,0,0,1-.61.24.81.81,0,0,1-.59-.24.85.85,0,0,1-.24-.61V14.65a.79.79,0,0,1,.25-.61.81.81,0,0,1,.61-.25.75.75,0,0,1,.59.25.82.82,0,0,1,.24.61Z" />
                                        <path fill="#f05525" d="M43.63,23.15a4,4,0,0,1-2.07-.5,3.37,3.37,0,0,1-1.35-1.35,4,4,0,0,1-.47-1.94,4.25,4.25,0,0,1,.51-2.15,3.67,3.67,0,0,1,1.34-1.37,3.53,3.53,0,0,1,1.75-.47,3.17,3.17,0,0,1,1.36.29,3.91,3.91,0,0,1,1.13.81,4.18,4.18,0,0,1,.78,1.18,3.65,3.65,0,0,1,.28,1.43.71.71,0,0,1-.26.55.91.91,0,0,1-.59.21H40.68l-.42-1.4h5.15l-.31.28v-.38a1.33,1.33,0,0,0-.29-.73,1.88,1.88,0,0,0-.64-.51,1.84,1.84,0,0,0-.83-.19,2.77,2.77,0,0,0-.78.11,1.57,1.57,0,0,0-.63.38,1.81,1.81,0,0,0-.42.72,3.26,3.26,0,0,0-.16,1.13,2.49,2.49,0,0,0,.32,1.29,2.19,2.19,0,0,0,1.87,1.07,3.08,3.08,0,0,0,.83-.09,1.8,1.8,0,0,0,.5-.2l.34-.2a1,1,0,0,1,.48-.13.69.69,0,0,1,.51.21.71.71,0,0,1,.2.49.89.89,0,0,1-.39.69,3,3,0,0,1-1,.54,4.22,4.22,0,0,1-1.36.23" />
                                        <path fill="#ffffff" d="M9.7,17.69h0a.36.36,0,0,0,0,.71h0a1,1,0,0,1,1,1h0a.36.36,0,1,0,.71,0A1.75,1.75,0,0,0,9.7,17.69" />
                                        <path fill="#f05525" d="M28.48,18.09a3.59,3.59,0,0,0-2.31-2.29,3.75,3.75,0,0,0-3.43.53h0V14.54a.75.75,0,0,0-1.5,0v4.79a3.74,3.74,0,1,0,7.26-1.24m-1.32,1.47a2.25,2.25,0,0,1-2,2,2.23,2.23,0,1,1,2-2" />
                                        <path fill="#f05525" d="M36.56,18.09a3.59,3.59,0,0,0-2.31-2.29,3.75,3.75,0,0,0-3.43.53h0V14.54a.75.75,0,0,0-1.5,0v4.79a3.74,3.74,0,1,0,7.26-1.24m-1.32,1.47a2.22,2.22,0,1,1-2.44-2.44,2.24,2.24,0,0,1,2.44,2.44" />
                                        <path fill="#ffffff" d="M13.7,5.78a.81.81,0,0,1,.6.24.85.85,0,0,1,.24.61V10.2a3.27,3.27,0,0,1-.83,2.35,3.12,3.12,0,0,1-2.38.87A3.12,3.12,0,0,1,9,12.55a3.27,3.27,0,0,1-.82-2.35V6.63A.85.85,0,0,1,8.37,6,.81.81,0,0,1,9,5.78a.8.8,0,0,1,.6.24.85.85,0,0,1,.24.61V10.2a1.81,1.81,0,0,0,.38,1.26,1.45,1.45,0,0,0,1.14.42,1.47,1.47,0,0,0,1.15-.42,1.81,1.81,0,0,0,.38-1.26V6.63A.85.85,0,0,1,13.1,6a.8.8,0,0,1,.6-.24" />
                                        <path fill="#ffffff" d="M33.11,12.43a.82.82,0,0,1-.85.85.79.79,0,0,1-.59-.24.85.85,0,0,1-.24-.61V4.92a.84.84,0,0,1,.86-.86.75.75,0,0,1,.59.25.81.81,0,0,1,.23.61Z" />
                                        <path fill="#ffffff" d="M37.67,13.42a4.07,4.07,0,0,1-2.07-.5,3.41,3.41,0,0,1-1.34-1.35,3.9,3.9,0,0,1-.47-1.94,4.28,4.28,0,0,1,.51-2.15,3.67,3.67,0,0,1,1.34-1.37,3.51,3.51,0,0,1,1.75-.47,3.09,3.09,0,0,1,1.35.29,3.66,3.66,0,0,1,1.13.81,3.79,3.79,0,0,1,.78,1.18,3.65,3.65,0,0,1,.29,1.43.72.72,0,0,1-.27.55.87.87,0,0,1-.59.21H34.73l-.43-1.4h5.15L39.14,9V8.61a1.25,1.25,0,0,0-.28-.73,2,2,0,0,0-.65-.51,1.8,1.8,0,0,0-.82-.19,2.77,2.77,0,0,0-.78.11,1.54,1.54,0,0,0-.64.38,2.07,2.07,0,0,0-.42.72,3.59,3.59,0,0,0-.15,1.13,2.49,2.49,0,0,0,.31,1.29,2.32,2.32,0,0,0,.82.8,2.17,2.17,0,0,0,1.06.27,3.13,3.13,0,0,0,.83-.09,1.61,1.61,0,0,0,.49-.2,3.35,3.35,0,0,1,.35-.2,1,1,0,0,1,.47-.13.7.7,0,0,1,.52.21.71.71,0,0,1,.2.49.88.88,0,0,1-.39.69,3.19,3.19,0,0,1-1,.54,4.18,4.18,0,0,1-1.36.23" />
                                        <path fill="#ffffff" d="M22.52,8.36a3.57,3.57,0,0,0-2.3-2.29,3.77,3.77,0,0,0-3.44.53h0V4.81a.76.76,0,0,0-1.51,0v4.8a3.74,3.74,0,1,0,7.26-1.25M21.2,9.83a2.22,2.22,0,1,1-2.43-2.44A2.23,2.23,0,0,1,21.2,9.83" />
                                        <path fill="#ffffff" d="M30.6,8.36a3.57,3.57,0,0,0-2.3-2.29,3.77,3.77,0,0,0-3.44.53h0V4.81a.76.76,0,0,0-1.51,0v4.8A3.74,3.74,0,1,0,30.6,8.36M29.28,9.83a2.22,2.22,0,1,1-2.43-2.44,2.23,2.23,0,0,1,2.43,2.44" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="home_content spacing">
                            <div class="banner_title">
                                <h1>
                                    The right University at your Dream destination is not a dream anymore!​
                                </h1>

                                <h4>Let me help you make it a reality</h4>
                            </div>
                            <div class="home_btn_block">
                                <button type="button" class="btn app_btn btn_primary" id="openEligibility" onclick="openEligibility()">Take the eligibility test​</button>
                                <a href="{{ @$calendly_link }}" target="_blank" class="btn app_btn btn_secondary">Book a quick call​</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/. Home -->

                <!-- Your Journey -->
                @include('templates.slides.your-journey')
                <!--/. Your Journey -->
                
                <!-- Services -->
                @include('templates.slides.services')
                <!--/. Services -->

                <!-- Student Stories -->
                @include('templates.slides.student-stories')
                <!--/. Student Stories -->

            </div>

            <!-- Bottom Nav -->
            <div class="swiper-pagination app_foot_nav"></div>
            <!--/. Bottom Nav -->
        </div>
        <!--/. Content -->

        <!-- Whatsapp -->
        <div class="whatsapp_chat">
            <a href="https://api.whatsapp.com/send/?phone=%2B447904800485&text&app_absent=0" target="_blank">
                <img src="img/main/whatsapp_icon.png">
            </a>
        </div>
        <!--//. Whatsapp -->

        <!-- Check Eligibility -->
        @include('templates.modals.check-eligibility')
        <!--/. Check Eligibility -->

        <!-- About Us -->
        @include('templates.modals.about-us')
        <!--/. About Us -->

        <!-- Our Team -->
        @include('templates.modals.our-team')
        <!--/. Our Team -->
        
        <!-- Our Big Bang -->
        <!-- @include('templates.modals.our-big-bang') -->
        <!--/. Our Big Bang -->

        <!-- Find Us -->
        @include('templates.modals.find-us')
        <!--/. Find Us -->
        
        <!-- Student Volunteers -->
        <!-- @include('templates.modals.student-volunteers') -->
        <!--/. Student Volunteers -->
        
        <!-- Story of Jevin Zac -->
        <!-- @include('templates.modals.story-jevin-zac') -->
        <!--/. Story of Jevin Zac -->

        <!-- Contact Us -->
        <!-- @include('templates.modals.contact-us') -->
        <!--/. Contact Us -->
        
        <!-- Confirmation -->
        <!-- @include('templates.modals.confirmation') -->
        <!--/. Confirmation -->

        <!-- Success -->
        <!-- @include('templates.modals.success') -->
        <!--/. Success -->

         <!-- Dont proceed -->
         <!-- @include('templates.modals.dont-proceed') -->
        <!--/. Dont proceed -->
    </div>

    <!--//. Mobile Version -->
@push('script')
    <script>

    </script>
@endpush
@stop
