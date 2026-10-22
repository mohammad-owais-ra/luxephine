"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping, autoplaying video. React doesn't reliably emit the `muted`
 * attribute on client renders, and browsers only autoplay muted video — so we
 * set it explicitly and call play() (same as the original main.js did).
 */
export default function AutoVideo({
  className,
  poster,
  src,
}: {
  className: string;
  poster: string;
  src: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <video ref={ref} className={className} autoPlay muted loop playsInline poster={poster}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
