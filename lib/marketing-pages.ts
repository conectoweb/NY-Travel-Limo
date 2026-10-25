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
        paragraphs: ["Your final transportation arrangements, availability and applicable charges should be confirmed directly with our team. Use the separate reservation platform for reservation processing; Contact Us is available for quote inquiries."],
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
    description: "Get to know NY Travel Limo, with more than 26 years of transportation experience serving New York and surrounding areas.",
    eyebrow: "Over 26 years of transportation experience",
    intro: "For more than 26 years, NY Travel Limo has helped people get where they need to go with private transportation and professional drivers. From airport transfers and business schedules to weddings, city tours and group outings, we plan each ride around the people, places and timing that matter to you.",
    sections: [
      {
        heading: "Experience built around New York travel",
        paragraphs: ["New York travel can mean airport pickups, tight business schedules, several stops in one day or coordinating a group across multiple locations. Our experience helps us understand the details that make a transportation plan practical: clear pickup information, realistic timing, passenger needs and the full route.", "We serve trips throughout New York City and surrounding areas, including Brooklyn, Manhattan, Queens, Long Island and New Jersey. Share your locations and schedule so we can review the request with you."],
      },
      {
        heading: "A vehicle for the way you travel",
        paragraphs: ["Our fleet includes Mercedes-Benz Sprinter vans for group transportation, private SUVs and limousines for special occasions. The right choice depends on passenger count, luggage, itinerary and availability; our team can discuss the vehicle that best matches your plans.", "Whether you are arranging an airport transfer, cruise terminal ride, corporate trip, wedding, hourly service, city tour, wine tour or point-to-point journey, let us know what the day requires."],
        bullets: ["Sprinter vans for group itineraries", "Private SUVs for airport and city travel", "Limousines for celebrations and events"],
      },
      {
        heading: "Personal attention from the first request",
        paragraphs: ["We believe a smoother ride starts with listening. Tell us your dates, pickup and drop-off locations, passenger and luggage count, stops and timing. We will review the details and help you understand the next steps for your quote and reservation."],
      },
    ],
    experienceYears: 26,
    fleetImages: {
      sprinter: { src: "/images/services/sprinter-vans-rental.webp", alt: "Mercedes-Benz Sprinter van for group travel" },
      suv: { src: "/images/services/suv-transportation.png", alt: "Private SUV for transportation in New York" },
      limousine: { src: "/images/services/limousines-transportation.png", alt: "Limousine transportation for special occasions" },
    },
    fleetHeading: "Meet the fleet",
    fleetDescription: "Explore our Sprinter vans, SUVs and limousines, then tell us about your itinerary so we can discuss the right fit.",
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
      { heading: "How can I reserve transportation?", paragraphs: ["Use a Reservation link to open the separate reservation platform. For a quote inquiry, submit the Contact Us form on this website."] },
      { heading: "Can a vehicle wait or make multiple stops?", paragraphs: ["Include expected duration, stops and timing in your request. The reservation team can confirm the arrangements and terms for your itinerary."] },
    ],
    links: [
      { label: "Request a quote", href: "/contact-us" },
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
      { heading: "Information submitted through this website", paragraphs: ["The Contact Us quote form collects a name, email address, phone number, consent and trip details needed to respond. Quote requests are emailed through the site's email delivery provider and are not stored in the website database. Google reCAPTCHA processes verification data when a visitor submits a quote form. Reservation links open a separate platform; review its privacy notice for information about its data processing."] },
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
      { heading: "Optional technologies", paragraphs: ["Analytics and advertising technologies are not configured in the current project. Google reCAPTCHA is used to protect the Contact Us quote form and may process browser or device data under Google's policies. Reservation links open a separate platform that may use its own technologies. Review applicable disclosure and consent requirements before launch. Update this policy if other technologies are added."] },
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
      { heading: "Reservations and payments", paragraphs: ["Reservation links on this website open a separate reservation platform. Its booking, payment and service terms apply to activity on that platform. Contact NY Travel Limo for questions about arrangements."] },
      { heading: "Business details to complete", paragraphs: ["Legal business name: [[COMPLETE]]. Governing law and venue: [[BUSINESS/COUNSEL TO COMPLETE]]. Effective date: [[COMPLETE]]. Add any terms specific to use of this website: [[REVIEW AND COMPLETE]]."] },
    ],
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Cookie Policy", href: "/cookie-policy" }],
  },
};
