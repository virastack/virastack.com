"use client";

import { useEffect, useRef } from "react";

import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/Reveal";

/**
 * Silent product loop. The file is not downloaded until the section scrolls
 * into view after page load (`preload="none"` + IntersectionObserver), it pauses when it
 * leaves the viewport, and visitors who prefer reduced motion get a poster
 * with native controls instead of autoplay.
 */
export function StartDemoVideo() {
  const t = useTranslations("Start");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    // Wait for the page load so the video never competes with the hero (LCP).
    const observe = () => observer.observe(video);
    if (document.readyState === "complete") {
      observe();
    } else {
      window.addEventListener("load", observe, { once: true });
    }

    return () => {
      window.removeEventListener("load", observe);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-16">
      <Reveal>
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <video
            ref={videoRef}
            className="aspect-video w-full"
            width={1280}
            height={720}
            poster="/start/start-intro-poster.webp"
            preload="none"
            muted
            loop
            playsInline
            aria-label={t("demoVideoLabel")}
          >
            <source src="/start/start-intro.mp4" type="video/mp4" />
          </video>
        </div>
      </Reveal>
    </section>
  );
}
