import Image from "next/image";
import { QuoteLink } from "@/components/Header";
import TrustSignals from "@/components/TrustSignals";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="services-hero-enter relative isolate flex min-h-[42rem] overflow-hidden bg-brand-dark text-white sm:min-h-[45rem] lg:min-h-[calc(100svh-6rem)]"
      id="home"
    >
      <Image
        alt="A black Mercedes-Benz Sprinter van on a city street"
        className="absolute inset-0 z-0 object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/images/nyc-sprinter-van-hero.avif"
      />
      <div
        aria-hidden="true"
      className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.38)_0%,rgba(9,79,89,0.24)_48%,rgba(41,37,33,0.08)_100%)]"
      />
      <div className="relative z-20 mx-auto flex w-full max-w-content flex-col justify-center px-5 pb-16 pt-16 sm:px-8 sm:pb-20 lg:pb-24 lg:pt-20">
        <div className="max-w-[52rem]">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary sm:text-sm">
            Private transportation · New York City
          </p>
          <h1
            className="max-w-[52rem] text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.7rem]"
            id="hero-title"
          >
            Private Transportation &amp; Chauffeur Service in New York City
          </h1>
          <p className="mt-7 max-w-[43rem] text-base leading-7 text-white/85 sm:text-lg sm:leading-[2.1rem]">
            Arrange a private transportation service in NYC around your itinerary, whether you need
            an{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/airport-transportation-services-in-nyc-with-professional-chauffeurs"
            >
              airport transfer
            </a>
            ,{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/corporate-transportation-service-with-driver-in-new-york"
            >
              business transportation
            </a>
            , a{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/group-transportation-in-new-york-near-me"
            >
              group ride
            </a>{" "}
            or a{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/funeral-transportation-services-nyc-dignified-professional"
            >
              family memorial trip
            </a>
            . Choose from{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/sprinter-van-rental-with-driver-new-york-nyc"
            >
              Mercedes-Benz Sprinter vans
            </a>
            ,{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/luxury-suv-rental-nyc"
            >
              private SUVs
            </a>{" "}
            and{" "}
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary"
              href="/lincoln-stretch-limo-rental-nyc"
            >
              limousines
            </a>
            , then confirm passenger and luggage fit for your trip.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <QuoteLink
              className="min-h-14 px-7"
              label="Request a Quote"
            />
          </div>
        </div>
        <TrustSignals />
      </div>
    </section>
  );
}
