import ContentCard from "./ContentCard";
import { sources, sourceLinks } from "../content";
import { trackEvent } from "../tracking/piano";

export default function SourcesContent({ page, onPdf, pdfGenerating = false }) {
  const outbound = (label, url) => trackEvent("outbound_click", { link_label: label, destination_url: url, chapter_id: page.id });

  return (
    <ContentCard wide>
      <p className="page-kicker">{page.kicker}</p>
      <h2>{page.title}</h2>
      <div className="cta-row">
        <a
          className="primary-cta"
          href="https://www.gelbe-liste.de/reisemedizin"
          target="_blank"
          rel="noreferrer"
          onClick={() => outbound("Weitere reisemedizinische Informationen", "https://www.gelbe-liste.de/reisemedizin")}
        >
          Weitere aktuelle reisemedizinische Informationen
        </a>
        <button
          type="button"
          className="secondary-cta"
          onClick={onPdf}
          disabled={pdfGenerating}
          aria-busy={pdfGenerating}
        >
          {pdfGenerating ? "PDF wird erstellt ..." : "Malaria-Update 2025 als PDF erstellen"}
        </button>
      </div>
      <ol className="sources-list">
        {sources.map((source, index) => (
          <li key={source}>
            <a href={sourceLinks[index]} target="_blank" rel="noreferrer" onClick={() => outbound(`Quelle ${index + 1}`, sourceLinks[index])}>
              {source}
            </a>
          </li>
        ))}
      </ol>
    </ContentCard>
  );
}
