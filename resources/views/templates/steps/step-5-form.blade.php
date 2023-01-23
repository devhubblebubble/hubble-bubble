<div id="step-5" class="tab-pane" role="tabpanel" aria-labelledby="step-5">
    <input type="hidden" id="plusTwoDocURL" name="plusTwoDocURL" />
    <input type="hidden" id="degreeDocURL" name="degreeDocURL" />
    <input type="hidden" id="thirdDocURL" name="thirdDocURL" />
    <input type="hidden" id="fourthDocURL" name="fourthDocURL" />
    <div class="form_heading mb-3">
        <h3>Upload Documents</h3>
    </div>

    <div class="form_group mb-3">
        <label class="custom_label">Upload 12th Certificate</label>
        <form class="dropzone" id="uploader1">
        @csrf
        </form>
        <label for="uploader1" class="error" id="plusTwoDocURL-error" style="display:none;" >
            Please upload your +2 document to continue
        </label>
    </div>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Degree Certificate</label>
        <form class="dropzone" id="uploader2">
        @csrf
        </form>
    </div>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Sample 1 Certificate</label>
        <form class="dropzone" id="uploader3">
        @csrf
        </form>
    </div>
    <div class="form_group mb-3">
        <label class="custom_label">Upload Sample 2 Certificate</label>
        <form class="dropzone" id="uploader4">
        @csrf
        </form>
    </div>
</div>