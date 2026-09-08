# Piano Analytics – Malaria med.i.scroll / Stand Mastertemplate v5

Stand: 08.09.2026

## Projektkontext

- Technisches Projekt: `malaria-update-2026`
- Sichtbarer/redaktioneller Titel im bestehenden Projekt: `Malaria-Update 2025`
- Format: `med.i.scroll`
- Medizinisches Fachgebiet: `Reisemedizin`
- Indikation/Thema: `Malaria`

Die redaktionellen Inhalte wurden bei dieser Migration bewusst nicht geändert. Die technische Projekt-ID orientiert sich am laufenden Projektordner, die sichtbaren Titel bleiben im bisherigen Stand erhalten.

## Wiederverwendete Vidal-/Gelbe-Liste-Events

- `page.display` – initialer Aufruf
- `click.action` – Grafik, PDF, externe Links/CTA, Navigation und Menü
- `pop_in.display` – Anzeige des Kapitelmenüs

## Custom Events des med.i.scroll v5

- `chapter.display` – Kapitel erstmals zu mindestens 35 % sichtbar
- `page.scroll` – Scroll-Milestones 25/50/75/100
- `video.start`
- `video.progress` – 25/50/75 %
- `video.complete`

Nicht mehr als eigene Business-Events verwendet werden `chapter_view`, `scroll_depth`, `module_complete`, `image_view_*`, `outbound_click`, `navigation_click`, `pdf_generate_*`, `video_start`, `video_pause`, `video_complete`.

## Projektbezogene Analytics-Konfiguration

In `src/project.js`:

- `project_id`: `malaria-update-2026`
- `page`: `med.i.scroll | Malaria-Update 2025`
- `page_type`: `Microsite`
- `visitor_type`: `Not logged`
- `medicalField`: `Reisemedizin`
- `indication`: `Malaria`
- `article_category`: `MED.I.SCROLL`, `REISEMEDIZIN`

Produktbezogene Properties bleiben leer, solange keine fachlich freigegebene Produktzuordnung vorliegt.

## Neue Custom Properties

`project_id`, `chapter_id`, `chapter_number`, `chapter_title`, `content_type`, `scroll_rate`, `image_id`, `zoom_level`, `document_id`, `element_id`, `destination_path`, `trigger_source`, `entry_point`, `video_id`, `video_name`, `progress_percent`.

## Datenschutz / Consent

Die Tracking-Schicht übernimmt die im Mastertemplate v5 vorbereitete `essential`-Konfiguration. `.gelbe-liste.de` wird nur dann als Cookie-Domain gesetzt, wenn die Anwendung tatsächlich auf einer Gelbe-Liste-Domain läuft. Login-/Personenfelder wie `user_id`, `occupation`, `speciality_function` und `exercise_mode` werden im Standalone-Projekt nicht erzeugt.

## Aktivierung

`.env` / Vercel:

```env
VITE_PIANO_ENABLED=true
VITE_PIANO_SITE_ID=640794
VITE_PIANO_COLLECT_DOMAIN=https://rwwnhth.pa-cd.com
```

Im gelieferten Stand bleibt `VITE_PIANO_ENABLED=false`, bis die neuen Properties/Events im Piano Data Model validiert und intern freigegeben wurden.

## KPI-Mapping

- Reach/Visits: `page.display`
- Chapter Reach: `chapter.display`
- Scroll Depth: `page.scroll` + `scroll_rate`
- Completion: `page.scroll` + `scroll_rate=100`
- Graphic Open Rate: `click.action` + `click="Open graphic"`
- PDF Download Rate: `click.action` + `click="Download PDF"`
- CTA CTR: `click.action` + `click="Open external link"`
- Video: `video.start`, `video.progress`, `video.complete`
