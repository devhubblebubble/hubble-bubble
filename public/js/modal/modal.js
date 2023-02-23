$('#openAbout').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#aboutDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeAbout').click(function() {
    $('#aboutDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#aboutDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#aboutDialog').removeClass('dialog--close');
    }, 200);
});

$('#openTeam').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#teamDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeTeam').click(function() {
    $('#teamDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#teamDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#teamDialog').removeClass('dialog--close');
    }, 200);
});

$('#openBigBang').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#ourBigBangDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeBigBang').click(function() {
    $('#ourBigBangDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#ourBigBangDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#ourBigBangDialog').removeClass('dialog--close');
    }, 200);
});

$('#openFindUs').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#findUsDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeFindUs').click(function() {
    $('#findUsDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#findUsDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#findUsDialog').removeClass('dialog--close');
    }, 200);
});

$('#openStudentVolunteers').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#studentVolunteersDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeStudentVolunteer').click(function() {
    $('#studentVolunteersDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#studentVolunteersDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#studentVolunteersDialog').removeClass('dialog--close');
    }, 200);
});

$('#openStoryJevinZac').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#storyJevinZacDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeStoryJevinZac').click(function() {
    $('#storyJevinZacDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#storyJevinZacDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#storyJevinZacDialog').removeClass('dialog--close');
    }, 200);
});

$('#closeTeam').click(function() {
    $('#teamDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#teamDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#teamDialog').removeClass('dialog--close');
    }, 200);
});

$('#openContact').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#contactDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeContact').click(function() {
    $('#contactDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#contactDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#contactDialog').removeClass('dialog--close');
    }, 200);
});

$('#openNextBatch').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#contactDialog').addClass('dialog--open');
    $('body').addClass('scroll_hide');
});

$('#closeEligibility').click(function() {
    $('#eligibilityDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#eligibilityDialog').removeClass('dialog--open');
        $('body').removeClass('scroll_hide');
        $('#eligibilityDialog').removeClass('dialog--close');
    }, 200);
});