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

$('#openBigBang').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#ourBigBangDialog').addClass('dialog--open');
});

$('#closeBigBang').click(function() {
    $('#ourBigBangDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#ourBigBangDialog').removeClass('dialog--open');
        $('#ourBigBangDialog').removeClass('dialog--close');
    }, 200);
});

$('#openFindUs').click(function() {
    $('.menu__trigger--close').trigger('click');
    $('#findUsDialog').addClass('dialog--open');
});

$('#closeFindUs').click(function() {
    $('#findUsDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#findUsDialog').removeClass('dialog--open');
        $('#findUsDialog').removeClass('dialog--close');
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

$('#closeEligibility').click(function() {
    $('#eligibilityDialog').addClass('dialog--close');
    setTimeout(function() {
        $('#eligibilityDialog').removeClass('dialog--open');
        $('#eligibilityDialog').removeClass('dialog--close');
    }, 200);
});