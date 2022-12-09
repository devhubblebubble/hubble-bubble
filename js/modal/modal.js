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

$('#openEligibility').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#eligibilityDialog').addClass('dialog--open');
});

$('#closeEligibility').click(function() {
    $('#eligibilityDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#eligibilityDialog').removeClass('dialog--open');
        $('#eligibilityDialog').removeClass('dialog--close');
    }, 200);
});