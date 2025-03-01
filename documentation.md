## Képméretek szekciónként

### Hero szekció (főoldal)

- Háttérkép: 1920×1080 px (nagy méretű, teljes képernyős háttér)
- Logo: 150×150 px (kör alakú, középen elhelyezkedő GC logo)

### About (Rólunk) szekció

- Fő kép: 600×450 px (történeti kép a GānCuju-ról)
- Ikonok: 24×24 px (bullet pontokhoz)

### Mission (Küldetésünk) szekció

- Videó előnézeti kép: 800×450 px (16:9 arány)
- Play gomb ikon: 80×80 px (kör alakú, átlátszó háttérrel)

### Features (Jellemzők) szekció

- Tab képek (minden fülhöz): 500×300 px
- Kis ikonok a fülekhez: 24×24 px

### Philosophy (Filozófia) szekció

- Kártya ikonok: 48×48 px (minden kártyához)
- Háttér illusztrációk: 300×200 px (ha szükséges a kártyák hátoldalához)

### Products (Termékek) szekció

- Termékképek: 400×400 px (négyzet alakú, termékenkénti illusztráció)
- Nyíl ikonok: 16×16 px (navigációhoz a termékek között)
- Indicator pontok: 12×12 px (kör alakú)

### Contact (Kapcsolat) szekció

- Ikon képek: 24×24 px (térképjel, telefon, e-mail, stb.)
- Social media ikonok: 40×40 px (kör alakú)

### Footer (Lábléc)

- Logo: 40×40 px (kis méretű GC logo)
- Kis ikonok: 16×16 px (ha szükséges)

## Videók

### Mission szekció videó

- Felbontás: 1280×720 px (HD minőség)
- Formátum: MP4 (H.264 kódolással)
- Hossz: 2-3 perc (optimális a figyelem fenntartásához)
- Méret: Max. 10 MB (web-optimalizált)

## Általános tippek a média elemekkel kapcsolatban

1. **Reszponzív képek**:

   - Használj `srcset` attribútumot különböző képméretekhez
   - Mobil eszközökre kisebb felbontású képeket tölts be

2. **Optimalizálás**:

   - Minden képet optimalizálj web használatra (JPEG/PNG/WebP formátumokra)
   - Használj WebP formátumot ahol csak lehet (kisebb méret, jobb minőség)
   - Biztosíts fallback-et régebbi böngészőkhöz

3. **Lazy loading**:

   - Használd a `loading="lazy"` attribútumot a teljesítmény javításához

4. **Video optimalizálás**:
   - Biztosíts automatikus minőségi beállításokat a különböző sávszélességekhez
   - Adj hozzá feliratokat a videókhoz a jobb elérhetőség érdekében

mkdir -p assets/images/hero
mkdir -p assets/images/about
mkdir -p assets/images/features
mkdir -p assets/images/philosophy
mkdir -p assets/images/products
mkdir -p assets/videos

# Hero szekció média fájljai

touch assets/images/hero/background.jpg
touch assets/images/hero/logo.png

# About szekció média fájljai

touch assets/images/about/history.jpg

# Mission szekció média fájljai

touch assets/images/about/video-thumbnail.jpg
touch assets/videos/gancuju-intro.mp4

# Features szekció média fájljai

touch assets/images/features/feature1.jpg
touch assets/images/features/feature2.jpg
touch assets/images/features/feature3.jpg
touch assets/images/features/feature4.jpg

# Philosophy szekció média fájljai (ha szükséges képek a kártyákhoz)

touch assets/images/philosophy/respect-bg.jpg
touch assets/images/philosophy/cooperation-bg.jpg
touch assets/images/philosophy/strategy-bg.jpg
touch assets/images/philosophy/community-bg.jpg

# Products szekció média fájljai

touch assets/images/products/gancuju-sport.jpg
touch assets/images/products/ganball-equipment.jpg
touch assets/images/products/lion-academy.jpg
touch assets/images/products/ganball-games.jpg
