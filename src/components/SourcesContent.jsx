import ContentCard from "./ContentCard";
import { sources, sourceLinks } from "../content";
import { trackEvent } from "../tracking/piano";

export default function SourcesContent({ page }) {
  const download = () => trackEvent("pdf_download", { file_name: "Malaria-Update-2025.pdf", chapter_id: page.id });
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
        <a
          className="secondary-cta"
          href="/assets/downloads/Malaria-Update-2025.pdf"
          download
          onClick={download}
        >
          „Malaria-Update 2025“ als PDF herunterladen
        </a>
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
