"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryCategory =
  | "Sprinter Vans"
  | "Special Events"
  | "NYC & Brooklyn"
  | "Casino Transportation";

type GalleryPhoto = {
  id: string;
  title: string;
  src: string;
  alt: string;
  categories: GalleryCategory[];
  kind: "image";
};

type GalleryVideo = {
  id: string;
  title: string;
  src: string;
  alt: string;
  categories: GalleryCategory[];
  kind: "video";
};

type GalleryItem = GalleryPhoto | GalleryVideo;

const galleryItems: GalleryItem[] = [
  {
    id: "luxury-van-new-york-7",
    title: "Luxury Sprinter Van in New York",
    src: "/images/gallery/Luxury-van-rental-in-new-york-7.webp",
    alt: "Black Mercedes Sprinter van parked outdoors beneath trees",
    categories: ["Sprinter Vans", "NYC & Brooklyn"],
    kind: "image",
  },
  {
    id: "brooklyn-sprinter-10",
    title: "Sprinter Van in Brooklyn",
    src: "/images/gallery/Sprinter-Van-Rental-with-Driver-in-Brooklyn-New-York-10.webp",
    alt: "Black Sprinter shown from the front on a Brooklyn street and from the rear with its doors open",
    categories: ["Sprinter Vans", "NYC & Brooklyn"],
    kind: "image",
  },
  {
    id: "luxury-van-new-york-2",
    title: "Sprinter Van Interior",
    src: "/images/gallery/Luxury-van-rental-in-new-york-2-1 (1).webp",
    alt: "Black Sprinter outside a city building beside a view of its blue-lit passenger cabin and entertainment screen",
    categories: ["Sprinter Vans", "NYC & Brooklyn", "Special Events"],
    kind: "image",
  },
  {
    id: "atlantic-city-casino",
    title: "Casino Transportation to Atlantic City",
    src: "/images/gallery/Luxury-Casino-Transportation-to-Atlantic-City_-1.webp",
    alt: "Collage of a Sprinter passenger cabin and a black van traveling on a New York City street at night",
    categories: ["Sprinter Vans", "Casino Transportation", "NYC & Brooklyn"],
    kind: "image",
  },
  {
    id: "sports-events-nyc",
    title: "Sports Events in NYC",
    src: "/images/gallery/Sports-Events-in-NYC.webp",
    alt: "NY Travel Limo team members standing beside black Sprinter vans on a grassy field",
    categories: ["Sprinter Vans", "Special Events"],
    kind: "image",
  },
  {
    id: "party-van-occasion-3",
    title: "Party Van for Special Occasions",
    src: "/images/gallery/Luxury-Party-Van-with-Driver-NYC-for-Any-Occasion_3.webp",
    alt: "Black Sprinter van with its passenger door open outside a green residential building",
    categories: ["Sprinter Vans", "Special Events"],
    kind: "image",
  },
  {
    id: "party-van-occasion",
    title: "Sprinter Vans with Professional Drivers",
    src: "/images/gallery/Luxury-Party-Van-with-Driver-NYC-for-Any-Occasion.webp",
    alt: "Professional drivers standing in front of a line of black Sprinter vans",
    categories: ["Sprinter Vans", "Special Events"],
    kind: "image",
  },
  {
    id: "sprinter-video",
    title: "Sprinter Van Rental with Driver in New York NYC",
    src: "/images/gallery/sprinter-van-rental-with-driver-in-new-york-nyc-video-poster.jpg",
    alt: "Video preview showing black Sprinter vans and a passenger beside one of the vehicles",
    categories: ["Sprinter Vans", "NYC & Brooklyn"],
    kind: "video",
  },
];

const filters = [
  "All",
  "Sprinter Vans",
  "Special Events",
  "NYC & Brooklyn",
  "Casino Transportation",
] as const;

type GalleryFilter = (typeof filters)[number];

