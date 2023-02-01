<div id="step-5" class="tab-pane" role="tabpanel" aria-labelledby="step-5">
    <input type="hidden" id="passportFrontDocURL" name="passportFrontDocURL" />
    <input type="hidden" id="passportBackDocURL" name="passportBackDocURL" />
    <input type="hidden" id="tempDoc1URL" name="tempDoc1URL" />
    <input type="hidden" id="tempDoc2URL" name="tempDoc2URL" />
    <input type="hidden" id="tempDoc3URL" name="tempDoc3URL" />
    <input type="hidden" id="tempDoc4URL" name="tempDoc4URL" />
    <input type="hidden" id="tempDoc5URL" name="tempDoc5URL" />
    <input type="hidden" id="plusTwoDocURL" name="plusTwoDocURL" />
    <input type="hidden" id="degreeConsolDocURL" name="degreeConsolDocURL" />
    <input type="hidden" id="degreeTranscDocURL" name="degreeTranscDocURL" />
    <input type="hidden" id="degreeCertDocURL" name="degreeCertDocURL" />
    <div class="form_heading mb-3">
        <h3>Upload Documents</h3>
    </div>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Passport Front (Less than 1 mb)</label>
        <form class="dropzone" id="passportFrontUploader">
        @csrf
        </form>
    </div>
    <label id="passportFrontDoc-error" class="step-5-error" style="display:none;" >
        Please upload your passport front document to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Passport Back (Less than 1 mb)</label>
        <form class="dropzone" id="passportBackUploader">
        @csrf
        </form>
    </div>
    <label id="passportBackDoc-error" class="step-5-error" style="display:none;" >
        Please upload your temp document to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload CV/Resume (Less than 1 mb)</label>
        <form class="dropzone" id="temp1Uploader">
        @csrf
        </form>
    </div>
    <label id="tempDoc1-error" class="step-5-error" style="display:none;" >
        Please upload your CV/Resume to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload 10th mark sheet (Less than 1 mb)</label>
        <form class="dropzone" id="temp2Uploader">
        @csrf
        </form>
    </div>
    <label id="tempDoc2-error" class="step-5-error" style="display:none;" >
        Please upload your 10th mark sheet to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload 12th mark sheet (Less than 1 mb)</label>
        <form class="dropzone" id="plusTwoUploader">
        @csrf
        </form>
    </div>
    <label id="plusTwoDoc-error" style="display:none;" >
        Please upload your 12th mark sheet to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Degree/Masters Consolidated (Less than 1 mb)</label>
        <form class="dropzone" id="degreeConsolUploader">
        @csrf
        </form>
    </div>
    <label id="degreeConsolDoc-error" class="step-5-error" style="display:none;" >
        Please upload your Degree/Masters consolidated to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Degree/Masters Transcript (Less than 1 mb)</label>
        <form class="dropzone" id="degreeTranscUploader">
        @csrf
        </form>
    </div>
    <label id="degreeTranscDoc-error" class="step-5-error" style="display:none;" >
        Please upload your Degree/Masters transcript to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Degree/Masters Certificate (Less than 1 mb)</label>
        <form class="dropzone" id="degreeCertUploader">
        @csrf
        </form>
    </div>
    <label id="degreeCertDoc-error" class="step-5-error" style="display:none;" >
        Please upload your Degree/Masters certificate to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Letter of Recommendation (Less than 1 mb)</label>
        <form class="dropzone" id="temp3Uploader">
        @csrf
        </form>
    </div>
    <label id="tempDoc3-error" class="step-5-error" style="display:none;" >
        Please upload your Letter of Recommendation to continue
    </label>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Medium of Instruction (Less than 1 mb)</label>
        <form class="dropzone" id="temp4Uploader">
        @csrf
        </form>
    </div>
    <div class="form_group mb-3">
        <label class="custom_label">Upload English proficiency test (IELTS/PTE/Duolingo) (Less than 1 mb)</label>
        <form class="dropzone" id="temp5Uploader">
        @csrf
        </form>
    </div>
</div>