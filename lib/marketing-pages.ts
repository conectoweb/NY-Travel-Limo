import type { ContentPageData } from "@/components/ContentPage";

export const marketingPages: Record<string, ContentPageData> = {
  rates: {
    title: "Private Car Service Rates in New York",
    description: "Request a tailored quote for NY Travel Limo private chauffeur transportation in New York.",
    eyebrow: "Rates and quote requests",
    intro: "Transportation costs depend on the trip details. Request a quote with your itinerary so the team can provide information for your specific ride. No fixed rates are published here.",
    sections: [
      {
        heading: "What to include in a quote request",
        paragraphs: ["Share the date and time, pickup and destination addresses, passenger count, luggage needs, stops and expected duration. For airport service, include the airport and relevant flight details; for a multi-stop trip, list destinations in order."],
        bullets: ["Trip date and pickup time", "Pickup, destination and planned stops", "Passenger and luggage count", "Vehicle preference and itinerary notes"],
      },
      {
        heading: "Review the trip details before reserving",
        paragraphs: ["Your final transportation arrangements, availability and applicable charges should be confirmed directly with our team. The reservation request form does not collect payment information; our team will coordinate any payment separately after reviewing your request."],
      },
    ],
    links: [
      { label: "View fleet options", href: "/fleet" },
      { label: "Airport transportation", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
      { label: "Hourly transportation", href: "/transportation-by-hours-in-new-york" },
    ],
  },
  "about-us": {
    title: "About NY Travel Limo",
    description: "Learn about NY Travel Limo's private chauffeur transportation services in New York.",
    eyebrow: "About the service",
    intro: "NY Travel Limo helps travelers arrange private, chauffeur-driven transportation in New York. The site describes available trip types and vehicle categories so customers can provide itinerary details when requesting a quote.",
    sections: [
      {
        heading: "Transportation planned around your trip",
        paragraphs: ["Service information covers airport transfers, business travel, roadshows, cruise terminals, weddings, hourly rides, city tours, point-to-point trips, wine tours and group transportation.", "Mercedes-Benz Sprinter vans are featured for group transportation, alongside SUV and limousine options. Confirm vehicle configuration and availability for your particular itinerary."],
      },
      {
        heading: "Talk through your transportation needs",
        paragraphs: ["Share your dates, locations, passenger count and relevant trip details through the reservation link or contact the team by telephone."],
      },
    ],
    links: [
      { label: "Browse transportation services", href: "/services" },
      { label: "Explore the fleet", href: "/fleet" },
      { label: "Contact NY Travel Limo", href: "/contact-us" },
    ],
  },
  "frequently-asked-questions": {
    title: "Frequently Asked Questions",
    description: "Answers to common questions about private chauffeur transportation and quote requests in New York.",
    eyebrow: "Helpful information",
    intro: "Find general information about vehicle choices, trip planning and requesting a transportation quote. Confirm specific availability and arrangements directly with NY Travel Limo.",
    sections: [
      { heading: "Which vehicle should I choose?", paragraphs: ["Consider passenger count, luggage, trip type and planned stops. Sprinter vans are featured for groups; SUVs and limousines are also listed. Vehicle seating and luggage configuration vary, so confirm details before booking."], bullets: ["Sprinter vans: group itineraries", "SUVs: private trips and airport transportation", "Limousines: weddings and special occasions"] },
      { heading: "What information is needed for a quote?", paragraphs: ["Provide your travel date and time, pickup and destination, passenger count and itinerary. Include luggage and flight or terminal information where relevant."] },
      { heading: "How can I reserve transportation?", paragraphs: ["Send your trip details through the reservation request form on this website. Submitting the form sends a request, not a confirmed booking. Our team will follow up to confirm availability and arrangements, and will coordinate any payment separately."] },
      { heading: "Can a vehicle wait or make multiple stops?", paragraphs: ["Include expected duration, stops and timing in your request. The reservation team can confirm the arrangements and terms for your itinerary."] },
    ],
    links: [
      { label: "Request a quote", href: "/reservations" },
      { label: "Airport transportation", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
      { label: "Group transportation", href: "/group-transportation-in-new-york-near-me" },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Privacy information for visitors to the NY Travel Limo website; business-specific details are marked for review.",
    eyebrow: "Privacy information",
    intro: "This draft policy requires review and completion by the business before publication. It is not a legal compliance guarantee.",
    sections: [
      { heading: "Business and contact details", paragraphs: ["Legal business name: [[COMPLETE LEGAL BUSINESS NAME]]. Privacy contact: [[ADD PRIVACY CONTACT EMAIL OR ADDRESS]]. Applicable business address: [[CONFIRM BUSINESS ADDRESS]]."] },
      { heading: "Information submitted through this website", paragraphs: ["The Contact Us quote form and reservation request form collect a name, email address, phone number, consent and trip details needed to respond. Requests are emailed to sales@nytravellimo.com through the site's email delivery provider and are not stored in the website database. Google reCAPTCHA processes verification data when a visitor submits a form. Neither form collects or sends payment details."] },
      { heading: "Use, sharing and retention", paragraphs: ["The business must specify how submitted details are used, which service providers receive them, whether information is transferred, and the applicable retention periods: [[COMPLETE PURPOSES, RECIPIENTS, AND RETENTION DETAILS]]."] },
      { heading: "Privacy choices and questions", paragraphs: ["Add the applicable privacy rights, how people can make a request, verification requirements and response contact: [[COMPLETE PRIVACY REQUEST PROCESS]]. This policy should be reviewed for the jurisdictions where the business operates."] },
    ],
    links: [{ label: "Cookie Policy", href: "/cookie-policy" }, { label: "Contact", href: "/contact-us" }],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "Information about essential browser storage and optional cookie preferences on the NY Travel Limo website.",
    eyebrow: "Cookie information",
    intro: "The site stores your cookie choice in local browser storage so it can remember your preferences. No analytics or advertising tags are currently included in this project. The business should confirm this policy before publication.",
    sections: [
      { heading: "Essential storage", paragraphs: ["Essential storage remembers your consent choice and is needed to apply that choice. It does not require an optional analytics or advertising category."] },
      { heading: "Optional technologies", paragraphs: ["Analytics and advertising technologies are not configured in the current project. Google reCAPTCHA is used to protect contact and reservation forms and may process browser or device data under Google's policies. Review applicable disclosure and consent requirements before launch. Update this policy if other technologies are added."] },
      { heading: "Change your preferences", paragraphs: ["Use the Cookie settings control in the footer to reopen the consent choices. Your preference is stored in this browser and can be changed or withdrawn there."] },
      { heading: "Business-specific details", paragraphs: ["Complete any legally required cookie disclosures, service-provider names, retention periods and contact information before publication: [[BUSINESS TO REVIEW AND COMPLETE]]."] },
    ],
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    description: "Website terms for NY Travel Limo, provided as a draft for business and legal review.",
    eyebrow: "Terms of use",
    intro: "This draft is a starting point and requires completion and review by the business. It does not replace the terms provided by the reservation platform or a legal review.",
    sections: [
      { heading: "Website information", paragraphs: ["Service descriptions are general information. Vehicle availability, configurations, itinerary details and charges must be confirmed through the reservation process."] },
      { heading: "Reservations and payments", paragraphs: ["Use the website reservation request form to send trip details. Submitting a request does not confirm a booking or process a payment. The form does not collect payment details. Our team will follow up to confirm availability, arrangements and any payment."] },
      { heading: "Business details to complete", paragraphs: ["Legal business name: [[COMPLETE]]. Governing law and venue: [[BUSINESS/COUNSEL TO COMPLETE]]. Effective date: [[COMPLETE]]. Add any terms specific to use of this website: [[REVIEW AND COMPLETE]]."] },
    ],
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Cookie Policy", href: "/cookie-policy" }],
  },
};
