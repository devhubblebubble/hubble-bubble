<div id="careerDialog" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg">
        <div class="slide_header">
            <div class="header_flex">
                <button type="button" class="menu__trigger header_toggle_btn" id="closeCareer">
                    <i class="ri-close-line"></i>
                </button>
                <div class="header_title">
                    <h1>Career</h1>
                </div>
            </div>
        </div>
        <div class="dialog_body scroll">
            <div class="spacing">
                <div class="career_listing">
                    @foreach($careers as $career)
                        <div class="career_item" onclick="openCareerDetails('{{ @$career->id }}')">
                            <div class="career_body">
                                <h2>{{ @$career->name }}</h2>
                                <h3>Experience : {{ @$career->experience }}</h3>
                                <h4>Location : {{ @$career->location }}</h4>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@push('script')
<script>
    function openCareerDetails(id){
        let ajaxURL = "{{ url('/fetch-career-template') }}";
        $.ajax({
                type: "post",
                url: ajaxURL,
                data: {
                    _token: '{{csrf_token()}}',
                    id
                },
                success: function(res)
                {
                    let response = JSON.parse(res);
                    if (response.status == "success") {
                        $('#career_detail_template').html(response.data.template);
                        $('.menu__trigger--close').trigger('click');
                        $('#careerDetailsDialog').addClass('dialog--open');
                    }
                }, error: function(res)
                {
                },
            });
    }
</script>
@endpush