<div id="contactDialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg">
        <div class="slide_header">
            <div class="header_flex">
                <button type="button" class="menu__trigger header_toggle_btn" id="closeContact">
                    <i class="ri-close-line"></i>
                </button>
                <div class="header_title">
                    <h1>Contact Us</h1>
                </div>
            </div>
        </div>
        <div class="dialog_body scroll">
            <div class="page_seperation">
                <div class="spacing">
                    <div class="d-flex contact_head">
                        <h5 class="stepper_title">
                            Fill out the form below <br>so we can reach you ASAP.
                        </h5>
                        <div class="find_us_media">
                            <div class="find_us_icon">
                                <i class="ri-phone-line"></i>
                            </div>
                            <div class="find_us_body">
                                <a href="tel:+919995650969">+91 999 565 0969</a>
                            </div>
                        </div>
                    </div>
                    
                    <form id="contactSupportForm" name="contactSupportForm" >
                        <div class="contact_form">
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="first_name" name="first_name" onkeyup="noSpaces(this)" />
                                <span>First Name</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" "  id="last_name" name="last_name" onkeyup="noSpaces(this)" />
                                <span>Last Name</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " type="number" id="phone_number" name="phone_number" onkeyup="noSpaces(this)"  />
                                <span>Phone Number</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" "  id="email_address" name="email_address" onkeyup="noSpaces(this)" />
                                <span>Email Address</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="contact_preffered_country" name="contact_preffered_country" onkeyup="noSpaces(this)"  />
                                <span>Preferred Country</span>
                                </label>
                            </div>
                            <div class="form_group">
                                <label class="pure-material-textfield-outlined">
                                <input placeholder=" " id="contact_university" name="contact_university" onkeyup="noSpaces(this)"  />
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