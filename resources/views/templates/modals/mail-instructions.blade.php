<div id="mailInstructions" class="dialog">
    <div class="dialog__overlay"></div>
    <div class="dialog__content bark_bg mn_modal">
        <button type="button" class="default_modal_close" id="default_modal_close3">
            <i class="ri-close-line"></i>
        </button>
        <div class="confirmation_box mail_list">
            
            <h1>The details to be shared via email are</h1>
            <ul>
                <li>Passport (front and back)</li>
                <li>CV/Resume</li>
                <li>Std 10th mark sheet (vertical)</li>
                <li>Std 12th mark sheet (vertical)</li>
                <li>Degree/Masters Certificates</li>
                <li>
                    2 LORs - Letter of Recommendation from College and/ Workplace
                    (must contain the name, contact number, and email ID of the referee)
                </li>
                <li>English Proficiency test Certificate (IELTS/PTE/Duolingo)</li>
            </ul>
            
            <a class="btn app_btn btn_primary" id="mailInstructionsClose" href="mailto:hello@hubblebubble.london">Send Email</a>
        </div>
    </div>
</div>

<style>
    .mail_list{
        text-align: left;
    }
    .mail_list h1{
        width: 100%;
        padding-right: 4rem;
    }
    .mail_list li{
        margin-bottom: 0.4rem;
    }
    .mail_list .app_btn{
        width: 100%;
    }
    .mn_modal{
        max-width: 520px !important;
    }
</style>