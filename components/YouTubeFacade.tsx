"use client";

import Image from "next/image";
import { useState } from "react";

export default function YouTubeFacade({
  embedUrl,
  title,
  posterSrc,
  posterAlt,
  loading = "eager",
}: {
  embedUrl: string;
  title: string;
  posterSrc?: string;
  posterAlt?: string;
  loading?: "lazy" | "eager";
}) {
  const shouldUsePosterFacade = Boolean(posterSrc);
  const [activated, setActivated] = useState(!shouldUsePosterFacade);

  if (activated) {
    const separator = embedUrl.includes("?") ? "&" : "?";
    const activeUrl = shouldUsePosterFacade
      ? embedUrl.includes("autoplay=")
        ? embedUrl.replace(/autoplay=[01]/, "autoplay=1")
        : `${embedUrl}${separator}autoplay=1`
      : embedUrl;

    return (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
        loading={loading}
        referrerPolicy="strict-origin-when-cross-origin"
        src={activeUrl}
        title={title}
      />
    );
  }

  return (
    <button
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      onClick={() => setActivated(true)}
      type="button"
    >
      {posterSrc && (
        <Image
          alt={posterAlt ?? title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          loading="lazy"
          sizes="(max-width: 1023px) 100vw, 55vw"
          src={posterSrc}
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-secondary text-brand-accent shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20"
      >
        <svg className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
