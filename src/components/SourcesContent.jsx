import ContentCard from "./ContentCard";
import { sources, sourceLinks } from "../content";
import { sanitizeDestinationPath, trackEvent } from "../tracking/piano";

export default function SourcesContent({ page, project, onPdf, pdfGenerating = false }) {
  const pageName = project.meta.analytics.page;
  const outbound = (label, url, elementId, triggerSource) => trackEvent("click.action", {
    pop_in_type: "CTA",
    pop_in_name: label,
    click: "Open external link",
    page: pageName,
    chapter_id: page.id,
    element_id: elementId,
    destination_path: sanitizeDestinationPath(url),
    trigger_source: triggerSource
  });

  const travelUrl = "https://www.gelbe-liste.de/reisemedizin";
  return (
    <ContentCard wide>
      <p className="page-kicker">{page.kicker}</p>
      <h2>{page.title}</h2>
      <div className="cta-row">
        <a className="primary-cta" href={travelUrl} target="_blank" rel="noreferrer" onClick={() => outbound("Weitere reisemedizinische Informationen", travelUrl, "reisemedizin-primary-cta", "sources")}>
          Weitere aktuelle reisemedizinische Informationen
        </a>
        <button type="button" className="secondary-cta" onClick={() => onPdf("sources")} disabled={pdfGenerating} aria-busy={pdfGenerating}>
          {pdfGenerating ? "PDF wird erstellt ..." : "Malaria-Update 2025 als PDF erstellen"}
        </button>
      </div>
      <ol className="sources-list">
        {sources.map((source, index) => (
          <li key={source}>
            <a href={sourceLinks[index]} target="_blank" rel="noreferrer" onClick={() => outbound(`Quelle ${index + 1}`, sourceLinks[index], `source-${index + 1}`, "source_link")}>
              {source}
            </a>
          </li>
        ))}
      </ol>
    </ContentCard>
  );
}
