import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/reservations",
    "Reservations | NY Travel Limo",
    "Send NY Travel Limo your trip details to request private transportation in New York.",
  );
}

export default function ReservationsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-dark px-5 py-14 text-white sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow mb-4 text-brand-secondary">Plan your ride</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-6xl">
              Reservation Request
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
              Share your passenger, pickup and itinerary details. Our team will review your request and contact you to confirm availability.
            </p>
          </div>
        </section>

        <section aria-label="Reservation request form" className="bg-brand-soft px-5 py-10 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-[0_18px_55px_rgba(41,37,33,0.16)]">
            <div className="bg-brand-accent px-5 pb-6 pt-7 text-white sm:px-8 sm:pt-9">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                NY Travel Limo
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Fields marked <span className="font-bold text-brand-secondary">*</span> are required.
              </p>
            </div>
            <ReservationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
