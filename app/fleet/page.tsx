import type { Metadata } from "next";
import Image from "next/image";
import FleetOptions from "@/components/FleetOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/fleet",
    "NY Travel Limo Fleet | Sprinter Vans, SUVs & Limousines",
    "Explore the NY Travel Limo fleet in NYC, including Mercedes-Benz Sprinter vans, private SUVs and limousines for chauffeur-driven travel."
  );
}

export default function FleetPage() {
  return (
    <>
      <Header />
      <main>
        <section className="services-hero-enter relative isolate flex min-h-[30rem] overflow-hidden bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <Image
            alt="NY Travel Limo Mercedes-Benz Sprinter van, a featured example from the fleet"
            className="absolute inset-0 z-0 object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/images/nyc-sprinter-van-hero.avif"
          />
          <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.48)_0%,rgba(9,79,89,0.3)_52%,rgba(41,37,33,0.08)_100%)]" />
          <div className="relative z-20 mx-auto flex w-full max-w-content items-center">
            <p className="eyebrow mb-5 text-brand-secondary">Vehicles for your itinerary</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
              NY Travel Limo fleet
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
              Compare vehicle categories and share your passenger count, luggage and trip details
              when you request a quote. Sprinter vans are our featured option for group travel.
            </p>
          </div>
        </section>
        <FleetOptions
          heading="Start with the right vehicle category"
          description="Vehicle configurations and availability vary. Confirm passenger and luggage fit with the reservation team."
        />
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <h2 className="section-heading">Planning a group trip?</h2>
            <p className="mt-5 max-w-3xl leading-7 text-brand-muted">
              A Sprinter van can help keep your party on one itinerary. See our information for
              <a className="text-link" href="/group-transportation-in-new-york-near-me"> private group transportation</a>,
              <a className="text-link" href="/airport-transportation-services-in-nyc-with-professional-chauffeurs"> airport rides</a> and
              <a className="text-link" href="/corporate-transportation-service-with-driver-in-new-york"> corporate travel</a>.
            </p>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
