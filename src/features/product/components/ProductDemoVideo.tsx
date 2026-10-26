"use client";

import { useEffect, useRef } from "react";

import { Reveal } from "@/components/shared/Reveal";

type ProductDemoVideoProps = {
  /** Path of the silent mp4 loop under `public`. */
  src: string;
  /** Path of its poster; fetched only when the section comes close. */
  poster: string;
  /** Describes the loop for assistive technology. */
  label: string;
};

/**
 * Silent product loop that costs nothing until it is seen: neither the file nor
 * its poster is fetched on page load (`preload="none"` and the poster applied
 * from a prop instead of the attribute), buffering starts ~400px before the
 * section scrolls in, playback follows visibility — viewport and tab alike — and
 * phones skip it entirely (the code in frame would be unreadable there), which
 * also keeps the file off their connection:
 * and visitors who prefer reduced motion get the poster with controls instead
 * of autoplay.
 */
export function ProductDemoVideo({ src, poster, label }: ProductDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = false;

    // Poster first, then the file: both stay unfetched until the section is near.
    const warm = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        video.poster = poster;
        if (!reduced) video.preload = "auto";
        warm.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    const play = () => {
      if (inView && !document.hidden) void video.play().catch(() => undefined);
    };

    const visible = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        if (inView) play();
        else video.pause();
      },
      { threshold: 0.35 },
    );

    const onTabChange = () => (document.hidden ? video.pause() : play());

    // Wait for the page load so the video never competes with the hero (LCP).
    const start = () => {
      warm.observe(video);
      if (!reduced) visible.observe(video);
    };

    if (reduced) video.controls = true;
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    document.addEventListener("visibilitychange", onTabChange);

    return () => {
      window.removeEventListener("load", start);
      document.removeEventListener("visibilitychange", onTabChange);
      warm.disconnect();
      visible.disconnect();
    };
  }, [poster]);

  return (
    <section className="mx-auto hidden max-w-4xl px-6 pb-16 md:block">
      <Reveal>
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <video
            ref={videoRef}
            className="aspect-video w-full"
            width={1280}
            height={720}
            preload="none"
            muted
            loop
            playsInline
            disableRemotePlayback
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </Reveal>
    </section>
  );
}
