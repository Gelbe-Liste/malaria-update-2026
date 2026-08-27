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
import { trackOnce } from "./tracking/piano";

function PageContent({ page }) {
  switch (page.kind) {
    case "hero": return <HeroContent page={page} />;
    case "stats": return <StatsContent page={page} />;
    case "steps": return <StepsContent page={page} />;
    case "sources": return <SourcesContent page={page} />;
    case "video": return <VideoContent page={page} />;
    default: return <StandardContent page={page} />;
  }
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleActive = useCallback((index) => {
    setActiveIndex(index);
    const page = pages[index];
    if (history.replaceState && page) {
      history.replaceState(null, "", index === 0 ? window.location.pathname : `#${page.id}`);
    }
  }, []);

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
      <TopBar activeIndex={activeIndex} pages={pages} onMenu={() => setMenuOpen(true)} />
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
            onActive={handleActive}
            long={["who-zahlen", "beratung", "chemoprophylaxe", "standby", "resistenzen", "literatur"].includes(page.id)}
          >
            <PageContent page={page} />
          </PageShell>
        ))}
      </main>
    </>
  );
}
