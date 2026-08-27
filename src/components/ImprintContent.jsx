import ContentCard from "./ContentCard";

export default function ImprintContent({ page }) {
  return (
    <ContentCard wide>
      <p className="page-kicker">{page.kicker}</p>
      <h2>{page.title}</h2>

      <div className="imprint-grid">
        <section className="imprint-section">
          <h3>Corporate Publishing</h3>
          <p>
            <strong>Redaktion:</strong> Guido Strehlau<br />
            Vidal MMI Germany GmbH<br />
            Monzastraße 4<br />
            63225 Langen<br />
            <a href="mailto:info@mmi.de">info@mmi.de</a>
          </p>
        </section>

        <section className="imprint-section">
          <h3>Herausgeber und verantwortlicher Diensteanbieter</h3>
          <p>
            <strong>Vidal MMI Germany GmbH</strong><br />
            Monzastraße 4<br />
            63225 Langen
          </p>
          <p>
            Telefon: <a href="tel:+49610320760">06103 2076-0</a><br />
            E-Mail: <a href="mailto:info@mmi.de">info@mmi.de</a>
          </p>
        </section>

        <section className="imprint-section">
          <h3>Unternehmensangaben</h3>
          <p>
            <strong>Vertreten durch:</strong> Michael Schösser, Vincent Bouvier<br />
            <strong>Handelsregister:</strong> Amtsgericht Offenbach/Main, HRB 8014<br />
            <strong>USt-IdNr.:</strong> DE113524692
          </p>
        </section>

        <section className="imprint-section">
          <h3>Verantwortlich für journalistisch-redaktionelle Inhalte</h3>
          <p>
            gemäß § 18 Abs. 2 MStV:<br />
            Michael Schösser, Vincent Bouvier<br />
            Vidal MMI Germany GmbH<br />
            Monzastraße 4<br />
            63225 Langen
          </p>
        </section>

        <section className="imprint-section imprint-section--full">
          <h3>Bildnachweise</h3>
          <p>© de.freepik.com<br />© Vidal MMI Germany GmbH</p>
        </section>
      </div>
    </ContentCard>
  );
}
