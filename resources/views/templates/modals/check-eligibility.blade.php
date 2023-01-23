<div id="eligibilityDialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg">
        <div class="slide_header">
            <div class="header_flex">
                <div class="menu__trigger header_toggle_btn" id="closeEligibility">
                    <i class="ri-close-line"></i>
                </div>
                <div class="header_title">
                    <h1>Check Eligibility</h1>
                </div>
            </div>
        </div>
        <div class="dialog_body">
            <div id="smartwizard" class="page_seperation">
                <div class="tab-head">
                    <h5 class="stepper_title">
                        Let Hubble Bubble help you discover <br>you dream career
                    </h5>
                    <!-- Step Label -->
                    @include('templates.steps.steps-nav-bar')
                    <!--/. Step Label -->
                </div>

                <div class="tab-content">
                    <!-- Step 1 -->
                    @include('templates.steps.step-1-form')
                    <!--/. Step 1 -->

                    <!-- Step 2 -->
                    @include('templates.steps.step-2-form')
                    <!--/. Step 2 -->

                    <!-- Step 3 -->
                    @include('templates.steps.step-3-form')
                    <!--/. Step 3 -->
                    
                    <!-- Step 4 -->
                    @include('templates.steps.step-4-form')
                    <!--/. Step 4 -->
                    
                    <!-- Step 5 -->
                    @include('templates.steps.step-5-form')
                    <!--/. Step 5 -->

                </div>
                <div class="sw-toolbar-elm toolbar toolbar-bottom" role="toolbar">
                    <button class="btn sw-btn-prev sw-btn disabled" type="button">Prev</button>
                    <button class="btn sw-btn-next sw-btn" type="button">Next</button>
                    <button id="form_submit" class="btn app_btn btn_primary" style="display: none;">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>