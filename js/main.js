/**
 * GānCuju™️©️ - Fő JavaScript fájl
 * Tartalmazza a weboldal működéséhez szükséges funkciókat
 */

// DOM elemek
const navbar = document.querySelector(".navbar");
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");
const backToTop = document.getElementById("backToTop");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanes = document.querySelectorAll(".tab-pane");
const counters = document.querySelectorAll(".counter");
const productSlides = document.querySelectorAll(".product-slide");
const prevSlide = document.querySelector(".prev-slide");
const nextSlide = document.querySelector(".next-slide");
const dots = document.querySelectorAll(".dot");
const contactForm = document.getElementById("contactForm");
const levels = document.querySelectorAll(".level");

// AOS inicializálása (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });
});

// Navbar görgetési effektus
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // "Vissza a tetejére" gomb
  if (window.scrollY > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// Mobil menü kapcsoló
if (navbarToggle) {
  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenu.classList.toggle("active");

    // Ha a menü aktív, a menüpontok is aktívak
    if (navbarMenu.classList.contains("active")) {
      document.querySelector(".navbar-nav").classList.add("active");
    } else {
      document.querySelector(".navbar-nav").classList.remove("active");
    }
  });

  // Menü bezárása link kattintáskor
  document.querySelectorAll(".navbar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
      document.querySelector(".navbar-nav").classList.remove("active");
    });
  });
}

// Fülek funkcionalitása
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Összes gomb és panel aktív osztályának eltávolítása
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    // Aktuális gomb aktiválása
    button.classList.add("active");

    // Megfelelő panel megjelenítése
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// Level részletek kezelése mobil eszközökön
levels.forEach((level) => {
  level.addEventListener("click", function () {
    // Mobil eszközökön toggle details
    if (window.innerWidth <= 768) {
      const details = this.querySelector(".level-details");
      if (details.style.maxHeight === "200px") {
        details.style.maxHeight = "0";
        details.style.padding = "0";
        details.style.marginTop = "-10px";
      } else {
        details.style.maxHeight = "200px";
        details.style.padding = "var(--spacing-sm) var(--spacing-md)";
        details.style.marginTop = "0";
      }
    }
  });
});

// Számláló animáció
function startCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => startCounters(), 10);
    } else {
      counter.innerText = target;
    }
  });
}

// Számlálók indítása, ha a küldetés szekció láthatóvá válik
const missionSection = document.getElementById("mission");
if (missionSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(missionSection);
}

// Termék slider funkcionalitás
let currentSlide = 0;

function showSlide(n) {
  // Összes slide elrejtése
  productSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Aktív osztály eltávolítása az összes pontról
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Aktuális slide index beállítása
  currentSlide = (n + productSlides.length) % productSlides.length;

  // Aktuális slide és pont aktiválása
  productSlides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Előző/következő vezérlők
if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
}

// Pont vezérlők
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Űrlap beküldés
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Űrlap értékeinek lekérése
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Itt normál esetben az adatokat elküldenénk a szervernek
    // Most csak egy üzenetet jelenítünk meg
    const thankMessage =
      LanguageManager.translations.contact_thank ||
      "Thank you for your message, {name}! We will contact you soon.";
    alert(thankMessage.replace("{name}", name));

    // Űrlap alaphelyzetbe állítása
    contactForm.reset();
  });
}

// Videó lejátszás funkcionalitás
const playButton = document.querySelector(".play-button");
if (playButton) {
  playButton.addEventListener("click", () => {
    const videoPlaceholder = document.querySelector(".video-placeholder");

    // Itt normál esetben a placeholder helyére egy valódi videót töltenénk be
    // Most csak egy üzenetet jelenítünk meg
    alert("Itt indulna el a videó lejátszása.");
  });
}

// Aktív menüpont kiemelése görgetéskor
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navbar-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((navItem) => {
    navItem.classList.remove("active");
    if (navItem.getAttribute("href").slice(1) === current) {
      navItem.classList.add("active");
    }
  });
});

// Finom görgetés az anchor linkekhez
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Nyelvváltás után a UI elemek frissítése
document.addEventListener("languageChanged", (event) => {
  // Dropdown mezők frissítése
  const subjectSelect = document.getElementById("subject");
  if (subjectSelect) {
    const selectedValue = subjectSelect.value;
    const options = subjectSelect.querySelectorAll("option");

    options.forEach((option) => {
      const key = option.getAttribute("data-i18n");
      if (key && LanguageManager.translations[key]) {
        option.textContent = LanguageManager.translations[key];
      }
    });

    subjectSelect.value = selectedValue;
  }

  // Bármilyen egyéb dinamikus UI elem frissítése itt
});

// Oldal betöltésekor
document.addEventListener("DOMContentLoaded", () => {
  // Termék slider inicializálása
  showSlide(0);

  // Aktív menüpont beállítása
  const hash = window.location.hash;
  if (hash) {
    const activeNavItem = document.querySelector(
      `.navbar-nav a[href="${hash}"]`
    );
    if (activeNavItem) {
      navItems.forEach((item) => item.classList.remove("active"));
      activeNavItem.classList.add("active");
    }
  }
});
