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

// Javított számláló animáció függvény
function startCounters() {
  const counters = document.querySelectorAll(".counter");

  // Külön animáció létrehozása minden számlálóhoz
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    let count = 0;
    const increment = target / 100;
    const duration = 2000; // Animáció időtartama ms-ben
    const steps = 100; // Az animáció lépéseinek száma
    const stepTime = duration / steps;

    // Kezdeti érték beállítása
    counter.innerText = "0";

    // Intervallum létrehozása ehhez a számlálóhoz
    const interval = setInterval(() => {
      count += increment;

      if (count >= target) {
        // A végső érték pontosan a cél legyen
        counter.innerText = target;
        clearInterval(interval);
      } else {
        counter.innerText = Math.ceil(count);
      }
    }, stepTime);
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

// Level timeline animáció inicializálása
document.addEventListener("DOMContentLoaded", function () {
  const levelContainers = document.querySelectorAll(".level-container");

  // Intersection observer létrehozása, hogy animáljuk a szinteket, amikor láthatóvá válnak
  const levelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animáció indítása késleltetéssel a szint indexe alapján
          const level = entry.target;
          const index = Array.from(levelContainers).indexOf(level);
          setTimeout(() => {
            level.style.animationPlayState = "running";
          }, index * 200);

          // Megfigyelés leállítása az animáció elindítása után
          levelObserver.unobserve(level);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Minden szint konténer megfigyelése
  levelContainers.forEach((container) => {
    levelObserver.observe(container);
  });

  // Hover/klikk interakció hozzáadása a szint leírásokhoz mobilon
  if (window.innerWidth <= 768) {
    levelContainers.forEach((container) => {
      container.addEventListener("click", function () {
        const content = this.querySelector(".level-content");
        const desc = this.querySelector(".level-desc");

        // Aktív osztály váltása
        if (content.classList.contains("active")) {
          content.classList.remove("active");
          desc.style.maxHeight = "0";
          desc.style.opacity = "0";
          desc.style.marginTop = "0";
        } else {
          // Aktív osztály eltávolítása minden más szintről
          document.querySelectorAll(".level-content.active").forEach((el) => {
            el.classList.remove("active");
            const otherDesc = el.querySelector(".level-desc");
            otherDesc.style.maxHeight = "0";
            otherDesc.style.opacity = "0";
            otherDesc.style.marginTop = "0";
          });

          content.classList.add("active");
          desc.style.maxHeight = desc.scrollHeight + "px";
          desc.style.opacity = "1";
          desc.style.marginTop = "15px";
        }
      });
    });
  }
});
