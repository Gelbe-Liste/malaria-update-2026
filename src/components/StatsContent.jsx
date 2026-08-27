import ContentCard from "./ContentCard";

export default function StatsContent({ page, onOpenGraphic }) {
  return (
    <ContentCard wide className="stats-card">
      <p className="page-kicker">{page.kicker}</p>
      <h2 className="mega-stat">{page.title}</h2>
      <p className="page-subtitle">{page.subtitle}</p>
      <div className="stat-grid">
        {page.stats.map((stat) => (
          <div className="stat-tile" key={stat.value + stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <blockquote className="editorial-quote">{page.quote}</blockquote>
      <div className="country-grid">
        {page.bullets.map((item) => <span key={item}>{item}</span>)}
      </div>
      <img className="inline-figure" src="/assets/images/cases-country.png" alt="Verteilung der Malariafälle nach Ländern" loading="lazy" />

      {onOpenGraphic && (
        <div className="graphic-open-row">
          <button className="graphic-open-button" onClick={onOpenGraphic} aria-label="Grafik öffnen">
            <span className="graphic-open-button__icon" aria-hidden="true">⌕</span>
            <span>Grafik öffnen</span>
          </button>
        </div>
      )}
    </ContentCard>
  );
}
