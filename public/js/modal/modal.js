$('#openAbout').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#aboutDialog').addClass('dialog--open');
});

$('#closeAbout').click(function() {
    $('#aboutDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#aboutDialog').removeClass('dialog--open');
        $('#aboutDialog').removeClass('dialog--close');
    }, 200);
});

$('#openTeam').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#teamDialog').addClass('dialog--open');
});

$('#closeTeam').click(function() {
    $('#teamDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#teamDialog').removeClass('dialog--open');
        $('#teamDialog').removeClass('dialog--close');
    }, 200);
});

$('#closeTeam').click(function() {
    $('#teamDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#teamDialog').removeClass('dialog--open');
        $('#teamDialog').removeClass('dialog--close');
    }, 200);
});

$('#openContact').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#contactDialog').addClass('dialog--open');
});

$('#closeContact').click(function() {
    $('#contactDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#contactDialog').removeClass('dialog--open');
        $('#contactDialog').removeClass('dialog--close');
    }, 200);
});

$('#openNextBatch').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#contactDialog').addClass('dialog--open');
});

$('#openEligibility').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#eligibilityDialog').addClass('dialog--open');
    $("#step-1").show();
    $('#nav-step-1').addClass('active');
});

$('#closeEligibility').click(function() {
    $('#eligibilityDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#eligibilityDialog').removeClass('dialog--open');
        $('#eligibilityDialog').removeClass('dialog--close');
    }, 200);
});