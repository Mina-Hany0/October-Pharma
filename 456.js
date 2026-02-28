const pdfFiles = [
    "1. Improving Care and Promoting Health in Populations.pdf",
    "2. Diagnosis and Classification of Diabetes.pdf",
    "3. Prevention or Delay of Diabetes and Associated Comorbidities.pdf",
    "4. Comprehensive Medical Evaluation and Assessment of Comorbidities.pdf",
    "5. Facilitating Positive Health Behaviors and Well-being to Improve Health Outcomes.pdf",
    "6. Glycemic Goals, Hypoglycemia, and Hyperglycemic Crises.pdf",
    "7. Diabetes Technology.pdf",
    "8. Obesity and Weight Management for the Prevention and Treatment of Diabetes.pdf",
    "9. Pharmacologic Approaches to Glycemic Treatment.pdf",
    "10. Cardiovascular Disease and Risk Management.pdf",
    "11. Chronic Kidney Disease and Risk Management.pdf",
    "12. Retinopathy, Neuropathy, and Foot Care.pdf",
    "13. Older Adults.pdf",
    "14. Children and Adolescents.pdf",
    "15. Management of Diabetes in Pregnancy.pdf",
    "16. Diabetes Care in the Hospital.pdf",
    "17. Diabetes Advocacy.pdf"
];

const portfolioData = pdfFiles.map((fileName, index) => ({
    id: index + 1,
    title: fileName.replace(/\.pdf$/i, ""),
    fileName,
    pdfPath: encodeURI(`PDF/${fileName}`),
    imagePath: `images/slides/${index + 1}.png`
}));

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const introBoxes = document.querySelectorAll(".intro-box");

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const header = document.querySelector(".top-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const targetY = section.getBoundingClientRect().top + window.pageYOffset - headerHeight + 72;

    window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth"
    });

    // Mobile browsers can shift viewport height during smooth scroll; correct once after start.
    setTimeout(() => {
        const correctedY = section.getBoundingClientRect().top + window.pageYOffset - headerHeight + 72;
        window.scrollTo({
            top: Math.max(0, correctedY),
            behavior: "smooth"
        });
    }, 320);
}

function openPdf(path) {
    window.open(path, "_blank", "noopener");
}

function createCarouselItem(data, index) {
    const item = document.createElement("div");
    item.className = "carousel-item";
    item.dataset.index = index;

    item.innerHTML = `
        <div class="card" role="link" tabindex="0" aria-label="Open ${data.fileName}">
            <div class="card-number">${String(data.id).padStart(2, "0")}</div>
            <div class="card-image card-file">
                <img class="slide-cover" src="${data.imagePath}" alt="${data.title}">
                <span class="file-fallback">PDF</span>
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">Click to open the document.</p>
            <div class="card-tech">
                <span class="tech-badge">${data.fileName}</span>
            </div>
        </div>
    `;

    const card = item.querySelector(".card");
    const image = item.querySelector(".slide-cover");
    const imageWrapper = item.querySelector(".card-file");

    if (image && imageWrapper) {
        image.addEventListener("load", () => {
            imageWrapper.classList.add("has-image");
        });

        image.addEventListener("error", () => {
            imageWrapper.classList.remove("has-image");
            image.style.display = "none";
        });
    }

    if (card) {
        card.addEventListener("click", () => openPdf(data.pdfPath));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPdf(data.pdfPath);
            }
        });
    }

    return item;
}

function initCarousel() {
    if (!carousel || !indicatorsContainer || portfolioData.length === 0) return;

    portfolioData.forEach((data, index) => {
        carousel.appendChild(createCarouselItem(data, index));

        const indicator = document.createElement("div");
        indicator.className = "indicator";
        if (index === 0) indicator.classList.add("active");
        indicator.dataset.index = index;
        indicator.addEventListener("click", () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".indicator");
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;

        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;

        if (isMobile) {
            spacing1 = 280;
            spacing2 = 420;
            spacing3 = 550;
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }

        if (absOffset === 0) {
            item.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
            item.style.opacity = "1";
            item.style.zIndex = "10";
        } else if (absOffset === 1) {
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = "0.8";
            item.style.zIndex = "5";
        } else if (absOffset === 2) {
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = "0.5";
            item.style.zIndex = "3";
        } else if (absOffset === 3) {
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = "0.3";
            item.style.zIndex = "2";
        } else {
            item.style.transform = "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
            item.style.opacity = "0";
            item.style.zIndex = "1";
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);

if (portfolioData.length > 0) {
    setInterval(nextSlide, 5000);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateCarousel, 250);
});

initCarousel();

introBoxes.forEach((box) => {
    box.addEventListener("click", () => scrollToSection("home"));
    box.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            scrollToSection("home");
        }
    });
});

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.classList.add("hidden");
        document.body.classList.add("site-ready");
    }, 1500);
});
