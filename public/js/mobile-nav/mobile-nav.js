function menu() {
    var menuInner = $(".js-menu-inner"),
        menuTrigger = $(".js-menu-trigger"),
        menuInnerBackgroundItem = $(".js-menu-inner-background").find("i"),
        menuItem = $(".js-menu-items-list").find("li"),
        menuClose = $(".js-menu-close"),
        timeline = new TimelineMax({
            paused: true
        }),

        linksWrapper = $(".js-menu-items-wrapper"),
        linksItems = $(".js-menu-items-list").find("li"),
        topOffset = 8;

    timeline
        .to(
            menuInner,
            1, {
                autoAlpha: 1,
                ease: Power4.easeOut
            },
            "start"
        )
        .fromTo(
            menuInnerBackgroundItem,
            0.25, {
                x: "-100%",
                autoAlpha: 0
            }, {
                x: "0%",
                autoAlpha: 1,
                ease: Power1.easeOut
            },
            "start"
        )
        .staggerFromTo(
            menuItem,
            0.4, {
                x: -30,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1,
                delay: 0.35,
                ease: Back.easeOut.config(1)
            },
            0.15,
            "start"
        )
        .fromTo(
            menuClose,
            0.2, {
                x: -10,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1,
                delay: 1,
                ease: Power1.easeOut
            },
            "start"
        );



    menuTrigger.on("click", function() {
        timeline.play();
    });

    menuClose.on("click", function() {
        timeline.timeScale(1.25);
        timeline.reverse();
    });
}
menu();