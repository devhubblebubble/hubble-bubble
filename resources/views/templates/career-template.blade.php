<div class="career_body">
    <h2>{{ @$career->name }}</h2>
    <h3>Experience : {{ @$career->experience }}</h3>
    <h4 style="color: #fff">Location : {{ @$career->location }}</h4>
    <div class="career_dynamic">
        {!! htmlspecialchars_decode(@$career->job_description) !!}
    </div>
</div>