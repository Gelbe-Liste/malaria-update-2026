import { useCallback, useEffect, useState } from "react";
import { pages } from "./content";
import TopBar from "./components/TopBar";
import MenuOverlay from "./components/MenuOverlay";
import ProgressRail from "./components/ProgressRail";
import PageShell from "./components/PageShell";
import HeroContent from "./components/HeroContent";
import StatsContent from "./components/StatsContent";
import StandardContent from "./components/StandardContent";
import StepsContent from "./components/StepsContent";
import SourcesContent from "./components/SourcesContent";
import VideoContent from "./components/VideoContent";
import ImprintContent from "./components/ImprintContent";
import ImageLightbox from "./components/ImageLightbox";
import { generateMalariaPdf } from "./pdf/generatePdf";
import { trackEvent, trackOnce } from "./tracking/piano";

const ZOOMABLE_CHAPTERS = new Set(["kernaussagen", "who-zahlen"]);

function PageContent({ page, onOpenGraphic, onPdf, pdfGenerating }) {
  const graphicHandler = ZOOMABLE_CHAPTERS.has(page.id) ? onOpenGraphic : undefined;

  switch (page.kind) {
    case "hero":
      return <HeroContent page={page} />;
    case "stats":
      return <StatsContent page={page} onOpenGraphic={graphicHandler} />;
    case "steps":
      return <StepsContent page={page} />;
    case "sources":
      return <SourcesContent page={page} onPdf={onPdf} pdfGenerating={pdfGenerating} />;
    case "video":
      return <VideoContent page={page} />;
    case "imprint":
      return <ImprintContent page={page} />;
    default:
      return <StandardContent page={page} onOpenGraphic={graphicHandler} />;
  }
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGraphic, setOpenGraphic] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

  const handleActive = useCallback((index) => {
    setActiveIndex(index);
    const page = pages[index];
    if (history.replaceState && page) {
      history.replaceState(null, "", index === 0 ? window.location.pathname : `#${page.id}`);
    }
  }, []);

  const handleOpenGraphic = useCallback((page) => {
    setOpenGraphic(page);
    trackEvent("image_view_open", {
      chapter_id: page.id,
      image_src: page.background,
      module_id: "malaria-update-2025"
    });
  }, []);

  const handleCloseGraphic = useCallback(() => {
    if (openGraphic) {
      trackEvent("image_view_close", {
        chapter_id: openGraphic.id,
        module_id: "malaria-update-2025"
      });
    }
    setOpenGraphic(null);
  }, [openGraphic]);

  const handlePdf = useCallback(async () => {
    if (pdfGenerating) return;
    setPdfGenerating(true);
    setPdfProgress(1);
    trackEvent("pdf_generate_start", {
      module_id: "malaria-update-2025",
      format: "A4_portrait"
    });

    try {
      const result = await generateMalariaPdf({ onProgress: setPdfProgress });
      trackEvent("pdf_generate_complete", {
        module_id: "malaria-update-2025",
        format: "A4_portrait",
        pdf_pages: result.pages,
        pdf_size_bytes: result.size
      });
    } catch (error) {
      console.error("PDF generation failed", error);
      trackEvent("pdf_generate_error", {
        module_id: "malaria-update-2025",
        error_message: String(error?.message || error)
      });
      window.alert("Das PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.");
    } finally {
      window.setTimeout(() => {
        setPdfGenerating(false);
        setPdfProgress(0);
      }, 500);
    }
  }, [pdfGenerating]);

  useEffect(() => {
    trackOnce("page-display", "page.display", {
      page: "reisemedizin-malaria-update-2025",
      page_chapter1: "reisemedizin",
      page_chapter2: "malaria"
    });

    const onScroll = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = window.scrollY / scrollable;
      for (const percent of [25, 50, 75, 100]) {
        const threshold = percent === 100 ? 0.985 : percent / 100;
        if (depth >= threshold) {
          trackOnce(`depth-${percent}`, "scroll_depth", {
            depth_percent: percent,
            module_id: "malaria-update-2025"
          });
        }
      }
      if (depth >= 0.985) {
        trackOnce("module-complete", "module_complete", {
          module_id: "malaria-update-2025"
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }), 100);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <TopBar
        activeIndex={activeIndex}
        pages={pages}
        onMenu={() => setMenuOpen(true)}
        onPdf={handlePdf}
        pdfGenerating={pdfGenerating}
        pdfProgress={pdfProgress}
      />
      <ProgressRail pages={pages} activeIndex={activeIndex} />
      <MenuOverlay open={menuOpen} pages={pages} activeIndex={activeIndex} onClose={() => setMenuOpen(false)} />

      <main className="story">
        {pages.map((page, index) => (
          <PageShell
            key={page.id}
            page={page}
            index={index}
            total={pages.length}
            nextId={pages[index + 1]?.id}
            previousId={pages[index - 1]?.id}
            startId={pages[0]?.id}
            onActive={handleActive}
            long={["who-zahlen", "beratung", "chemoprophylaxe", "standby", "resistenzen", "literatur", "impressum"].includes(page.id)}
          >
            <PageContent page={page} onOpenGraphic={() => handleOpenGraphic(page)} onPdf={handlePdf} pdfGenerating={pdfGenerating} />
          </PageShell>
        ))}
      </main>

      <ImageLightbox
        open={Boolean(openGraphic)}
        image={openGraphic?.background}
        title={openGraphic?.kicker || openGraphic?.nav || "Grafik"}
        chapterId={openGraphic?.id}
        onClose={handleCloseGraphic}
      />
    </>
  );
}
