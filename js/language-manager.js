/**
 * GānCuju™️©️ - Nyelvkezelő rendszer
 * Több nyelvű weboldal támogatása
 */

const LanguageManager = {
  // Aktuális nyelv
  currentLanguage: "hu", // Alapértelmezett: magyar

  // Elérhető nyelvek
  availableLanguages: {
    hu: "Magyar",
    en: "English",
    cn: "中文",
    de: "Deutsch",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    jp: "日本語",
    nl: "Nederlands",
    pl: "Polski",
    sv: "Svenska",
    pt: "Português",
  },

  // Fordítások - külön fájlokból töltődnek be
  translations: {},

  // Rendszer inicializálása
  init: async function () {
    console.log("LanguageManager inicializálása...");

    // Nyelv betöltése URL-ből vagy localStorage-ból
    this.currentLanguage = this.getCurrentLanguage();

    // Fordítások betöltése az aktuális nyelvhez
    await this.loadTranslations(this.currentLanguage);

    // Nyelvválasztó létrehozása
    this.createLanguageSelector();

    // Fordítások alkalmazása
    this.updatePageContent();

    // Eseményfigyelők beállítása
    this.setupEventListeners();

    console.log(`Nyelvkezelő rendszer inicializálva: ${this.currentLanguage}`);
  },

  // Aktuális nyelv lekérése URL-ből vagy localStorage-ból
  getCurrentLanguage: function () {
    // URL paraméterek ellenőrzése
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang");

    // Ha nincs URL param, localStorage ellenőrzése
    if (!lang) {
      lang = localStorage.getItem("selectedLanguage");
    }

    // Alapértelmezett nyelv, ha nincs megadva
    if (!lang || !Object.keys(this.availableLanguages).includes(lang)) {
      lang = "hu"; // Alapértelmezett: magyar
    }

    // Mentés localStorage-ba
    localStorage.setItem("selectedLanguage", lang);
    return lang;
  },

  // Fordítások betöltése a kiválasztott nyelvhez
  loadTranslations: async function (lang) {
    try {
      console.log(`Fordítások betöltése: ${lang}`);
      const response = await fetch(`lang/${lang}.json`);

      if (!response.ok) {
        throw new Error(
          `Nem sikerült betölteni a(z) ${lang} fordításokat. Státuszkód: ${response.status}`
        );
      }

      this.translations = await response.json();
      console.log(
        "Fordítások sikeresen betöltve:",
        Object.keys(this.translations).length
      );
      return this.translations;
    } catch (error) {
      console.error("Hiba a fordítások betöltésekor:", error);
      // Fallback üres fordítási objektumra
      this.translations = {};
      return {};
    }
  },

  // Nyelv beállítása és tartalom frissítése
  setLanguage: async function (lang) {
    console.log(`Nyelv váltása: ${lang}`);

    if (this.availableLanguages[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem("selectedLanguage", lang);

      // URL frissítése
      const url = new URL(window.location);
      url.searchParams.set("lang", lang);
      window.history.pushState({}, "", url);

      // Új fordítások betöltése
      await this.loadTranslations(lang);

      // Oldal tartalmának frissítése
      this.updatePageContent();

      // Nyelvválasztó frissítése
      this.updateLanguageSelector();

      // Egyedi esemény kibocsátása
      document.dispatchEvent(
        new CustomEvent("languageChanged", {
          detail: { language: lang },
        })
      );

      console.log(`Nyelv sikeresen átváltva: ${lang}`);
    } else {
      console.error(`Ismeretlen nyelv: ${lang}`);
    }
  },

  // Az oldal minden tartalmának frissítése fordításokkal
  updatePageContent: function () {
    console.log("Oldaltartalom frissítése...");

    // Elemek frissítése data-i18n attribútummal
    const i18nElements = document.querySelectorAll("[data-i18n]");
    console.log(`${i18nElements.length} fordítandó elem található`);

    i18nElements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (this.translations[key]) {
        element.innerHTML = this.translations[key];
      } else {
        console.warn(`Hiányzó fordítási kulcs: ${key}`);
      }
    });

    // Placeholderek frissítése
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (this.translations[key]) {
        element.placeholder = this.translations[key];
      }
    });

    // Képek alt szövegének frissítése
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.getAttribute("data-i18n-alt");
      if (this.translations[key]) {
        element.alt = this.translations[key];
      }
    });

    // Oldal címének frissítése
    const titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey && this.translations[titleKey]) {
      document.title = this.translations[titleKey];
    } else {
      document.title = `GānCuju™️©️ - ${this.translations["title"] || ""}`;
    }

    // Meta leírások frissítése
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descKey = metaDesc.getAttribute("data-i18n-content");
      if (descKey && this.translations[descKey]) {
        metaDesc.content = this.translations[descKey];
      }
    }

    // Dropdown mezők frissítése
    const subjectSelect = document.getElementById("subject");
    if (subjectSelect) {
      const options = subjectSelect.querySelectorAll("option");

      options.forEach((option) => {
        const key = option.getAttribute("data-i18n");
        if (key && this.translations[key]) {
          option.textContent = this.translations[key];
        }
      });
    }

    console.log("Oldaltartalom frissítése kész");
  },

  // Nyelvválasztó létrehozása zászlókkal
  createLanguageSelector: function () {
    console.log("Nyelvválasztó létrehozása");
    // Ha már létezik nyelvválasztó, ne hozzunk létre újat
    if (document.querySelector(".language-selector")) {
      console.log("Nyelvválasztó már létezik, frissítés");
      this.updateLanguageSelector();
      return;
    }

    // Zászlók URL-jei
    const flags = {
      hu: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/hu.svg",
      en: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/gb.svg",
      cn: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/cn.svg",
      de: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/de.svg",
      es: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/es.svg",
      fr: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/fr.svg",
      it: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/it.svg",
      jp: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/jp.svg",
      nl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/nl.svg",
      pl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/pl.svg",
      sv: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/se.svg",
      pt: "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/pt.svg",
    };

    const selector = document.createElement("div");
    selector.className = "language-selector";

    // Legördülő menü szerkezet
    const currentLang = this.currentLanguage;
    const currentFlagUrl = flags[currentLang] || flags.hu;
    const currentLangName =
      this.availableLanguages[currentLang] || this.availableLanguages.hu;

    let html = `
    <div class="current-language">
      <img src="${currentFlagUrl}" alt="${currentLangName}" class="current-flag">
      <span class="current-name">${currentLangName}</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div class="language-dropdown">
  `;

    // Nyelvek listája a legördülő menüben - csak az elérhető nyelvek
    Object.keys(this.availableLanguages).forEach((code) => {
      if (flags[code]) {
        // Ha van zászló a nyelvhez
        const langName = this.availableLanguages[code];
        html += `
        <div class="language-option ${
          code === currentLang ? "active" : ""
        }" data-lang="${code}">
          <img src="${flags[code]}" alt="${langName}">
          <span>${langName}</span>
        </div>
        `;
      }
    });

    html += `</div>`;
    selector.innerHTML = html;

    // Hozzáadás a dokumentumhoz
    document.body.appendChild(selector);

    // CSS stílusok hozzáadása, ha még nincsenek
    if (!document.getElementById("language-selector-styles")) {
      const style = document.createElement("style");
      style.id = "language-selector-styles";
      style.textContent = `
      .language-selector {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        font-size: 14px;
      }
      
      .current-language {
        display: flex;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 8px 12px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
      }
      
      .navbar.scrolled .current-language {
        color: #1d1d1f;
        background-color: rgba(255, 255, 255, 0.8);
      }
      
      .current-language:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
      
      .current-flag {
        width: 20px;
        height: 15px;
        object-fit: cover;
        border-radius: 2px;
        margin-right: 8px;
      }
      
      .current-name {
        margin-right: 8px;
      }
      
      .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 8px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        padding: 10px 0;
        width: 160px;
        display: none;
        max-height: 300px;
        overflow-y: auto;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .language-selector:hover .language-dropdown {
        display: block;
        opacity: 1;
        transform: translateY(0);
      }
      
      .language-option {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        cursor: pointer;
        transition: background 0.2s ease;
        color: #1d1d1f;
      }
      
      .language-option:hover {
        background-color: #f5f5f7;
      }
      
      .language-option.active {
        background-color: #f5f5f7;
        font-weight: bold;
      }
      
      .language-option img {
        width: 20px;
        height: 15px;
        object-fit: cover;
        border-radius: 2px;
        margin-right: 10px;
      }
      
      /* Görgetősáv stílus */
      .language-dropdown::-webkit-scrollbar {
        width: 6px;
      }
      
      .language-dropdown::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      .language-dropdown::-webkit-scrollbar-thumb {
        background: #e30613;
        border-radius: 10px;
      }
      
      /* Reszponzív beállítások */
      @media (max-width: 768px) {
        .current-name {
          display: none;
        }
        
        .language-selector {
          top: 15px;
          right: 70px;
        }
        
        .current-language {
          padding: 6px;
        }
        
        .current-flag {
          margin-right: 0;
        }
        
        .current-language i {
          display: none;
        }
      }
    `;
      document.head.appendChild(style);
    }

    console.log("Nyelvválasztó létrehozva");
  },

  // Nyelvválasztó frissítése az aktív nyelv megjelenítéséhez
  updateLanguageSelector: function () {
    // Zászlók frissítése (régi verzió támogatása)
    document.querySelectorAll(".flag").forEach((flag) => {
      flag.classList.remove("active");
      if (flag.getAttribute("data-lang") === this.currentLanguage) {
        flag.classList.add("active");
      }
    });

    // Nyelvi opciók frissítése (új verzió)
    document.querySelectorAll(".language-option").forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-lang") === this.currentLanguage) {
        option.classList.add("active");
      }
    });
  },

  // Eseményfigyelők beállítása
  setupEventListeners: function () {
    console.log("Eseményfigyelők beállítása");

    // Nyelvi opciókra való kattintás figyelése
    document.addEventListener("click", (event) => {
      // Régi verzió támogatása (flag elemek)
      const flagElement = event.target.closest(".flag");
      if (flagElement) {
        const lang = flagElement.getAttribute("data-lang");
        if (lang) {
          console.log(`Kattintás a zászlóra: ${lang}`);
          this.setLanguage(lang);
        }
      }

      // Új verzió (language-option elemek)
      const langOption = event.target.closest(".language-option");
      if (langOption) {
        const lang = langOption.getAttribute("data-lang");
        if (lang) {
          console.log(`Kattintás a nyelvi opcióra: ${lang}`);
          this.setLanguage(lang);
        }
      }
    });
  },
};

// Betöltéskor automatikus inicializálás
document.addEventListener("DOMContentLoaded", () => {
  LanguageManager.init();
});

// Exportálás globális hozzáféréshez
window.LanguageManager = LanguageManager;
