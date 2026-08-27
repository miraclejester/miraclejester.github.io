import { useState } from "react";
import type { MediaAsset, VideoAsset } from "@/data/types";
import Lightbox from "./Lightbox";

interface MediaGalleryProps {
  screenshots: MediaAsset[];
  videos: VideoAsset[];
}

function isYouTubeEmbed(src: string) {
  return src.includes("youtube.com/embed") || src.includes("youtu.be");
}

export default function MediaGallery({ screenshots, videos }: MediaGalleryProps) {
  const [lightbox, setLightbox] = useState<MediaAsset | null>(null);

  if (screenshots.length === 0 && videos.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {screenshots.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {screenshots.map((shot, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(shot)}
              aria-label={`View full size: ${shot.alt}`}
              className="group block overflow-hidden rounded-lg border border-line bg-elevated transition-colors duration-200 hover:border-line-strong"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="flex flex-col gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-line bg-elevated"
            >
              {isYouTubeEmbed(video.src) ? (
                <iframe
                  src={video.src}
                  title={video.alt}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <video
                  src={video.src}
                  poster={video.poster ?? undefined}
                  controls
                  preload="metadata"
                  className="w-full"
                  aria-label={video.alt}
                >
                  {video.alt}
                </video>
              )}
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
