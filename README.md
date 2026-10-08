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

## Piano Analytics – Stand Mapping v1.2 / 08.10.2026

Das Projekt verwendet die aktuelle Tracking-Schicht auf Basis des Piano-Parameter-Mappings v1.2. `page_type` kennzeichnet das Format als `med.i.scroll`; `article_category` und `de_page_category` verwenden ausschließlich die bestehenden Vidal-Taxonomien. `entry_point` ist entfallen; Acquisition wird über die vorhandenen Piano-Dimensionen UTM Medium, UTM Source und UTM Campaign ausgewertet.

Wiederverwendete Events:

- `page.display` – initialer Aufruf
- `click.action` – Grafik, PDF, externe Links/CTA, Navigation und Menü
- `pop_in.display` – Anzeige des Kapitelmenüs

Projektbezogene Custom Events:

- `chapter.display` – Kapitel erstmals zu mindestens 35 % sichtbar
- `page.scroll` – Scroll-Milestones 25/50/75/100
- `video.start`, `video.progress`, `video.complete` – Video-Reporting

Die frühere Eventstruktur `chapter_view`, `scroll_depth`, `module_complete`, `image_view_*`, `outbound_click`, `navigation_click`, `pdf_generate_*` und `video_*` wird nicht mehr als eigene Business-Semantik verwendet.

Zentrale technische Konfiguration: `src/tracking/piano.js`; Projekt-/Analytics-Metadaten: `src/project.js`. Die redaktionellen Inhalte bleiben unverändert in `src/content.js`.

Im gelieferten Projektstand ist `VITE_PIANO_ENABLED=false`. Erst nach Validierung der neuen Custom Properties/Events im Piano Data Model und interner Freigabe produktiv auf `true` setzen. Site-ID und Collection Domain sind vorbereitet. Zusätzlich gilt `is_PAP=1`; `box_names` wird nicht verwendet und `product_*` wird nur bei einer Pharmindex-API-Verknüpfung befüllt.

Details siehe `PIANO-ANALYTICS.md`.

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

Historischer Stand: Der Sprung zum Anfang wurde zunächst als `navigation_click` erfasst. Seit der Piano-v5-Migration vom 08.09.2026 läuft die Navigation einheitlich über `click.action`.

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
- Historischer Stand: `image_view_open`, `image_zoom`, `image_view_close`; seit 08.09.2026 auf `click.action` mit Grafik-Properties migriert

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

## v15 – Impressum

- Neues Abschlusskapitel „Impressum“
- kompakte Anbieter- und Unternehmensangaben
- Redaktion / Corporate Publishing
- Verantwortliche für journalistisch-redaktionelle Inhalte nach § 18 Abs. 2 MStV
- Bildnachweise
- kein Hintergrundbild im Impressum; ruhige helle Abschlussfläche


## v16 – Druck-PDF

- PDF-Button rechts oben neben der Inhaltsübersicht
- Browser-Druckdialog via `window.print()`
- DIN A4 Hochformat (`@page { size: A4 portrait; }`)
- jedes Kapitel startet auf einer neuen Seite
- Hintergrundbilder werden im Druck als echte Kapitelabbildungen ausgegeben
- Navigation, Scroll-Steuerung, Lightbox und interaktive Buttons werden im Druck ausgeblendet
- Video wird im PDF über das Posterbild repräsentiert
- Tracking-Event: `print_pdf_open`


## v17
- PDF button made explicitly clickable inside the pointer-events-disabled header.
- Print dialog now opens directly from the user click.
- Header grid supports two right-side controls.
- PDF and menu controls are forced to equal square dimensions with rounded corners.

## v19 – echte clientseitige PDF-Erzeugung

Der PDF-Button verwendet nicht mehr `window.print()`. Stattdessen wird mit `jsPDF` direkt im Browser eine A4-Hochformat-PDF erstellt und als `Malaria-Update-2025_Gelbe-Liste.pdf` gespeichert.

- kein automatischer Druckdialog
- keine iOS-Safari-Abfrage zum automatischen Drucken
- Text bleibt als Vektortext scharf
- Kapitelbilder werden in die PDF eingebettet
- jedes Kapitel startet auf einer neuen A4-Seite
- Quellen und Impressum werden mit ausgegeben
- Fortschritt wird direkt im PDF-Button angezeigt
