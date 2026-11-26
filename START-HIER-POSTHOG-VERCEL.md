# malaria-update-2026 · 9.0.0 · Piano v1.3 / PostHog EU / Consent

## Grundlage und Änderungen
* Ausgangsstand: 2026-10-20_malaria-update-2026_v8_Piano-v1.3 (vollständige redaktionelle Projektinhalte, Grafiken, PDFs, Navigation, Kapitel-ID und PWA-Dateien beibehalten).
* Analytics-/Consent-Schicht aus dem funktionierenden med.i.scroll-Mastertemplate v6.12 übernommen; keine Übertragung der Mastertemplate-Beispielinhalte.
* Neu: PostHog EU Capture via eigener Vercel-Domain `/_medi/r`, gemeinsames gelbes Consent-Management, widerrufbare Einwilligung, QA-Diagnose über `?medi_debug=1`, `standalone_mode`.
* Piano Analytics Event-/Property-Mapping v1.3 weiterhin enthalten; Piano-SDK wird ohne ausdrückliche Freigabe nicht geladen.
* Nur nach Zustimmung: Events und Properties aus den vorhandenen Komponenten (`page.display`, `chapter.display`, `page.scroll`, `click.action`, ggf. Accordion/Workflow/Video) an PostHog EU senden.

## Vercel Production (wichtig)
1. Das gesamte Projektverzeichnis inkl. `vercel.json` und `package-lock.json` an das **bestehende, richtige** Projekt-GitHub-Repository übertragen und den Production-Branch aktualisieren. Keine Mastertemplate-Repo-/Domain verwenden.
2. In den Vercel-Umgebungsvariablen des jeweiligen Kundenprojektes für **Production** einstellen (Typ `Config` bei `VITE_`-Variablen):
```
VITE_POSTHOG_ENABLED=true
VITE_POSTHOG_PROJECT_TOKEN=<<PostHog-EU-phc-Projekttoken aus dem Projekt GLO med.i Analytics>>
VITE_POSTHOG_DEPLOY_ENV=production
VITE_PIANO_ENABLED=false
VITE_PIANO_ESSENTIAL_APPROVED=false
VITE_PIANO_CUSTOM_VIDEO_EVENTS=false
```
3. Vollständigen Production-Build anstoßen (neue Umgebungsvariablen greifen erst nach Build); `npm ci`, `npm run test:analytics`, `npm run build` sind vorgesehen.
4. Die **Kundenprojekt-Domain** mit `?medi_debug=1` öffnen. Vor Zustimmung müssen Diagnose und Activity 0 Requests zeigen. Zustimmung erteilen; prüfen: `Übertragung: Vercel Same-Origin Proxy`, HTTP 200 und wirklich gespeicherte `page.display`/`$pageview` in PostHog.
5. Einmal die Anwendung real durchklicken: Kapitel/Scroll 25, 50, 75, 100, CTA, PDF und falls vorhanden Accordion/Workflow/Video; `project_id` prüfen (`malaria-update-2026`). Dann **Nur notwendige Funktionen** testen: keine weiteren Requests; Widerruf ebenso.
6. Verifizieren: `standalone_mode=false` normaler Browsertab; bei tatsächlich eigenständiger Home-Screen-Anzeige `true`. Kein verlässlicher Installationszähler.
7. Erst nach fachlicher/Datenschutz-Freigabe von Piano Data Model/Consent `VITE_PIANO_ENABLED=true` setzen.

**Datenschutzhinweis:** PostHog-Events sind pseudonym und benötigen weiterhin die ausdrückliche Analytics-Einwilligung. Der eigenständige Client-Adapter erstellt keine PostHog-Personenprofile. GeoIP-Datenerweiterungen im PostHog-Projekt ggf. zusätzlich deaktivieren; Quellcode-/QA-Tests ersetzen keine Datenschutzprüfung.

**Nicht enthalten:** automatisches GitHub-Commit, Vercel-Deploy und Live-Prüfung. Der vorliegende Stand ist ein deployfähiges Quellcodepaket und muss im Projekt veröffentlicht werden.
