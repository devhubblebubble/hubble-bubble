<div id="studentVolunteersDialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg">
        <div class="slide_header">
            <div class="header_flex">
                <div class="menu__trigger header_toggle_btn" id="closeStudentVolunteer">
                    <i class="ri-close-line"></i>
                </div>
                <div class="header_title">
                    <h1>Student Volunteers</h1>
                </div>
            </div>
        </div>
        <div class="dialog_body scroll">
            <div class="spacing">
                <div class="services_grid team">
                    @foreach(@$studentVolunteers as $volunteer)
                    <div class="service_item">
                        <div class="service_icon team_icon">
                            <img src="{{ @$volunteer->image_url?:'img/users/user_placeholder.png' }}">
                        </div>
                        <div class="service_details team_details">
                            <h3>{{ @$volunteer->name }}</h3>
                            <h6>{{ @$volunteer->designation }}</h6>
                            <p>
                                {{ @$volunteer->description }}
                            </p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>