export default function GalleryExperience() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const visibleItems = galleryItems.filter(
    (item) => filter === "All" || item.categories.includes(filter),
  );
  const activeItem = galleryItems.find((item) => item.id === activeItemId) ?? null;

  function openItem(item: GalleryItem, trigger: HTMLButtonElement) {
    openerRef.current = trigger;
    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setActiveItemId(item.id);
  }

  function closeItem() {
    setActiveItemId(null);
    requestAnimationFrame(() => {
      if (openerRef.current?.isConnected) {
        openerRef.current.focus();
      } else {
        previousFocusRef.current?.focus();
      }
    });
  }

  function showAdjacentPhoto(direction: -1 | 1) {
    const photos = visibleItems.filter((item): item is GalleryPhoto => item.kind === "image");
    if (photos.length < 1) return;
    const currentIndex = photos.findIndex((item) => item.id === activeItemId);
    const nextIndex = currentIndex < 0
      ? direction === 1 ? 0 : photos.length - 1
      : (currentIndex + direction + photos.length) % photos.length;
    setActiveItemId(photos[nextIndex].id);
  }

  useEffect(() => {
    if (!activeItem) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeItem();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showAdjacentPhoto(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showAdjacentPhoto(1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), iframe, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, activeItemId, visibleItems]);

  return (
    <>
      <section aria-label="Gallery filters" className="border-b border-brand-text/10 bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-content flex-wrap gap-2.5">
          {filters.map((label) => (
            <button
              aria-pressed={filter === label}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-offset-4 ${
                filter === label
                  ? "border-brand-accent bg-brand-accent text-white"
                  : "border-brand-text/15 bg-white text-brand-accent hover:border-brand-primary hover:bg-brand-soft"
              }`}
              key={label}
              onClick={() => setFilter(label)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section aria-label={`${filter} gallery items`} className="bg-brand-soft px-5 py-10 sm:px-8 sm:py-16">
        <ul className="mx-auto grid max-w-content grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <li key={item.id}>
              <article className="group h-full overflow-hidden rounded-2xl border border-brand-text/10 bg-white shadow-[0_12px_30px_rgba(41,37,33,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(41,37,33,0.14)]">
                <button
                  aria-label={item.kind === "video" ? `Play video: ${item.title}` : `View larger image: ${item.title}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-dark text-left focus-visible:z-10"
                  onClick={(event) => openItem(item, event.currentTarget)}
                  type="button"
                >
                  <Image
                    alt={item.alt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    src={item.src}
                  />
                  {item.kind === "video" && (
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-brand-dark/20">
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-white/80 bg-brand-accent/90 text-white shadow-lg transition-transform group-hover:scale-110">
                        <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </button>
                <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <h2 className="font-display text-lg font-bold leading-snug text-brand-dark">{item.title}</h2>
                  {item.kind === "video" && (
                    <span className="shrink-0 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-accent">
                      Video
                    </span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeItem();
          }}
        >
          <div
            aria-labelledby="gallery-lightbox-title"
            aria-modal="true"
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col rounded-2xl bg-brand-dark p-3 text-white shadow-2xl sm:p-5"
            ref={dialogRef}
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4 pb-3">
              <h2 className="pr-4 text-base font-semibold leading-6 sm:text-lg" id="gallery-lightbox-title">
                {activeItem.title}
              </h2>
              <button
                aria-label="Close gallery viewer"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-2xl text-white transition hover:bg-white/15 focus-visible:outline-offset-2"
                onClick={closeItem}
                ref={closeButtonRef}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {activeItem.kind === "image" ? (
              <div className="relative h-[65vh] min-h-64 w-full overflow-hidden rounded-lg bg-black">
                <Image
                  alt={activeItem.alt}
                  className="object-contain"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                  src={activeItem.src}
                />
                <button
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-3xl text-white transition hover:bg-brand-accent focus-visible:outline-offset-2"
                  onClick={() => showAdjacentPhoto(-1)}
                  type="button"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-3xl text-white transition hover:bg-brand-accent focus-visible:outline-offset-2"
                  onClick={() => showAdjacentPhoto(1)}
                  type="button"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src="https://www.youtube-nocookie.com/embed/dDe1_ZDUODE?autoplay=1&rel=0"
                  title={activeItem.title}
                />
              </div>
            )}
            <p className="sr-only" aria-live="polite">
              {activeItem.kind === "image" ? activeItem.alt : "Video player opened."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
