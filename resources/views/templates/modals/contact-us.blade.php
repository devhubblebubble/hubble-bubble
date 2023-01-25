<div id="contactDialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg">
        <div class="slide_header">
            <div class="header_flex">
                <div class="menu__trigger header_toggle_btn" id="closeContact">
                    <i class="ri-close-line"></i>
                </div>
                <div class="header_title">
                    <h1>Contact Us</h1>
                </div>
            </div>
        </div>
        <div class="dialog_body scroll">
            <div class="page_seperation">
                <div class="spacing">
                    <h5 class="stepper_title">
                        Fill out the form below <br>so we can reach you ASAP.
                    </h5>
                    <form id="contactSupportForm" name="contactSupportForm" >
                        <div class="contact_form">
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="first_name" name="first_name" />
                                <span>First Name</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" "  id="last_name" name="last_name" />
                                <span>Last Name</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " type="number" id="phone_number" name="phone_number"  />
                                <span>Phone Number</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" "  id="email_address" name="email_address" />
                                <span>Email Address</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="contact_preffered_country" name="contact_preffered_country"  />
                                <span>Preferred Country</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="contact_university" name="contact_university"  />
                                <span>Course/University</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="sw-toolbar-elm toolbar toolbar-bottom">
                    <button class="btn app_btn btn_primary" onclick="submitContactForm()" >Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>