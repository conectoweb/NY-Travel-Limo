import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/gallery",
    "NY Travel Limo Vehicle Gallery",
    "View the Sprinter van image currently available from NY Travel Limo and explore private fleet options."
  );
}

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="services-hero-enter bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-content">
            <p className="eyebrow mb-5 text-brand-secondary">Vehicle image</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">NY Travel Limo Gallery</h1>
            <p className="mt-6 max-w-2xl text-white/80">A look at the vehicle image currently available on this website.</p>
          </div>
        </section>
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <figure className="mx-auto max-w-4xl">
              <Image
                src="/images/nyc-sprinter-van-hero.avif"
                alt="Black Sprinter van on a New York City street"
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 1024px"
                className="h-auto w-full rounded-xl object-cover"
              />
              <figcaption className="mt-3 text-sm text-brand-muted">Sprinter van image used to represent private group transportation.</figcaption>
            </figure>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
