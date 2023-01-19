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
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#step-1">
                                <span class="num">1</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-2">
                                <span class="num">2</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-3">
                                <span class="num">3</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-4">
                                <span class="num">4</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-5">
                                <span class="num">5</span>
                            </a>
                        </li>
                    </ul>
                    <!--/. Step Label -->
                </div>

                <div class="tab-content">
                    <!-- Step 1 -->
                    <div id="step-1" class="tab-pane" role="tabpanel" aria-labelledby="step-1">

                        <div class="form_group">
                            <label class="pure-material-textfield-outlined">
                            <input placeholder=" ">
                            <span>Enter Your Name</span>
                            </label>
                        </div>
                        <div class="form_group">
                            <label class="pure-material-textfield-outlined">
                            <input placeholder=" ">
                            <span>Enter Your Age</span>
                            </label>
                        </div>
                        <div class="form_group">
                            <label class="pure-material-textfield-outlined">
                            <input placeholder=" ">
                            <span>Enter Current Qualification</span>
                            </label>
                        </div>
                        <div class="form_group">
                            <label class="pure-material-textfield-outlined">
                            <input placeholder=" ">
                            <span>Enter Contact Number</span>
                            </label>
                        </div>
                        <div class="form_group">
                            <label class="pure-material-textfield-outlined">
                            <input placeholder=" ">
                            <span>Enter Email Address &nbsp;<small>(Optional)</small></span>
                            </label>
                        </div>

                    </div>
                    <!--/. Step 1 -->

                    <!-- Step 2 -->
                    <div id="step-2" class="tab-pane" role="tabpanel" aria-labelledby="step-2">
                        <div class="box_radio">
                            <label for="opt1" class="radio">
                                <input type="radio" name="rdo" id="opt1" checked="" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">I know which university and course I want to apply for</span>
                            </label>
                            <label for="opt2" class="radio">
                                <input type="radio" name="rdo" id="opt2" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">I'm not sure which university or course to apply for?</span>
                            </label>
                            <label for="opt3" class="radio">
                                <input type="radio" name="rdo" id="opt3" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">I know my dream career, but I do not know how to get there</span>
                            </label>
                            <label for="opt4" class="radio">
                                <input type="radio" name="rdo" id="opt4" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">The course or university doesn't matter</span>
                            </label>
                        </div>
                    </div>
                    <!--/. Step 2 -->

                    <!-- Step 3 -->
                    <div id="step-3" class="tab-pane" role="tabpanel" aria-labelledby="step-3">
                        <div class="form_heading">
                            <h3>Select your preferred country and university</h3>
                        </div>

                        <div class="form_group mb-3">
                            <select class="form_select multi_select" multiple="multiple">
                                <option>UK</option>
                                <option>Canada</option>
                                <option>Germany</option>
                                <option>New Zealand</option>
                                <option>Australia</option>
                                <option>US</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div class="add_group">
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" ">
                                <span>Enter University</span>
                                </label>
                            </div>
                            <button type="button" id="rowAdder" class="add_btn">
                                <i class="ri-add-line"></i>
                            </button>
                        </div>

                        <div id="newinput"></div>

                    </div>
                    <!--/. Step 3 -->

                    <!-- Step 4 -->
                    <div id="step-4" class="tab-pane" role="tabpanel" aria-labelledby="step-4">
                        <div class="box_radio">
                            <label for="opt5" class="radio">
                                <input type="radio" name="rdo" id="opt5" checked="" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">I will upload my documents now</span>
                            </label>
                            <label for="opt6" class="radio">
                                <input type="radio" name="rdo" id="opt6" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">I will upload my documents to docs@hubblebubble.london</span>
                            </label>
                            <div class="or">
                                <span>Still have questions?</span>
                            </div>
                            <label for="opt7" class="radio">
                                <input type="radio" name="rdo" id="opt7" class="hidden">
                                <span class="label"></span>
                                <span class="label_name">book a call with a Hubble Bubble Mentor</span>
                            </label>
                        </div>
                    </div>
                    <!--/. Step 4 -->

                    <!-- Step 5 -->
                    <div id="step-5" class="tab-pane" role="tabpanel" aria-labelledby="step-5">
                        <div class="form_heading mb-3">
                            <h3>Upload Documents</h3>
                        </div>

                        <div class="form_group mb-3">
                            <label class="custom_label">Upload 12th Certificate</label>
                            <div class="dropzone" id="uploader1"></div>
                        </div>
                        <div class="form_group mb-3">
                            <label class="custom_label">Upload Degree Certificate</label>
                            <div class="dropzone" id="uploader2"></div>
                        </div>
                        <div class="form_group mb-3">
                            <label class="custom_label">Upload Sample 1 Certificate</label>
                            <div class="dropzone" id="uploader3"></div>
                        </div>
                        <div class="form_group mb-3">
                            <label class="custom_label">Upload Sample 2 Certificate</label>
                            <div class="dropzone" id="uploader4"></div>
                        </div>
                    </div>
                    <!--/. Step 5 -->

                </div>

            </div>
        </div>
    </div>
</div>