const h1Elements = document.querySelectorAll('.bottom-text>.hoverable');

function locoScroll() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locoScroll();

var swiper = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 25,
    grabCursor: true,
    initialSlide: 2,
    speed: 500,
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
});

function firstpageAnime() {
    var tl1 = gsap.timeline();

    tl1.from(".navbar__full", {
        delay: 0.2,
        y: -200,
        duration: 0.6
    }, "start")

    tl1.from(".swiper-slide", {
        y: 800,
        duration: 0.6
    }, "start");

    tl1.from(".brand-name h1", {
        delay: -0.4,
        y: 580,
        stagger: 0.05,
        ease: "power1.easeInOut"
    }, "start");

    tl1.from(".slider-img-container", {
        delay: 0.6,
        y: 1100,
        duration: 0.6
    }, "start");
};

firstpageAnime();

function marqueeText() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".marq-text .text",
            scroller: "#main",
            start: "top 150%",
            end: "top -50%",
            scrub: 1,
        }
    });

    tl2.to(".text1", {
        marginLeft: "0%",
    }, 'a');

    tl2.to(".text2", {
        marginLeft: "-180%",
    }, 'a');

    // This is for the center im-text div coming up
    // third-page animation
    gsap.from(".sub-page", {
        scale: 0.9,
        y: 20,
        ease: "expo.inOut",
        duration: 0.9,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".sub-page",
            start: "top 110%",
            end: "top 90%",
            scrub: true
        }
    });
};
marqueeText();

function fourthPageAnime() {
    gsap.from(".cards", {
        scale: 0.9,
        y: 20,
        ease: "power1.easeInOut",
        duration: 1,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".cards-section",
            start: "top 80%",
            end: "top 60%",
            scrub: true
        }
    });
};

fourthPageAnime();

function fifthPageAnime() {
    var tl3 = gsap.timeline();

    tl3.from(".top-text h1", {
        y: 200,
        // opacity: 0,
        duration: 10,
        stagger: 5,
        ease: "power1.easeInOut",
    });

    tl3.from(".bottom-text h1", {
        y: 100,
        opacity: 0,
        duration: 10,
        stagger: 1,
        ease: "power1.easeInOut",
    });

    ScrollTrigger.create({
        scrub: 4,
        scroller: "#main",
        trigger: ".fifth-page",
        start: "top 65%",
        end: "top 60%",
        animation: tl3,
    });
};

fifthPageAnime();

function fifthPageBottomTextAnime() {
    h1Elements.forEach(function (h1Elem) {
        h1Elem.addEventListener('mouseenter', function () {
            // Apply the not-hovered effect to the other elements
            h1Elements.forEach(function (otherH1) {
                if (otherH1 !== h1Elem) {
                    otherH1.classList.add('not-hovered');
                }
            });
        });

        h1Elem.addEventListener('mouseleave', function () {
            // Remove the not-hovered effect from all elements
            h1Elements.forEach(function (otherH1) {
                otherH1.classList.remove('not-hovered');
            });
        });
    });
};

function bigCardAnime() {
    gsap.from(".big-card .card", {
        y: 150,
        scale: 0.5,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".big-card",
            start: "top 70%",
            end: "top 50%",
            // scrub: true
        }
    });
};

bigCardAnime();

fifthPageBottomTextAnime();

function floatingImages() {
    let section = document.querySelector(".floating-images")
    section.addEventListener("mousemove", function (details) {
        document.querySelectorAll(".image").forEach((elem) => {
            const position = elem.getAttribute("value");

            var x = (window.innerWidth + details.clientX * position) / 200;
            var y = (window.innerHeight + details.clientY * position) / 200;

            elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
};

floatingImages();

function footeranime() {
    var tl4 = gsap.timeline({
        scrollTrigger: {
            scrub: 1,
            scroller: "#main",
            trigger: ".bottom-footer",
            start: "top 90%",
            end: "top 75%"
        }
    });

    tl4.from(".bottom-footer h1", {
        y: 180,
        duration: 20,
        stagger: 5,
        ease: "power1.easeInOut",
    });
};
footeranime();