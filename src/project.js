import { pages, sources, sourceLinks } from "./content";

/**
 * Projekt-/Analytics-Konfiguration für den laufenden med.i.scroll Malaria.
 * Die redaktionellen Inhalte bleiben unverändert in content.js.
 */
export const project = {
  meta: {
    title: "Reisemedizin: Malaria-Update 2025",
    eyebrow: "Reisemedizin",
    description: "Reisemedizin: Malaria-Update 2025 – interaktives Scrollytelling der Gelben Liste",
    logo: "/assets/images/glo-logo.png",
    logoUrl: "https://www.gelbe-liste.de/",
    projectId: "malaria-update-2026",
    analytics: {
      page: "med.i.scroll | Malaria-Update 2025",
      pageType: "med.i.scroll",
      visitorType: "Not logged",
      medicalField: "Reisemedizin",
      indication: "Malaria",
      articleCategory: ["Krankheitsbild"],
      specialtyCategories: ["Infektiologie / Immunologie"],
      contentTypeCategories: ["Reise"],
      tags: ["med.i.scroll", "Gelbe Liste", "Reisemedizin", "Malaria"],
    },
    pdfFileName: "Malaria-Update-2025_Gelbe-Liste.pdf",
    pdfSubject: "Reisemedizin | Gelbe Liste",
    pdfAuthor: "Vidal MMI Germany GmbH"
  },
  pages,
  sources: sources.map((text, index) => ({
    text,
    url: sourceLinks[index],
    analyticsId: `source-${index + 1}`
  }))
};

export { pages, sources, sourceLinks };
