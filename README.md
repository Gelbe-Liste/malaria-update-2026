# Gelbe Liste – Malaria-Update 2025 (React/Vite)

Eigenständige React-/Vite-Neuumsetzung des bestehenden Scrollytellings
„Reisemedizin: Malaria-Update 2025“.

Die Anwendung übernimmt die veröffentlichte Kapitelstruktur und verwendet die vom Auftraggeber bereitgestellten Texte, Bilder, Karten, PDF- und Videoassets. Der Pageflow-Programmcode selbst wird nicht verwendet.

## Technik

- React 19
- Vite 8
- JavaScript / JSX
- CSS ohne zusätzliche UI-/Animationsbibliothek
- IntersectionObserver für Kapitelaktivierung
- responsive / mobile-first
- Vercel-Konfiguration enthalten
- PWA-Manifest enthalten
- Piano-Analytics-Adapter vorbereitet

## Enthaltene Kapitel

1. Malaria-Update 2025
2. Kernaussagen in 60 Sekunden
3. Neue Bedrohungen
4. WHO-Zahlen 2024
5. Relevanz für Deutschland
6. Praxisblock 1 – Risiko-Logik
7. Praxisblock 2 – Chemoprophylaxe
8. Praxisblock 3 – Standby/NSB
9. Praxisblock 4 – Rückkehrerfieber
10. Resistenzen & Diagnostik-Evasion
11. Literatur & PDF-Download
12. Gelbe Liste App / Video

## Start in StackBlitz / lokal

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
```

Vite schreibt den Build nach `dist/`.

## Vercel

`vercel.json` ist bereits enthalten:

- Framework: Vite
- Install: `npm install --no-audit --no-fund`
- Build: `npm run build`
- Output: `dist`

## Inhalte anpassen

Die redaktionellen Inhalte und die Zuordnung der Bilder befinden sich zentral in:

`src/content.js`

Die wichtigsten UI-Komponenten liegen in:

`src/components/`

## Piano Analytics

`src/tracking/piano.js` erkennt automatisch eine vorhandene globale Piano-Analytics-Instanz unter `window.pa`.

Vorbereitete Events:

- `page.display`
- `chapter_view`
- `scroll_depth` (25/50/75/100)
- `module_complete`
- `pdf_download`
- `outbound_click`
- `video_start`
- `video_pause`
- `video_complete`

Ist Piano noch nicht eingebunden, werden Events im Development-Modus in der Konsole ausgegeben und zusätzlich in `window.__MALARIA_TRACKING__` gesammelt.

## Assets

Die bereitgestellten sehr großen Originalbilder wurden ausschließlich für die Webauslieferung verkleinert/komprimiert. Die Originaldateien in der gelieferten ZIP werden nicht verändert.

Das 1080×1920-Video wurde für die Webauslieferung auf 720 px Breite transkodiert und für Streaming (`faststart`) optimiert.

## Hinweis zur 1:1-Umsetzung

Diese Version ist eine React-Neuimplementierung und keine Kopie des Pageflow-Codes. Inhalt, Reihenfolge, Bildwelt und das immersive Vollbild-/Scrollprinzip wurden anhand der veröffentlichten Version und der bereitgestellten Projektdateien reproduziert. Pageflow-spezifische interne Übergänge, Fonts und Engine-Details können sich im Pixelvergleich unterscheiden und können bei Bedarf in einem weiteren Feinschliff anhand konkreter Desktop-/Mobile-Screenshots angeglichen werden.
