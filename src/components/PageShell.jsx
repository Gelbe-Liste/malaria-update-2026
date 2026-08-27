import { useEffect, useRef, useState } from "react";
import { trackOnce } from "../tracking/piano";

export default function PageShell({ page, index, total, nextId, previousId, onActive, children, long = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(index === 0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.12);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          onActive(index);
          trackOnce(`chapter-${page.id}`, "chapter_view", {
            chapter_id: page.id,
            chapter_number: index + 1,
            chapter_title: page.nav
          });
        }
      },
      { threshold: [0.12, 0.2, 0.35, 0.55, 0.75] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [index, onActive, page]);

  const scrollTo = (targetId) => {
    if (!targetId) return;
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      id={page.id}
      className={`story-page story-page--${page.tone} story-page--${page.align} ${long ? "story-page--long" : ""} ${visible ? "is-visible" : ""}`}
    >
      <div
        className="story-page__background"
        style={{
          backgroundImage: `url("${page.background}")`,
          backgroundPosition: page.focal || "center center"
        }}
      >
        <div className="story-page__scrim" />
      </div>
      <div className="story-page__inner">
        {children}
      </div>

      <div className="scroll-controls" aria-label="Kapitel-Navigation">
        <button
          className="scroll-button scroll-button--down"
          onClick={() => scrollTo(nextId)}
          aria-label={nextId ? "Zum nächsten Kapitel" : "Kein weiteres Kapitel"}
          disabled={!nextId}
        >
          <span aria-hidden="true">↓</span>
        </button>
        <button
          className="scroll-button scroll-button--up"
          onClick={() => scrollTo(previousId)}
          aria-label={previousId ? "Zum vorherigen Kapitel" : "Zum Seitenanfang"}
          disabled={!previousId}
        >
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </section>
  );
}
