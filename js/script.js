window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-XXXXXXXXX');

const menuButton = document.querySelector(".menu-button");
        const mobileMenu = document.querySelector(".mobile-menu");

        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });

        document.querySelectorAll(".faq-question").forEach((button) => {
            button.addEventListener("click", () => {
                const item = button.closest(".faq-item");
                const isOpen = item.classList.toggle("is-open");
                button.setAttribute("aria-expanded", String(isOpen));
            });
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
        document.querySelector("#current-year").textContent = new Date().getFullYear();

        const reviewsCarousel = document.querySelector("#reviews-carousel");
const reviewsPrev = document.querySelector("#reviews-prev");
const reviewsNext = document.querySelector("#reviews-next");

const REVIEWS_AUTOPLAY_DELAY = 5000;
let reviewsAutoplay = null;
let reviewsUserPaused = false;

function updateReviewsControls() {
    if (!reviewsCarousel || !reviewsPrev || !reviewsNext) return;

    const maxScroll = reviewsCarousel.scrollWidth - reviewsCarousel.clientWidth;
    reviewsPrev.disabled = reviewsCarousel.scrollLeft <= 2;
    reviewsNext.disabled = reviewsCarousel.scrollLeft >= maxScroll - 2;
}

function scrollReviews(direction) {
    if (!reviewsCarousel) return;

    const firstCard = reviewsCarousel.querySelector(".review-card");
    if (!firstCard) return;

    const gap = parseFloat(getComputedStyle(reviewsCarousel).gap) || 0;
    const amount = firstCard.getBoundingClientRect().width + gap;
    const maxScroll = reviewsCarousel.scrollWidth - reviewsCarousel.clientWidth;

    if (direction > 0 && reviewsCarousel.scrollLeft >= maxScroll - 2) {
        reviewsCarousel.scrollTo({
            left: 0,
            behavior: "smooth"
        });
        return;
    }

    if (direction < 0 && reviewsCarousel.scrollLeft <= 2) {
        reviewsCarousel.scrollTo({
            left: maxScroll,
            behavior: "smooth"
        });
        return;
    }

    reviewsCarousel.scrollBy({
        left: direction * amount,
        behavior: "smooth"
    });
}

function stopReviewsAutoplay() {
    if (reviewsAutoplay) {
        clearInterval(reviewsAutoplay);
        reviewsAutoplay = null;
    }
}

function startReviewsAutoplay() {
    stopReviewsAutoplay();

    if (reviewsUserPaused || !reviewsCarousel) return;

    reviewsAutoplay = setInterval(() => {
        scrollReviews(1);
    }, REVIEWS_AUTOPLAY_DELAY);
}

function pauseReviewsAutoplay() {
    reviewsUserPaused = true;
    stopReviewsAutoplay();
}

reviewsPrev?.addEventListener("click", () => {
    pauseReviewsAutoplay();
    scrollReviews(-1);
});

reviewsNext?.addEventListener("click", () => {
    pauseReviewsAutoplay();
    scrollReviews(1);
});

// Qualquer interação direta do usuário pausa o autoplay.
reviewsCarousel?.addEventListener("pointerdown", pauseReviewsAutoplay);
reviewsCarousel?.addEventListener("wheel", pauseReviewsAutoplay, { passive: true });
reviewsCarousel?.addEventListener("touchstart", pauseReviewsAutoplay, { passive: true });

reviewsCarousel?.addEventListener("scroll", updateReviewsControls, { passive: true });
window.addEventListener("resize", updateReviewsControls);

updateReviewsControls();
startReviewsAutoplay();

        const whatsappFloat = document.querySelector(".whatsapp-float");
        const showFloatAfter = 400; // pixels rolados até o botão aparecer
        let floatTicking = false;

        function updateFloatVisibility() {
            const shouldShow = window.scrollY > showFloatAfter;
            whatsappFloat.classList.toggle("is-visible", shouldShow);
            floatTicking = false;
        }

        window.addEventListener("scroll", () => {
            if (!floatTicking) {
                window.requestAnimationFrame(updateFloatVisibility);
                floatTicking = true;
            }
        });

        updateFloatVisibility();
