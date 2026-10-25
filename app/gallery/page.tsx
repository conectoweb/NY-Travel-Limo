import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import GalleryExperience from "@/components/GalleryExperience";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/gallery",
    "NY Travel Limo Gallery",
    "Explore NY Travel Limo Sprinter vans, special event transportation, NYC and Brooklyn vehicles, and a featured van tour video."
  );
}

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="gallery-title" className="services-hero-enter bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Gallery</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-brand-secondary">NY Travel Limo fleet and events</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl" id="gallery-title">
              NY Travel Limo Gallery
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Explore Sprinter vans, group transportation and special event vehicles around New York. Choose a category or open a photo to see it larger.
            </p>
          </div>
        </section>
        <GalleryExperience />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
