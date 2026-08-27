import { useRef } from "react";
import ContentCard from "./ContentCard";
import { trackEvent, trackOnce } from "../tracking/piano";

export default function VideoContent({ page }) {
  const ref = useRef(null);

  return (
    <ContentCard wide className="video-card">
      <div className="video-card__copy">
        <p className="page-kicker">{page.kicker}</p>
        <h2>{page.title}</h2>
        <p className="page-subtitle">{page.subtitle}</p>
        <a
          className="primary-cta"
          href="https://www.gelbe-liste.de/service/gelbe-liste-app"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("outbound_click", { link_label: "Gelbe Liste App", chapter_id: page.id })}
        >
          Mehr zur Gelbe Liste App
        </a>
      </div>
      <div className="phone-stage">
        <img className="print-video-poster" src="/assets/images/app-thumbnail.jpg" alt="Gelbe Liste App" />
        <video
          ref={ref}
          src="/assets/video/gelbe-liste-app.mp4"
          controls
          playsInline
          preload="metadata"
          poster="/assets/images/app-thumbnail.jpg"
          onPlay={() => trackOnce("video-start", "video_start", { video_name: "Gelbe Liste App", chapter_id: page.id })}
          onPause={() => trackEvent("video_pause", { video_name: "Gelbe Liste App", current_time: Math.round(ref.current?.currentTime || 0) })}
          onEnded={() => trackOnce("video-complete", "video_complete", { video_name: "Gelbe Liste App", chapter_id: page.id })}
        />
      </div>
    </ContentCard>
  );
}
