import { useRef } from "react";
import ContentCard from "./ContentCard";
import { sanitizeDestinationPath, trackEvent, trackOnce } from "../tracking/piano";

export default function VideoContent({ page, project }) {
  const ref = useRef(null);
  const name = "Gelbe Liste App";
  const videoId = "gelbe-liste-app-video";
  const pageName = project.meta.analytics.page;
  const ctaUrl = "https://www.gelbe-liste.de/service/gelbe-liste-app";

  const onTimeUpdate = () => {
    const video = ref.current;
    if (!video?.duration) return;
    const percent = Math.floor((video.currentTime / video.duration) * 100);
    for (const milestone of [25, 50, 75]) {
      if (percent >= milestone) {
        trackOnce(`video-progress-${page.id}-${milestone}`, "video.progress", {
          page: pageName,
          chapter_id: page.id,
          video_id: videoId,
          video_name: name,
          progress_percent: milestone
        });
      }
    }
  };

  return (
    <ContentCard wide className="video-card">
      <div className="video-card__copy">
        <p className="page-kicker">{page.kicker}</p>
        <h2>{page.title}</h2>
        <p className="page-subtitle">{page.subtitle}</p>
        <a className="primary-cta" href={ctaUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click.action", {
          pop_in_type: "CTA",
          pop_in_name: "Gelbe Liste App",
          click: "Open external link",
          page: pageName,
          chapter_id: page.id,
          element_id: "gelbe-liste-app-cta",
          destination_path: sanitizeDestinationPath(ctaUrl),
          trigger_source: "video_chapter"
        })}>
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
          onPlay={() => trackOnce(`video-start-${page.id}`, "video.start", { page: pageName, chapter_id: page.id, video_id: videoId, video_name: name })}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => trackOnce(`video-complete-${page.id}`, "video.complete", { page: pageName, chapter_id: page.id, video_id: videoId, video_name: name, progress_percent: 100 })}
        />
      </div>
    </ContentCard>
  );
}
