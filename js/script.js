window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "AW-XXXXXXXXX");


/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton?.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    });
});


/* =========================================
   FAQ
========================================= */

document
    .querySelectorAll(".faq-question")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");

            const isOpen =
                item?.classList.toggle("is-open") ?? false;

            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    });


/* =========================================
   ANIMAÇÕES AO ENTRAR NA TELA
========================================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(
                    "is-visible"
                );

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
    }
);

document
    .querySelectorAll(".reveal")
    .forEach((element) => {
        revealObserver.observe(element);
    });


/* =========================================
   ANO AUTOMÁTICO DO FOOTER
========================================= */

const currentYear =
    document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================
   REVIEWS
   LER MAIS / LER MENOS
========================================= */

document
    .querySelectorAll(".review-more")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const card =
                button.closest(".review-card");

            const reviewText =
                card?.querySelector(".review-text");

            if (!reviewText) return;

            const isExpanded =
                button.getAttribute(
                    "aria-expanded"
                ) === "true";

            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            reviewText.style.webkitLineClamp =
                isExpanded ? "5" : "unset";

            const label =
                button.childNodes[0];

            if (label) {
                label.textContent =
                    isExpanded
                        ? "Ler mais "
                        : "Ler menos ";
            }
        });
    });


/* =========================================
   CARROSSEL DE REVIEWS
========================================= */

const reviewsCarousel =
    document.querySelector(
        "#reviews-carousel"
    );

const reviewsPrev =
    document.querySelector(
        "#reviews-prev"
    );

const reviewsNext =
    document.querySelector(
        "#reviews-next"
    );

const REVIEWS_AUTOPLAY_DELAY = 5000;

let reviewsAutoplay = null;
let reviewsUserPaused = false;


/* Atualiza estado dos botões */

function updateReviewsControls() {
    if (
        !reviewsCarousel ||
        !reviewsPrev ||
        !reviewsNext
    ) {
        return;
    }

    const maxScroll =
        reviewsCarousel.scrollWidth -
        reviewsCarousel.clientWidth;

    reviewsPrev.disabled =
        reviewsCarousel.scrollLeft <= 2;

    reviewsNext.disabled =
        reviewsCarousel.scrollLeft >=
        maxScroll - 2;
}


/* Move o carrossel */

function scrollReviews(direction) {
    if (!reviewsCarousel) return;

    const firstCard =
        reviewsCarousel.querySelector(
            ".review-card"
        );

    if (!firstCard) return;

    const gap =
        parseFloat(
            getComputedStyle(
                reviewsCarousel
            ).gap
        ) || 0;

    const amount =
        firstCard.getBoundingClientRect()
            .width + gap;

    const maxScroll =
        reviewsCarousel.scrollWidth -
        reviewsCarousel.clientWidth;


    /* Chegou ao final → volta ao início */

    if (
        direction > 0 &&
        reviewsCarousel.scrollLeft >=
            maxScroll - 2
    ) {
        reviewsCarousel.scrollTo({
            left: 0,
            behavior: "smooth",
        });

        return;
    }


    /* Está no início → volta ao último */

    if (
        direction < 0 &&
        reviewsCarousel.scrollLeft <= 2
    ) {
        reviewsCarousel.scrollTo({
            left: maxScroll,
            behavior: "smooth",
        });

        return;
    }


    /* Movimento normal */

    reviewsCarousel.scrollBy({
        left: direction * amount,
        behavior: "smooth",
    });
}


/* =========================================
   AUTOPLAY DO CARROSSEL
========================================= */

function stopReviewsAutoplay() {
    if (!reviewsAutoplay) return;

    clearInterval(reviewsAutoplay);

    reviewsAutoplay = null;
}


function startReviewsAutoplay() {
    stopReviewsAutoplay();

    if (
        reviewsUserPaused ||
        !reviewsCarousel
    ) {
        return;
    }

    reviewsAutoplay =
        setInterval(() => {
            scrollReviews(1);
        }, REVIEWS_AUTOPLAY_DELAY);
}


function pauseReviewsAutoplay() {
    reviewsUserPaused = true;

    stopReviewsAutoplay();
}


/* =========================================
   BOTÕES DO CARROSSEL
========================================= */

reviewsPrev?.addEventListener(
    "click",
    () => {
        pauseReviewsAutoplay();

        scrollReviews(-1);
    }
);


reviewsNext?.addEventListener(
    "click",
    () => {
        pauseReviewsAutoplay();

        scrollReviews(1);
    }
);


/* =========================================
   INTERAÇÃO MANUAL COM O CARROSSEL

   Qualquer interação direta pausa
   o autoplay.
========================================= */

reviewsCarousel?.addEventListener(
    "pointerdown",
    pauseReviewsAutoplay
);


reviewsCarousel?.addEventListener(
    "wheel",
    pauseReviewsAutoplay,
    {
        passive: true,
    }
);


reviewsCarousel?.addEventListener(
    "touchstart",
    pauseReviewsAutoplay,
    {
        passive: true,
    }
);


/* Atualiza os controles ao rolar */

reviewsCarousel?.addEventListener(
    "scroll",
    updateReviewsControls,
    {
        passive: true,
    }
);


/* Atualiza ao redimensionar a tela */

window.addEventListener(
    "resize",
    updateReviewsControls
);


/* Inicialização */

updateReviewsControls();

startReviewsAutoplay();


/* =========================================
   BOTÃO FLUTUANTE DO WHATSAPP
========================================= */

const whatsappFloat =
    document.querySelector(
        ".whatsapp-float"
    );

const showFloatAfter = 400;

let floatTicking = false;


function updateFloatVisibility() {
    if (!whatsappFloat) return;

    const shouldShow =
        window.scrollY >
        showFloatAfter;

    whatsappFloat.classList.toggle(
        "is-visible",
        shouldShow
    );

    floatTicking = false;
}


window.addEventListener(
    "scroll",
    () => {
        if (!floatTicking) {
            window.requestAnimationFrame(
                updateFloatVisibility
            );

            floatTicking = true;
        }
    }
);

updateFloatVisibility();
