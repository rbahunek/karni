# ŠPICA.hr — humoristična svadbena parodija

Statična web-stranica (HTML + CSS + vanilla JS) izrađena kao šaljiva svadbena čestitka.
Sve tvrdnje, komentari i reklame potpuno su izmišljeni.

## Pokretanje lokalno

Otvori `index.html` dvoklikom u pregledniku — nema build koraka ni ovisnosti.

## Deploy na Vercel

Projekt je čista statična stranica, pa na Vercelu:

1. **Add New… → Project** i uvezi ovaj repo (`karni`).
2. Framework Preset: **Other** (nije potreban build).
3. Build Command: ostavi prazno · Output Directory: ostavi prazno (root).
4. **Deploy**.

Vercel će posluživati `index.html` na korijenskoj adresi.

## Struktura

- `index.html` — sadržaj stranice
- `styles.css` — dizajn
- `script.js` — interakcije (modali, popup, lajkovi…)
- `images/` — mjesto za `mladenci.jpg` (stranica radi i bez slike)
