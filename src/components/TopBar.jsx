import { useEffect, useState } from "react";

export default function TopBar({ activeIndex, pages, onMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
      <a
        className="topbar__logo"
        href="https://www.gelbe-liste.de/"
        target="_blank"
        rel="noreferrer"
        aria-label="Gelbe Liste öffnen"
      >
        <img src="/assets/images/glo-logo.png" alt="Gelbe Liste" />
      </a>

      <div className="topbar__title" aria-live="polite">
        <span className="topbar__eyebrow">Reisemedizin</span>
        <span className="topbar__chapter">{pages[activeIndex]?.nav}</span>
      </div>

      <button className="menu-button" onClick={onMenu} aria-label="Kapitelmenü öffnen">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
