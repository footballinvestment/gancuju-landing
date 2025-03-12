/**
 * GānCuju™️©️ - Advanced Internationalization System
 * Supports 16+ languages across all major global regions
 */

const I18N = {
  // Elérhető nyelvek a prioritási sorrendben
  languages: {
    // 1. Elsődleges prioritás (globális nyelvek)
    en: { name: "English", nativeName: "English", flag: "gb" },
    zh: { name: "Chinese", nativeName: "中文", flag: "cn" },
    es: { name: "Spanish", nativeName: "Español", flag: "es" },
    ar: { name: "Arabic", nativeName: "العربية", flag: "sa" },
    hi: { name: "Hindi", nativeName: "हिन्दी", flag: "in" },

    // 2. Másodlagos prioritás
    pt: { name: "Portuguese", nativeName: "Português", flag: "pt" },
    ru: { name: "Russian", nativeName: "Русский", flag: "ru" },
    ja: { name: "Japanese", nativeName: "日本語", flag: "jp" },
    de: { name: "German", nativeName: "Deutsch", flag: "de" },
    fr: { name: "French", nativeName: "Français", flag: "fr" },

    // 3. Harmadlagos prioritás
    ko: { name: "Korean", nativeName: "한국어", flag: "kr" },
    tr: { name: "Turkish", nativeName: "Türkçe", flag: "tr" },
    hu: { name: "Hungarian", nativeName: "Magyar", flag: "hu" },
    pl: { name: "Polish", nativeName: "Polski", flag: "pl" },
    it: { name: "Italian", nativeName: "Italiano", flag: "it" },
    id: { name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "id" },
    nl: { name: "Dutch", nativeName: "Nederlands", flag: "nl" },
    sv: { name: "Swedish", nativeName: "Svenska", flag: "se" },
  },

  // Aktuális nyelv
  currentLanguage: "en",

  // Fordítási adatok
  translations: {},

  // Science szekció fordítási kulcsok
  scienceTranslationKeys: [
    { selector: ".science-title", key: "science_title" },
    { selector: ".science-subtitle", key: "science_subtitle" },
    { selector: ".visual-reflex h3", key: "science_visual" },
    { selector: ".tactile-reflex h3", key: "science_tactile" },
    {
      selector: ".visual-reflex .neural-connections",
      key: "science_visual_desc",
    },
    {
      selector: ".tactile-reflex .neural-connections",
      key: "science_tactile_desc",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(1)",
      key: "science_visual_path_1",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(3)",
      key: "science_visual_path_2",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(5)",
      key: "science_visual_path_3",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(7)",
      key: "science_visual_path_4",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(9)",
      key: "science_visual_path_5",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(11)",
      key: "science_visual_path_6",
    },
    {
      selector: ".visual-reflex .path-item:nth-child(13)",
      key: "science_visual_path_7",
    },
    {
      selector: ".tactile-reflex .path-item:nth-child(1)",
      key: "science_tactile_path_1",
    },
    {
      selector: ".tactile-reflex .path-item:nth-child(3)",
      key: "science_tactile_path_2",
    },
    {
      selector: ".tactile-reflex .path-item:nth-child(5)",
      key: "science_tactile_path_3",
    },
    {
      selector: ".reflex-explanation h3:nth-child(1)",
      key: "science_advantage",
    },
    {
      selector: ".reflex-explanation p:nth-child(2)",
      key: "science_advantage_p1",
    },
    {
      selector: ".reflex-explanation p:nth-child(3)",
      key: "science_advantage_p2",
    },
    {
      selector: ".reflex-explanation h3:nth-child(4)",
      key: "science_receptors",
    },
    {
      selector: ".reflex-explanation p:nth-child(5)",
      key: "science_receptors_p1",
    },
    { selector: ".benefit-list li:nth-child(1)", key: "science_receptors_li1" },
    { selector: ".benefit-list li:nth-child(2)", key: "science_receptors_li2" },
    { selector: ".benefit-list li:nth-child(3)", key: "science_receptors_li3" },
    { selector: ".benefit-list li:nth-child(4)", key: "science_receptors_li4" },
    { selector: ".training-progression h3", key: "science_progression" },
    {
      selector: ".progression-step:nth-child(1) h4",
      key: "science_step1_title",
    },
    { selector: ".progression-step:nth-child(1) p", key: "science_step1_desc" },
    {
      selector: ".progression-step:nth-child(3) h4",
      key: "science_step2_title",
    },
    { selector: ".progression-step:nth-child(3) p", key: "science_step2_desc" },
    {
      selector: ".progression-step:nth-child(5) h4",
      key: "science_step3_title",
    },
    { selector: ".progression-step:nth-child(5) p", key: "science_step3_desc" },
    {
      selector: ".progression-step:nth-child(7) h4",
      key: "science_step4_title",
    },
    { selector: ".progression-step:nth-child(7) p", key: "science_step4_desc" },
    { selector: ".reflex-time span", key: "science_time_unit" },
  ],

  // Inicializálás
  init: async function () {
    try {
      console.log("I18N rendszer inicializálása...");

      // Nyelv lekérése az URL-ből, cookie-ból vagy böngésző beállításból
      this.currentLanguage = this.getPreferredLanguage();

      // Nyelvi fájl betöltése
      await this.loadTranslations(this.currentLanguage);

      // Nyelvi választó építése
      this.buildLanguageSelector();

      // Oldal tartalmának fordítása
      this.translatePage();

      // Eseményfigyelők
      this.attachEventListeners();

      console.log(`I18N inicializálva, nyelv: ${this.currentLanguage}`);

      // Kompatibilitási réteg a régi kóddal
      window.LanguageManager = {
        currentLanguage: this.currentLanguage,
        availableLanguages: Object.fromEntries(
          Object.entries(this.languages).map(([code, info]) => [
            code,
            info.nativeName,
          ])
        ),
        translations: this.translations,
        setLanguage: this.setLanguage.bind(this),
      };
    } catch (error) {
      console.error("I18N inicializálás sikertelen:", error);
    }
  },

  // Preferált nyelv meghatározása
  getPreferredLanguage: function () {
    // URL paraméter ellenőrzése
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang");

    // LocalStorage ellenőrzése
    if (!lang) {
      lang =
        localStorage.getItem("gancuju_language") ||
        localStorage.getItem("selectedLanguage");
    }

    // Cookie ellenőrzése
    if (!lang) {
      const match = document.cookie.match(/(^|;)\s*gancuju_language=([^;]+)/);
      lang = match ? match[2] : null;
    }

    // Böngésző nyelv ellenőrzése
    if (!lang) {
      const browserLang = navigator.language.split("-")[0];
      lang = this.languages[browserLang] ? browserLang : null;
    }

    // Ha még mindig nincs nyelv, vagy nem támogatott, alapértelmezett az eredeti
    if (!lang || !this.languages[lang]) {
      // Az oldal eredetileg magyar nyelven készült, ezt tartjuk meg alapértelmezettként
      lang = "hu";
    }

    return lang;
  },

  // Nyelvi fájl betöltése
  loadTranslations: async function (lang) {
    try {
      console.log(`Fordítások betöltése: ${lang}`);
      const response = await fetch(`lang/${lang}.json`);

      if (!response.ok) {
        throw new Error(`Nem sikerült betölteni a(z) ${lang} fordításokat.`);
      }

      this.translations = await response.json();

      // A választott nyelv mentése
      localStorage.setItem("gancuju_language", lang);
      localStorage.setItem("selectedLanguage", lang); // Kompatibilitási okokból
      document.cookie = `gancuju_language=${lang}; path=/; max-age=31536000`; // 1 év

      // URL frissítése
      const url = new URL(window.location);
      url.searchParams.set("lang", lang);
      history.replaceState({}, "", url);

      console.log(
        `Fordítások betöltve: ${Object.keys(this.translations).length} kulcs`
      );

      return this.translations;
    } catch (error) {
      console.error(`Hiba a fordítások betöltésekor (${lang}):`, error);

      // Fallback angol nyelvre, ha nem az volt
      if (lang !== "en") {
        console.log("Visszaváltás angol nyelvre...");
        return this.loadTranslations("en");
      }

      // Ha az angol sem működik, üres objektummal térünk vissza
      return {};
    }
  },

  // Nyelv beállítása és tartalom frissítése
  setLanguage: async function (lang) {
    console.log(`Nyelv váltása: ${lang}`);

    if (this.languages[lang]) {
      this.currentLanguage = lang;

      // Fordítások betöltése
      await this.loadTranslations(lang);

      // UI frissítése
      this.updateLanguageSelector();
      this.translatePage();

      // Esemény kibocsátása
      document.dispatchEvent(
        new CustomEvent("languageChanged", {
          detail: { language: lang },
        })
      );

      // LanguageManager kompatibilitás
      if (window.LanguageManager) {
        window.LanguageManager.currentLanguage = lang;
        window.LanguageManager.translations = this.translations;
      }

      console.log(`Nyelv sikeresen átváltva: ${lang}`);
      return true;
    } else {
      console.error(`Ismeretlen nyelv: ${lang}`);
      return false;
    }
  },

  // Nyelvi választó felépítése
  buildLanguageSelector: function () {
    // Létező nyelvválasztó eltávolítása
    const existingSelector = document.querySelector(".language-selector");
    if (existingSelector) {
      existingSelector.remove();
    }

    const container = document.createElement("div");
    container.className = "language-selector";

    // Aktuális nyelv gomb
    const currentLang = this.languages[this.currentLanguage];
    const button = document.createElement("div");
    button.className = "current-language";
    button.innerHTML = `
      <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/${currentLang.flag}.svg" 
           alt="${currentLang.name}" class="current-flag">
      <span class="current-name">${currentLang.nativeName}</span>
      <i class="fas fa-chevron-down"></i>
    `;

    // Nyelvi menü
    const menu = document.createElement("div");
    menu.className = "language-dropdown";

    // Elsődleges nyelvek
    const primaryLangs = document.createElement("div");
    primaryLangs.className = "language-group primary";

    // Másodlagos és egyéb nyelvek
    const otherLangs = document.createElement("div");
    otherLangs.className = "language-group other";

    // Elsődleges nyelvek: en, zh, es, ar, hi
    const primaryCodes = ["en", "zh", "es", "ar", "hi"];

    // Nyelvek hozzáadása a megfelelő csoportokhoz
    Object.entries(this.languages).forEach(([code, langInfo]) => {
      const langOption = document.createElement("div");
      langOption.className = `language-option ${
        code === this.currentLanguage ? "active" : ""
      }`;
      langOption.setAttribute("data-lang", code);
      langOption.innerHTML = `
        <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/${langInfo.flag}.svg" 
             alt="${langInfo.name}">
        <span>${langInfo.nativeName}</span>
      `;

      // A megfelelő csoporthoz adjuk
      if (primaryCodes.includes(code)) {
        primaryLangs.appendChild(langOption);
      } else {
        otherLangs.appendChild(langOption);
      }
    });

    // Csoportok hozzáadása a menühöz
    menu.appendChild(primaryLangs);
    menu.appendChild(otherLangs);

    // Minden összerakása
    container.appendChild(button);
    container.appendChild(menu);

    // Navigációs menühöz adás
    const navbar = document.querySelector(".navbar .container");
    if (navbar) {
      navbar.appendChild(container);
    } else {
      document.body.appendChild(container);
    }

    // Stílusok hozzáadása
    this.addStyles();
  },

  // CSS stílusok hozzáadása
  addStyles: function () {
    if (document.getElementById("i18n-styles")) return;

    const style = document.createElement("style");
    style.id = "i18n-styles";
    style.textContent = `
      .language-selector {
        position: relative;
        z-index: 1500;
        margin-left: 15px;
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
        width: 220px;
        display: none;
        max-height: 60vh;
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
      
      .language-group {
        padding: 5px 0;
      }
      
      .language-group.primary {
        border-bottom: 1px solid #f0f0f0;
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
      @media (max-width: 992px) {
        .language-selector {
          position: absolute;
          top: 15px;
          right: 70px;
          z-index: 1600; /* Magasabb z-index, hogy a menü fölött legyen */
        }
        
        .current-name {
          display: none;
        }
        
        .current-language {
          padding: 6px 8px;
        }
        
        .current-language i {
          display: none;
        }
        
        .language-dropdown {
          right: -10px;
        }
      }
      
      @media (max-width: 576px) {
        .language-selector {
          right: 60px;
        }
        
        .language-dropdown {
          width: 180px;
          max-height: 50vh;
        }
      }
    `;

    document.head.appendChild(style);
  },

  // Oldal tartalmának fordítása
  translatePage: function () {
    console.log("Oldaltartalom fordítása...");

    // Science szekció speciális kezelése - a data-i18n attribútumok beállítása
    this.ensureScienceTranslations();

    // Elemek fordítása data-i18n attribútum alapján
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (this.translations[key]) {
        element.innerHTML = this.translations[key];
      } else {
        console.warn(`Hiányzó fordítási kulcs: ${key}`);
      }
    });

    // Placeholder fordítása
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (this.translations[key]) {
        element.placeholder = this.translations[key];
      }
    });

    // Alt szöveg fordítása
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.getAttribute("data-i18n-alt");
      if (this.translations[key]) {
        element.alt = this.translations[key];
      }
    });

    // HTML attribútumok fordítása (title, aria-label, stb.)
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const data = element.getAttribute("data-i18n-attr").split(",");
      data.forEach((item) => {
        const [attr, key] = item.trim().split(":");
        if (attr && key && this.translations[key]) {
          element.setAttribute(attr, this.translations[key]);
        }
      });
    });

    // Weboldal címének beállítása
    const titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey && this.translations[titleKey]) {
      document.title = this.translations[titleKey];
    }

    // Meta leírások frissítése
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descKey = metaDesc.getAttribute("data-i18n-content");
      if (descKey && this.translations[descKey]) {
        metaDesc.content = this.translations[descKey];
      }
    }

    console.log("Fordítás kész");
  },

  // Science szekció fordítási kulcsainak beállítása
  ensureScienceTranslations: function () {
    this.scienceTranslationKeys.forEach((item) => {
      const elements = document.querySelectorAll(item.selector);
      elements.forEach((element) => {
        if (!element.hasAttribute("data-i18n")) {
          element.setAttribute("data-i18n", item.key);
        }
      });
    });
  },

  // Nyelvi választó frissítése
  updateLanguageSelector: function () {
    console.log("Nyelvválasztó frissítése");

    // Aktuális nyelv
    const currentLang = this.languages[this.currentLanguage];

    // Zászló és név frissítése
    const currentFlag = document.querySelector(".current-flag");
    const currentName = document.querySelector(".current-name");

    if (currentFlag && currentLang) {
      currentFlag.src = `https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/${currentLang.flag}.svg`;
      currentFlag.alt = currentLang.name;
    }

    if (currentName && currentLang) {
      currentName.textContent = currentLang.nativeName;
    }

    // Aktív osztály frissítése a nyelvi opcióknál
    document.querySelectorAll(".language-option").forEach((option) => {
      const lang = option.getAttribute("data-lang");
      if (lang === this.currentLanguage) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  },

  // Eseményfigyelők csatolása
  attachEventListeners: function () {
    console.log("Eseményfigyelők beállítása");

    // Nyelvválasztó elemekre kattintás figyelése
    document.addEventListener("click", async (event) => {
      const langOption = event.target.closest(".language-option");
      if (langOption) {
        const newLang = langOption.getAttribute("data-lang");
        if (newLang && newLang !== this.currentLanguage) {
          await this.setLanguage(newLang);
        }
      }
    });

    // Tartalom dinamikus betöltés utáni fordítás
    document.addEventListener("DOMContentLoaded", () => {
      this.translatePage();
    });

    // AJAX betöltés utáni fordítás
    document.addEventListener("contentLoaded", () => {
      this.translatePage();
    });
  },
};

// Oldal betöltésekor inicializálás
document.addEventListener("DOMContentLoaded", () => {
  I18N.init();
});

// Globális hozzáférés biztosítása
window.I18N = I18N;
