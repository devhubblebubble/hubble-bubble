    <script>
        $(document).ready(function() {
            player.pause();
            // Copyright Year
            $(".spanYear").html(new Date().getFullYear());
        });

        // Swiper Home
        var icon = ['ri-home-5-fill', 'ri-flight-takeoff-line', 'ri-settings-3-fill', 'ri-chat-quote-fill']
        var menu = ['Home', 'Your Journey', 'Services', 'Student Stories']

        var mySwiper = new Swiper('#app_swiper', {
            effect: "creative",
            allowTouchMove: false,
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400]
                },
                next: {
                    translate: ["100%", 0, 0]
                }
            },

            // App Menus
            pagination: {
                el: '.app_foot_nav',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '"> <i class="' + (icon[index]) + '"></i>' + (menu[index]) + '</span>';
                },
            },
        })

        // Swiper Journey
        var swiper = new Swiper(".journeySwiper", {
            pagination: {
                el: ".journey_pagination",
            },
        });

        // Swiper Stories


        // variable 
        var VIDEO_PLAYING_STATE = {
            "PLAYING": "PLAYING",
            "PAUSE": "PAUSE"
        }
        var videoPlayStatus = VIDEO_PLAYING_STATE.PAUSE
        var timeout = null
        var waiting = 10000
        var swiper = new Swiper(
            '.storiesSwiper', {
                // enabled: false,
                loop: true,
                direction: "vertical",
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

        // HTML5 vdo object
        var options = {};
        var player = videojs('my-player', options);
        player.pause();
        player.on('ended', function() {
            next()
        })

        // swiper object
        swiper.on('slideChangeTransitionEnd', function() {
            var index = swiper.activeIndex
            var currentSlide = $(swiper.slides[index])
            var currentSlideType = currentSlide.data('slide-type')

            // incase user click next before video ended
            if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
                player.pause()
            }

            clearTimeout(timeout)

            switch (currentSlideType) {
                case 'img':
                    runNext()
                    break;
                case 'vdo':
                    player.currentTime(0)
                    player.play()
                    videoPlayStatus = VIDEO_PLAYING_STATE.PLAYING
                    break;
                default:
                    throw new Error('invalid slide type');
            }
        })

        // global function
        function prev() {
            swiper.slidePrev();
        }

        function next() {
            swiper.slideNext();
        }

        function runNext() {
            timeout = setTimeout(function() {
                next()
            }, waiting)
        }
        // this.player.controls(false)

        runNext()


        $('.swiper_back').click(function() {
            player.pause();
            $(".app_foot_nav > .swiper-pagination-bullet:first-child").trigger("click");
        });

        $('.app_foot_nav .swiper-pagination-bullet').click(function() {
            player.pause();
        });

        // $('#smartwizard').smartWizard({
        //     // selected: 4,
        //     enableUrlHash: false,
        //     style: {
        //         btnNextCss: 'sw-btn-next',
        //         btnPrevCss: 'sw-btn-prev',
        //     },
        //     lang: {
        //         next: 'Next',
        //         previous: 'Prev'
        //     },
        //     toolbar: {
        //         extraHtml: `<button id="form_submit" class="btn app_btn btn_primary">Submit</button>`
        //     },
        //     anchor: {
        //         enableNavigation: false, //
        //         enableNavigationAlways: false, // Activates all anchors clickable always
        //         enableDoneState: true, // Add done state on visited steps
        //         markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
        //         unDoneOnBackNavigation: false, // While navigate back, done state will be cleared
        //         enableDoneStateNavigation: true //
        //     }
        //     // SmartWizard initialize with step content callback
        //     // getContent: provideContent
        // });
        $('#form_submit').hide();
        // $("#smartwizard").on("leaveStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
        //     // e.preventDefault();
        //     $('#smartwizard').smartWizard("loader", "show");
        // });

        $("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection, stepPosition) {
            if(stepIndex == 2 && stepDirection == 'forward'){
                $('#nav-step-3').removeClass('active');
                $(".tab-pane").hide();
                $('#smartwizard').smartWizard("goToStep", 4, true);
                $("#step-5").show();
                $('#nav-step-5').addClass('active');
                $(".sw-btn-next").addClass("disabled");
            } else {
                $("#step-5").hide();
                $('#nav-step-5').removeClass('active');
            }
        });

        /* The hubble flow */

        let currentStepIndex = 1;
        let nextStepIndex = 2;

        $(".sw-btn-next").click(function(e){
            let studentId = $("#student_id").val();
            if(currentStepIndex == 1) {
                saveStepOne(studentId);
            }
            else if(currentStepIndex == 2) {                
                saveStepTwo(studentId);
            }
            else if(currentStepIndex == 3) {
                saveStepThree(studentId);
            }
            else if(currentStepIndex == 4) {
                saveStepFour(studentId);
            }
        });

        $(".sw-btn-prev").click(function(e){
            if(currentStepIndex == 2) {  
                currentStepIndex = 1;
                nextStepIndex = 2;              
                loadPrevStep(2, 1);
            }
            else if(currentStepIndex == 3) {
                currentStepIndex = 2;
                nextStepIndex = 3;              
                loadPrevStep(3, 2);
            }
            else if(currentStepIndex == 4) {
                currentStepIndex = 3;
                nextStepIndex = 4;              
                loadPrevStep(4, 3);
            }
            else if(currentStepIndex == 5) {
                currentStepIndex = 4;
                nextStepIndex = 5;              
                loadPrevStep(5, 4);
            }
        });

        function loadPrevStep(hideStep, showStep){
            displayButtonsLogic(currentStepIndex);
            setTimeout(() => {
                /* Change last step's status from active to done */
                $('#nav-step-'+hideStep).removeClass('active');
                /* Hide all steps */
                $(".tab-pane").hide();
                /* Change next step's status to active */
                $("#step-"+showStep).show();
                $('#nav-step-'+showStep).addClass('active');
                $('#nav-step-'+showStep).removeClass('done');
                $('#form_submit').hide();
                displayButtonsLogic(currentStepIndex);
            }, 100);
        }

        $('input[name="step_two_rdo"]').click(function(e){
            $('#step-2-error').hide();
        });

        function clearUniversityError() {
            var university = $('input[name="university[]"]').map(function(){
                if(this.value) {
                    return this.value
                } 
            }).get();
            if(university.length > 0){
                $('#university-error').hide();
            }
        }

        /* Step 1 form validation */
        function validateStepOneForm(){
            $("#stepOneForm").validate({
                ignore:'',
                rules: {
                    name: {
                        required: true
                    },
                    age: {
                        number: true,
                        required: true
                    },
                    qualification: {
                        required: true
                    },
                    contact_number: {
                        required: true
                    },
                    email: {
                        email: true
                    },
                },
                messages: {
                    name: {
                        required: "Please enter your name."
                    },
                    age: {
                        number: "Please enter a valid number as age.",
                        required: "Please enter your age."
                    },
                    qualification: {
                        required: "Please enter your qualification."
                    },
                    contact_number: {
                        required: "Please enter your contact number."
                    },
                    email: {
                        required: "Please enter a valid email ID."
                    },
                },
                errorPlacement: function(error, element) {
                    // console.log(error, element,element[0].id,  element.val());
                    // if(!$("#"+element[0].id).val()){
                        error.insertAfter(element.next());
                    // }
                },
                success: function(label,element) {
                },
            });
        }

        function errorRemove(element){
            $('#'+element.id+'-error').hide();
        }

        function saveStepOne(studentId) {
            validateStepOneForm();
            var valid = $("#stepOneForm").valid();
            if(!valid){
                return false;
            }
            var formData = {};
            let serializedForm = $("#stepOneForm").serializeArray();
            serializedForm.forEach(element => {
                formData[element.name] = element.value;
            });
            formData._token =  '{{csrf_token()}}';
            formData.id =  studentId;
            let ajaxURL = "{{ url('/save-step-one') }}";
            $(".sw-btn-next").html('<i id="loader" class="ri-loader-2-line"></i>&nbspNext')
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        currentStepIndex = 2;
                        nextStepIndex = 3;
                        loadNextStep(1, 2);
                        $("#student_id").val(response.data.studentId);
                        // Show the loader
                        $(".sw-btn-next").html('Next')
                    }
                }, error: function(res)
                {
                    // Hide the loader
                    $(".sw-btn-next").html('Next')
                },
            });
        }

        let step2Options = {
            1: "I know which university and course I want to apply for",
            2: "I'm not sure which university or course to apply for?",
            3: "I know my dream career, but I do not know how to get there",
            4: "The course or university doesn't matter",
        }

        function saveStepTwo(studentId) {
            let step2Choice = $('input[name="step_two_rdo"]:checked').val();
            /* Step 2 Validation */
            if(!step2Choice){
                $('#step-2-error').show();
                document.getElementById("step-2-error").scrollIntoView();
                return false;
            } else {
                $('#step-2-error').hide();
            }
            var formData = {};
            formData.step2 =  step2Options[step2Choice];
            formData.id =  studentId;
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('/save-step-two') }}";
            $(".sw-btn-next").html('<i id="loader" class="ri-loader-2-line"></i>&nbspNext')
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        if(step2Choice == "1"){
                            currentStepIndex = 3;
                            nextStepIndex = 4;
                            loadNextStep(2, 3);
                        } else {
                            showConfirm(); 
                        }
                        // Show the loader
                        $(".sw-btn-next").html('Next')
                    }
                }, error: function(res)
                {
                    // Hide the loader
                    $(".sw-btn-next").html('Next')
                },
            });
        }

        function saveStepThree(studentId){
            let prefferedCountry = $('#prefferedCountry').select2('val');
            var university = $('input[name="university[]"]').map(function(){
                if(this.value) {
                    return this.value
                } 
            }).get();
            let valid = true;
            if(!prefferedCountry){
                $("#country-error").show();
                valid = false;
            } 
            if(university.length == 0){
                $("#university-error").show();
                valid = false;
            } else {
                $("#university-error").hide();
            }
            if(!valid){
                return false;
            }
            var formData = {};
            formData.id = studentId;
            formData.country = JSON.stringify(prefferedCountry);
            formData.university = JSON.stringify(university);
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('/save-step-three') }}";
            $(".sw-btn-next").html('<i id="loader" class="ri-loader-2-line"></i>&nbspNext')
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        currentStepIndex = 4;
                        nextStepIndex = 5;
                        loadNextStep(3, 4);
                        // Show the loader
                        $(".sw-btn-next").html('Next')
                    }
                }, error: function(res)
                {
                    // Hide the loader
                    $(".sw-btn-next").html('Next')
                },
            });
        }

        let step4Options = {
            1: "I will upload my documents now",
            2: "I will upload my documents to docs@hubblebubble.london",
            3: "book a call with a Hubble Bubble Mentor"
        }

        function saveStepFour(studentId){
            let step4Value = $('input[name="step_4_rdo"]:checked').val();
            if(!step4Value){
                $('#step-4-error').show();
                document.getElementById("step-2-error").scrollIntoView({ behavior: 'smooth'});
                return false;
            } else {
                $('#step-4-error').hide();
            }
            var formData = {};
            formData.id = studentId;
            formData.step4 = step4Options[step4Value];
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('/save-step-four') }}";
            $(".sw-btn-next").html('<i id="loader" class="ri-loader-2-line"></i>&nbspNext')
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        if(step4Value == "1"){
                            currentStepIndex = 5;
                            nextStepIndex = 0;
                            loadNextStep(4, 5);
                        } 
                        else if(step4Value == "2"){
                            $('#eligibilityDialog').removeClass('dialog--open');
                            formsReset();
                            window.open('mailto:docs@hubblebubble.london');
                        }
                        else {
                            showConfirm(); 
                        }        
                        // Show the loader
                        $(".sw-btn-next").html('Next')
                    }
                }, error: function(res)
                {
                    // Hide the loader
                    $(".sw-btn-next").html('Next')
                },
            });
        }

        function saveStepFive(studentId){
            let plusTwoDocURL = $("#plusTwoDocURL").val();
            let valid = true;
            if(!plusTwoDocURL){
                $('#plusTwoDoc-error').show();
                document.getElementById("plusTwoDoc-error").scrollIntoView({ behavior: 'smooth'});
                valid = false;
            } else {
                $('#plusTwoDoc-error').hide();
            }
            if(!valid){
                return false;
            }
            var formData = {};
            formData.id = studentId;
            formData.plusTwoDocURL = $("#plusTwoDocURL").val();
            formData.degreeDocURL = $("#degreeDocURL").val();
            formData.thirdDocURL = $("#thirdDocURL").val();
            formData.fourthDocURL = $("#fourthDocURL").val();
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('/save-step-five') }}";
            $(".sw-btn-next").html('<i id="loader" class="ri-loader-2-line"></i>&nbspNext')
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        showSuccess();
                        // Show the loader
                        $(".sw-btn-next").html('Next')
                    }
                }, error: function(res)
                {
                    // Hide the loader
                    $(".sw-btn-next").html('Next')
                },
            });
        }

        function loadNextStep(hideStep, showStep){
            displayButtonsLogic(currentStepIndex);
            setTimeout(() => {
                /* Change last step's status from active to done */
                $('#nav-step-'+hideStep).removeClass('active');
                $('#nav-step-'+hideStep).addClass('done');
                /* Hide all steps */
                $(".tab-pane").hide();
                /* Change next step's status to active */
                $("#step-"+showStep).show();
                $('#nav-step-'+showStep).addClass('active');
                displayButtonsLogic(currentStepIndex);
            }, 100);
        }

        function displayButtonsLogic(currentStepIndex){
            if(currentStepIndex == 1){
                $('.sw-btn-next').show();
                $('.sw-btn-prev').hide();
            }
            if(currentStepIndex > 1){
                $('.sw-btn-prev').show();
                $('.sw-btn-prev').removeClass('disabled');
            }
            if(currentStepIndex == 5) {
                $('#form_submit').show();
                $('.sw-btn-next').hide();
            } else {
                $('.sw-btn-next').show();
                $('#form_submit').hide();
            }
        }
    </script>

    <script>
        $(".multi_select").select2({
            tags: true,
            tokenSeparators: [',', ' '],
            placeholder: "Select Country",
        }).on("select2:select", function (e) {   
            $("#country-error").hide();
         });
    </script>

    <script>
        $("#rowAdder").click(function() {
            newRowAdd = '<div class="add_group" id="append_row">' +
                '<div class="form_group">' +
                '<label class="pure-material-textfield-outlined">' +
                '<input placeholder=" " name="university[]" onkeyup="clearUniversityError();noSpaces(this)" >' +
                '<span>Enter University</span>' +
                '</label>' +
                '</div>' +
                '<button type="button" id="DeleteRow" class="delete_btn">' +
                '<i class="ri-delete-bin-7-line"></i>' +
                '</button>' +
                '</div>';
            $('#newinput').append(newRowAdd);
        });
        $("body").on("click", "#DeleteRow", function() {
            $(this).parents("#append_row").remove();
        })
    </script>

    <script>
        const myDropzoneTheFirst = new Dropzone("#uploader1", {
            url: "/save-documents/plus-two-certificate",
            addRemoveLinks: true,
            // maxFilesize: 1, // MB
            maxFiles:1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;
                this.on("addedfile", function() {          
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);               
                    }
                });
                this.on('removedfile', function(file) {                
                });
                this.on('sending', function(file, xhr, formData) {
                    /* Dont delete may need in future for linking files directly to students before saving step 5 */
                    // let studentId = $("#student_id").val();
                    // formData.append('id',studentId);
                });
                this.on('success', function( file, xhRes ){
                    let res = JSON.parse(xhRes);
                    $("#plusTwoDocURL").val(res.data.image_url);
                    $('#plusTwoDoc-error').hide();
                });
            }
        });

        const myDropzoneTheSecond = new Dropzone("#uploader2", {
            url: "/save-documents/degree-certificate",
            addRemoveLinks: true,
            // maxFilesize: 1, // MB
            maxFiles:1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;
                this.on("addedfile", function() {          
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);               
                    }
                });
                this.on('removedfile', function(file) {                
                });
                this.on('sending', function(file, xhr, formData) {
                    let studentId = $("#student_id").val();
                    formData.append('id',studentId);
                });
                this.on('success', function( file, xhRes ){
                    let res = JSON.parse(xhRes);
                    $("#degreeDocURL").val(res.data.image_url);
                });
            }
        });
        const myDropzoneTheThird = new Dropzone("#uploader3", {
            url: "/save-documents/third-certificate",
            addRemoveLinks: true,
            // maxFilesize: 1, // MB
            maxFiles:1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;
                this.on("addedfile", function() {          
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);               
                    }
                });
                this.on('removedfile', function(file) {                
                });
                this.on('sending', function(file, xhr, formData) {
                });
                this.on('success', function( file, xhRes ){
                    let res = JSON.parse(xhRes);
                    $("#thirdDocURL").val(res.data.image_url);
                });
            }
        });
        const myDropzoneTheFourth = new Dropzone("#uploader4", {
            url: "/save-documents/fourth-certificate",
            addRemoveLinks: true,
            // maxFilesize: 1, // MB
            maxFiles:1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;
                this.on("addedfile", function() {          
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);               
                    }
                });
                this.on('removedfile', function(file) {                
                });
                this.on('sending', function(file, xhr, formData) {
                });
                this.on('success', function( file, xhRes ){
                    let res = JSON.parse(xhRes);
                    $("#fourthDocURL").val(res.data.image_url);
                });
            }
        });
    </script>

    <script>
        $('#form_submit').click(function() {
            let studentId = $("#student_id").val();
            saveStepFive(studentId)
        });

        $('#confirmationDialogClose').click(function() {
            $('#confirmationDialog').removeClass('dialog--open');
        });

        $('#successDialogClose').click(function() {
            $('#successDialog').removeClass('dialog--open');
        });

        function showConfirm() {
            $('#eligibilityDialog').removeClass('dialog--open');
            $('#confirmationDialog').addClass('dialog--open');
            formsReset();
        }
        
        function showSuccess() {
            $('#eligibilityDialog').removeClass('dialog--open');
            $('#successDialog').addClass('dialog--open');
            formsReset();
        }

        function formsReset(){
            currentStepIndex = 1;
            nextStepIndex = 2;
            $('#form_submit').hide();
            $(".nav-link").removeClass("active");
            $(".nav-link").removeClass("done");
            $("#stepOneForm")[0].reset();
            $(".error").remove();
            /* Change last step's status from active to done */
            $('#nav-step-5').removeClass('active');
            /* Hide all steps */
            $(".tab-pane").hide();
            /* Change next step's status to active */
            $("#step-1").show();
            $('#nav-step-1').addClass('active');
            $('.sw-btn-prev').hide();
            $("#newinput").html("")
            displayButtonsLogic(1);
            $("#student_id").val("");
            $("#plusTwoDocURL").val("");
            $("#degreeDocURL").val("");
            $("#thirdDocURL").val("");
            $("#fourthDocURL").val("");
            /* Clear step 2  */
            let step2Choice = $('input[name="step_two_rdo"]:checked').val();
            if(step2Choice){
                document.querySelector('input[name = "step_two_rdo"]:checked').checked = false;
            }
            /* Clear step 3 */
            $('#prefferedCountry').val('').trigger('change');
            $('input[name="university[]"]').map(function(){
                this.value = "";
            })
            /* Clear step 4 */
            let step4Value = $('input[name="step_4_rdo"]:checked').val();
            if(step4Value){
                document.querySelector('input[name = "step_4_rdo"]:checked').checked = false;
            }
            dropzoneReset('uploader1');
            dropzoneReset('uploader2');
            dropzoneReset('uploader3');
            dropzoneReset('uploader4');
        }

        function dropzoneReset(id) {
            let uploader = document.querySelector(`#${id} > div.dz-preview.dz-processing.dz-image-preview.dz-success.dz-complete > a`);
            if(uploader){
                uploader.click();
            }
        }
    </script>

    <script>
        $(".app_foot_nav > .swiper-pagination-bullet:last-child").click(function() {
            setTimeout(function() {
                $('#animated_card').addClass('hvr-bob');
            }, 4000);
        });

        function goToCalendly(){
            var win = window.open("{{ @$calendly_link }}", '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
        }

        function submitContactForm(){
            contactSupportFormValidation();
            var valid = $("#contactSupportForm").valid();
            if(!valid){
                return false;
            }
            var formData = {};
            let serializedForm = $("#contactSupportForm").serializeArray();
            serializedForm.forEach(element => {
                formData[element.name] = element.value;
            });
            formData._token =  '{{csrf_token()}}';
            let ajaxURL = "{{ url('/save-contact-support') }}";
            $.ajax({
                type: "post",
                url: ajaxURL,
                data: formData,
                success: function(res)
                {
                    let response = JSON.parse(res)
                    if(response.status){
                        $("#contactSupportForm")[0].reset();
                        $('#successDialog').addClass('dialog--open');
                    }
                }, error: function(res)
                {
                },
            });
        }

        function contactSupportFormValidation(){
            $("#contactSupportForm").validate({
                ignore:'',
                rules: {
                    first_name: {
                        required: true
                    },
                    last_name: {
                        required: true
                    },
                    phone_number: {
                        required: true
                    },
                    email_address: {
                        email:true,
                        required: true
                    },
                    contact_preffered_country: {
                        required: true
                    },
                    contact_university: {
                        required: true
                    },
                },
                messages: {
                    first_name: {
                        required: "Please enter your first name."
                    },
                    last_name: {
                        required: "Please enter your last name."
                    },
                    phone_number: {
                        required: "Please enter your phone number."
                    },
                    email_address: {
                        email: "Please enter a valid email ID.",
                        required: "Please enter your email ID."
                    },
                    contact_preffered_country: {
                        required: "Please enter your Preferred country."
                    },
                    contact_university: {
                        required: "Please enter a university."
                    },
                },
                errorPlacement: function(error, element) {
                    error.insertAfter(element.next());
                },
                success: function(label,element) {
                },
            });
        }

        function openEligibility() {
            $('.menu__trigger--close').trigger('click');
            $('#eligibilityDialog').addClass('dialog--open');
            setTimeout(() => {
                $("#step-1").show();
                $('#nav-step-1').addClass('active');
            }, 100);
        }

        function noSpaces(ele){
            if ($(ele).val() && $(ele).val()[0] === ' ') {
                $(ele).val($.trim($(ele).val()));
            }
        }
    </script>

    <script>
        //  Banner Animation

        var canvas = document.getElementById("canv");
        var num = 300;
        var w = window.innerWidth;
        var h = window.innerHeight;
        var max = 100;
        var _x = 0;
        var _y = 0;
        var _z = 150;
        var dtr = function(d) {
            return d * Math.PI / 150;
        };

        var rnd = function() {
            return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
        };
        var dist = function(p1, p2, p3) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
        };

        var cam = {
            obj: {
                x: _x,
                y: _y,
                z: _z
            },
            dest: {
                x: 0,
                y: 0,
                z: 1
            },
            dist: {
                x: 0,
                y: 0,
                z: 200
            },
            ang: {
                cplane: 0,
                splane: 0,
                ctheta: 0,
                stheta: 0
            },
            zoom: 2,
            disp: {
                x: w / 8,
                y: h / 8,
                z: 0
            },
            upd: function() {
                cam.dist.x = cam.dest.x - cam.obj.x;
                cam.dist.y = cam.dest.y - cam.obj.y;
                cam.dist.z = cam.dest.z - cam.obj.z;
                cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
            }
        };

        var trans = {
            parts: {
                sz: function(p, sz) {
                    return {
                        x: p.x * sz.x,
                        y: p.y * sz.y,
                        z: p.z * sz.z
                    };
                },
                rot: {
                    x: function(p, rot) {
                        return {
                            x: p.x,
                            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                        };
                    },
                    y: function(p, rot) {
                        return {
                            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                            y: p.y,
                            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                        };
                    },
                    z: function(p, rot) {
                        return {
                            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                            z: p.z
                        };
                    }
                },
                pos: function(p, pos) {
                    return {
                        x: p.x + pos.x,
                        y: p.y + pos.y,
                        z: p.z + pos.z
                    };
                }
            },
            pov: {
                plane: function(p) {
                    return {
                        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                        y: p.y,
                        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                    };
                },
                theta: function(p) {
                    return {
                        x: p.x,
                        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                    };
                },
                set: function(p) {
                    return {
                        x: p.x - cam.obj.x,
                        y: p.y - cam.obj.y,
                        z: p.z - cam.obj.z
                    };
                }
            },
            persp: function(p) {
                return {
                    x: p.x * cam.dist.z / p.z * cam.zoom,
                    y: p.y * cam.dist.z / p.z * cam.zoom,
                    z: p.z * cam.zoom,
                    p: cam.dist.z / p.z
                };
            },
            disp: function(p, disp) {
                return {
                    x: p.x + disp.x,
                    y: -p.y + disp.y,
                    z: p.z + disp.z,
                    p: p.p
                };
            },
            steps: function(_obj_, sz, rot, pos, disp) {
                var _args = trans.parts.sz(_obj_, sz);
                _args = trans.parts.rot.x(_args, rot);
                _args = trans.parts.rot.y(_args, rot);
                _args = trans.parts.rot.z(_args, rot);
                _args = trans.parts.pos(_args, pos);
                _args = trans.pov.plane(_args);
                _args = trans.pov.theta(_args);
                _args = trans.pov.set(_args);
                _args = trans.persp(_args);
                _args = trans.disp(_args, disp);
                return _args;
            }
        };

        (function() {
            "use strict";
            var threeD = function(param) {
                this.transIn = {};
                this.transOut = {};
                this.transIn.vtx = (param.vtx);
                this.transIn.sz = (param.sz);
                this.transIn.rot = (param.rot);
                this.transIn.pos = (param.pos);
            };

            threeD.prototype.vupd = function() {
                this.transOut = trans.steps(
                    this.transIn.vtx,
                    this.transIn.sz,
                    this.transIn.rot,
                    this.transIn.pos,
                    cam.disp
                );
            };

            var Build = function() {
                this.vel = 0.04;
                this.lim = 360;
                this.diff = 200;
                this.initPos = 100;
                this.toX = _x;
                this.toY = _y;
                this.go();
            };

            Build.prototype.go = function() {
                this.canvas = document.getElementById("canv");
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.$ = canv.getContext("2d");
                this.$.globalCompositeOperation = 'source-over';
                this.varr = [];
                this.dist = [];
                this.calc = [];

                for (var i = 0, len = num; i < len; i++) {
                    this.add();
                }

                this.rotObj = {
                    x: 0,
                    y: 0,
                    z: 0
                };
                this.objSz = {
                    x: w / 5,
                    y: h / 5,
                    z: w / 5
                };
            };

            Build.prototype.add = function() {
                this.varr.push(new threeD({
                    vtx: {
                        x: rnd(),
                        y: rnd(),
                        z: rnd()
                    },
                    sz: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    rot: {
                        x: 20,
                        y: -20,
                        z: 0
                    },
                    pos: {
                        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                    }
                }));
                this.calc.push({
                    x: 360 * Math.random(),
                    y: 360 * Math.random(),
                    z: 360 * Math.random()
                });
            };

            Build.prototype.upd = function() {
                cam.obj.x += (this.toX - cam.obj.x) * 0.05;
                cam.obj.y += (this.toY - cam.obj.y) * 0.05;
            };

            Build.prototype.draw = function() {
                this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
                cam.upd();
                this.rotObj.x += 0.1;
                this.rotObj.y += 0.1;
                this.rotObj.z += 0.1;

                for (var i = 0; i < this.varr.length; i++) {
                    for (var val in this.calc[i]) {
                        if (this.calc[i].hasOwnProperty(val)) {
                            this.calc[i][val] += this.vel;
                            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                        }
                    }

                    this.varr[i].transIn.pos = {
                        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                    };
                    this.varr[i].transIn.rot = this.rotObj;
                    this.varr[i].transIn.sz = this.objSz;
                    this.varr[i].vupd();
                    if (this.varr[i].transOut.p < 0) continue;
                    var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                    this.$.globalCompositeOperation = 'lighter';
                    g.addColorStop(0, '#fff');
                    g.addColorStop(.5, 'rgba(255,255,255,0.5)');
                    g.addColorStop(1, 'rgba(255,255,255,0.2)');
                    this.$.fillStyle = g;
                    this.$.beginPath();
                    this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                    this.$.fill();
                    this.$.closePath();
                }
            };
            Build.prototype.anim = function() {
                window.requestAnimationFrame = (function() {
                    return window.requestAnimationFrame ||
                        function(callback, element) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();
                var anim = function() {
                    this.upd();
                    this.draw();
                    window.requestAnimationFrame(anim);
                }.bind(this);
                window.requestAnimationFrame(anim);
            };

            Build.prototype.run = function() {
                this.anim();

                window.addEventListener('mousemove', function(e) {
                    this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
                }.bind(this));
                window.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                    this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
                }.bind(this));
                // window.addEventListener('mousedown', function(e) {
                //     for (var i = 0; i < 100; i++) {
                //         this.add();
                //     }
                // }.bind(this));
                // window.addEventListener('touchstart', function(e) {
                //     e.preventDefault();
                //     for (var i = 0; i < 100; i++) {
                //         this.add();
                //     }
                // }.bind(this));
            };
            var app = new Build();
            app.run();
        })();
        window.addEventListener('resize', function() {
            canvas.width = w = window.innerWidth;
            canvas.height = h = window.innerHeight;
        }, false);
    </script>
