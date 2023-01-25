<div id="step-3" class="tab-pane" role="tabpanel" aria-labelledby="step-3">
    <div class="form_heading">
        <h3>Select your preferred country and university</h3>
    </div>

    <div class="form_group mb-3">
        <select id="prefferedCountry" class="form_select multi_select" multiple="multiple">
            <option>UK</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>New Zealand</option>
            <option>Australia</option>
            <option>US</option>
            <option>Other</option>
        </select>
    </div>
    <label id="country-error" style="display: none;" for="name">Please select a country.</label>

    <label id="university-error" style="display: none;" for="name">Please enter atleast one university.</label>
    <div class="add_group">
        <div class="form_group">
            <label class="pure-material-textfield-outlined">
                <input placeholder=" " name="university[]" onkeyup="clearUniversityError();noSpaces(this)" />
                <span>Enter University</span>
            </label>
        </div>
        <button type="button" id="rowAdder" class="add_btn">
            <i class="ri-add-line"></i>
        </button>
    </div>

    <div id="newinput"></div>

</div>