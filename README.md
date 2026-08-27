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

## Vercel / Vite 8 CSS-Fix (v1.0.1)

Vite 8 verwendet standardmäßig Lightning CSS zur CSS-Minifizierung. Falls Vercel mit
`Cannot find package 'napi-wasm' ... lightningcss/wasm-node.mjs` abbricht, ist in diesem
Projekt bereits der Workaround aktiv:

```js
css: { transformer: "postcss" },
build: { cssMinify: false }
```

Die Darstellung und Funktionalität bleiben unverändert; lediglich die Produktions-CSS-Datei
wird nicht minifiziert. JavaScript wird weiterhin normal optimiert.

## UI-Anpassung v1.1.0

- Gelbe-Liste-Logo links im Header
- Menübutton rechts im Header
- Menübutton quadratisch mit abgerundeten Ecken
- Kapitel-Navigation mit zwei quadratischen Buttons: nach unten / nach oben
- Content-Fenster mit abgerundeten Ecken
- CTA- und Info-Buttons mit abgerundeten Ecken
- harmonisierte Radien für Hinweise, Statistik-Kacheln und weitere Module
- Vercel-sicheres Setup mit Vite 7.3.6 und Node.js 22

## Navigation v3

Die Kapitelsteuerung enthält drei konsistent gestaltete Buttons:

- ↓ nächster Abschnitt
- ↑ vorheriger Abschnitt
- Pfeil nach oben mit Abschlusslinie: direkt zum Anfang der Anwendung

Der Sprung zum Anfang wird zusätzlich als `navigation_click` mit `navigation_action: scroll_to_top` für das vorbereitete Piano-Tracking erfasst.

## v4 UI refinement

- Chapter navigation controls (down / previous / back to start) now use Gelbe Liste yellow.
- Increased top breathing room on mobile between the fixed rubric/header and the page content.
- `src/content.js` is unchanged from v3.

## v5 – Mobile spacing

- Increased reserved bottom space inside each mobile story page.
- The navigation controls now have a dedicated footer zone instead of sitting directly below the content card.
- Target visual gap between content card and navigation is approximately 28–32 px on phones, with safe-area handling for iOS.

## v6 – Vergrößerbare Fachgrafiken

Die beiden fachlich relevanten Hintergrundgrafiken in „Kernaussagen in 60 Sekunden“ und „World Malaria Report 2025“ besitzen jetzt einen Button „Grafik vergrößern“.

Die Fullscreen-Ansicht unterstützt:
- Zoom + / − bis 400 %
- Zurücksetzen auf 100 % / 1:1
- Verschieben bei vergrößerter Ansicht
- Pinch-Zoom auf Touch-Geräten
- Mausrad-Zoom am Desktop
- ESC bzw. Schließen-Button
- Piano-Events `image_view_open`, `image_zoom`, `image_view_close`

`src/content.js` wurde für dieses Update nicht verändert.

## v7 – Grafikviewer
- Triggertext auf **„Grafik öffnen“** geändert.
- Trigger sitzt in den beiden relevanten Kapiteln unten mittig innerhalb des Textrahmens.
- Im Fullscreen-Viewer gibt es zusätzlich einen deutlich beschrifteten gelben **„× Schließen“**-Button in der unteren Werkzeugleiste.
- `src/content.js` wurde nicht verändert.

## v8 – Grafikviewer
- „Grafik öffnen“ sitzt jetzt tatsächlich als letzter Inhalt innerhalb des Textrahmens.
- Viewer-Schließen oben rechts dauerhaft als „× Schließen“ beschriftet.
- `content.js` wurde nicht verändert.
