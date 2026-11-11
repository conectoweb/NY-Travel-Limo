import type { ContentPageData } from "@/components/ContentPage";

export const marketingPages: Record<string, ContentPageData> = {
  rates: {
    title: "Sprinter Van Rental Rates & Charter Pricing in NYC",
    seoTitle: "NYC Private Transportation Rates & Quotes | NY Travel Limo",
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
    title: "Over 26 Years of Dedicated Chauffeur Service in NYC",
    seoTitle: "About NY Travel Limo | Private Transportation Company",
    description: "Get to know NY Travel Limo, with more than 26 years of transportation experience serving New York and surrounding areas.",
    eyebrow: "Over 26 years of transportation experience",
    intro: "For more than 26 years, NY Travel Limo has provided private luxury transportation and professional chauffeur service throughout New York City, Long Island, Westchester, and New Jersey. From seamless airport transfers and executive corporate roadshows to elegant weddings and coordinated group charters, our mission is to deliver dependable, discreet, and stress-free travel planned around your itinerary.",
    sections: [
      {
        heading: "26+ years of New York chauffeured transportation experience",
        paragraphs: [
          "Navigating New York travel requires more than just premium vehicles—it demands local street expertise, real-time traffic intelligence, and an uncompromising commitment to punctuality. Since our founding, NY Travel Limo has served corporate executives, global delegations, event coordinators, and private families navigating the complexities of NYC transit.",
          "Our chauffeurs understand the intricacies of terminal layouts at JFK, LaGuardia, and Newark, the timing demands of Wall Street financial roadshows, and the logistics of moving wedding parties between Manhattan churches, photo locations, and reception ballrooms.",
        ],
        bullets: [
          "TLC-licensed, background-checked professional chauffeurs in formal executive attire",
          "Port Authority airport permits and commercial livery insurance coverage",
          "Automated real-time flight tracking for all incoming domestic and international flights",
          "24/7 reservation desk and live dispatch support for dynamic schedule changes",
        ],
      },
      {
        heading: "A luxury fleet tailored to every passenger and luggage requirement",
        paragraphs: [
          "We operate a meticulously maintained, modern fleet including high-roof [Mercedes-Benz Sprinter vans](/sprinter-van-rental-with-driver-new-york-nyc) (10 to 14 passengers with dedicated rear luggage hold), executive [luxury SUVs](/luxury-suv-rental-nyc) (up to 6 passengers with spacious luggage capacity), and elegant [Lincoln stretch limousines](/lincoln-stretch-limo-rental-nyc) for formal celebrations.",
          "Every vehicle is fully detailed, sanitized, and inspected prior to dispatch, featuring climate control, leather upholstery, mobile device charging ports, and complimentary bottled water.",
        ],
        bullets: [
          "14-Passenger Sprinters: High-roof walk-in height, individual seats, dedicated cargo compartment",
          "Executive Luxury SUVs: Cadillac Escalade and Suburban models with tinted privacy glass",
          "Lincoln Stretch Limousines: J-seating lounge, fiber-optic star ceiling, and interior bar console",
        ],
      },
      {
        heading: "Service coverage across the New York Tri-State area",
        paragraphs: [
          "NY Travel Limo provides comprehensive door-to-door transportation across all five New York City boroughs (Manhattan, Brooklyn, Queens, the Bronx, and Staten Island), Long Island (Nassau and Suffolk counties, including the Hamptons and North Fork wine country), Westchester County, and Northern New Jersey (Jersey City, Hoboken, Newark, and corporate campuses).",
          "We offer direct airport transfers to John F. Kennedy International (JFK), LaGuardia (LGA), Newark Liberty (EWR), Teterboro (TEB), and Westchester County (HPN), as well as cruise terminal transfers to the Manhattan Cruise Terminal, Brooklyn Cruise Terminal, and Cape Liberty in Bayonne.",
        ],
      },
      {
        heading: "Our transparent booking and reservation process",
        paragraphs: [
          "We believe in honest, upfront communication from your first inquiry. When you submit a quote request, our dispatch team analyzes your route, timing, and passenger requirements to deliver a transparent, all-inclusive quote without hidden fees.",
          "For point-to-point and airport rides, we recommend reserving 48 to 72 hours in advance. For corporate roadshows, wedding weekends, and peak holiday seasons, we encourage booking 2 to 4 weeks early to guarantee your preferred vehicle configuration.",
        ],
      },
      {
        heading: "Frequently asked questions about NY Travel Limo",
        paragraphs: [
          "**Are your drivers licensed and insured?** Yes, all chauffeurs hold valid licenses with the New York City Taxi & Limousine Commission (TLC) and undergo rigorous background checks and safety training. Every vehicle carries comprehensive commercial livery insurance.",
          "**Do you offer self-drive rentals?** No. NY Travel Limo provides strictly chauffeur-driven private transportation. We do not offer bare rentals or self-drive vehicle leases.",
          "**Can you handle multi-vehicle corporate roadshows or events?** Absolutely. Our dispatch team specializes in synchronizing multi-vehicle fleets consisting of Sprinter vans and luxury SUVs for corporate summits, financial roadshows, and large family weddings.",
          "**How do I receive a quote or confirm a booking?** You can submit your trip details through our [online quote form](/contact-us) or call our 24/7 reservation specialists at +1 (516) 256-2892.",
        ],
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
      { label: "View transportation rates", href: "/rates" },
      { label: "Contact NY Travel Limo", href: "/contact-us" },
    ],
  },
  "frequently-asked-questions": {
    title: "Common Questions About Private Chauffeur Services in NYC",
    seoTitle: "Frequently Asked Questions | NY Travel Limo FAQ",
    description: "Answers to common questions about private chauffeur transportation, airport pickups, fleet capacities, and quote requests in New York.",
    eyebrow: "Helpful information",
    intro: "Find comprehensive, verified answers to common client questions regarding vehicle selection, passenger and luggage capacities, airport transfer protocols, hourly charters, pricing, and reservation policies across New York City and New Jersey.",
    sections: [
      {
        heading: "1. Vehicle Selection, Passenger Count & Luggage Guidance",
        paragraphs: [
          "**How do I choose between a Sprinter van, an SUV, and a limousine?** Choose an [executive luxury SUV](/luxury-suv-rental-nyc) for up to 6 passengers with 4 to 6 suitcases—ideal for solo business travel, couples, and small family airport trips. Choose a [Mercedes-Benz Sprinter van](/sprinter-van-rental-with-driver-new-york-nyc) for groups of 7 to 14 passengers traveling with substantial luggage (10 to 14 bags) or corporate teams. Choose a [Lincoln stretch limousine](/lincoln-stretch-limo-rental-nyc) for formal celebrations, weddings, and galas accommodating up to 8 to 10 guests.",
          "**What happens if our group brings oversized luggage or golf bags?** Please specify any oversized baggage, golf clubs, musical instruments, or sports equipment when requesting your quote so our dispatch team can confirm a vehicle layout with sufficient cargo bay clearance.",
        ],
        bullets: [
          "Mercedes Sprinter Vans: 10 to 14 passengers + 10 to 14 suitcases",
          "Executive Luxury SUVs: 1 to 6 passengers + 4 to 6 suitcases",
          "Lincoln Stretch Limousines: 8 to 10 passengers + 3 to 4 suitcases",
        ],
      },
      {
        heading: "2. Airport Pickups, Flight Tracking & Delay Policies",
        paragraphs: [
          "**How do airport transfers work at JFK, LaGuardia (LGA), and Newark (EWR)?** During booking, provide your airline name and flight number. Our dispatch team tracks your flight in real time using automated telemetry. If your flight arrives early or is delayed, your chauffeur's arrival time is adjusted accordingly.",
          "**Where will my chauffeur meet me at the airport?** We offer both curbside pickup and inside terminal meet-and-greet service. For curbside, your chauffeur contacts you via text once your flight lands, coordinating pickup at the designated passenger pickup area once you collect your bags. For meet-and-greet, your chauffeur awaits you in the arrival hall holding an executive name board.",
        ],
      },
      {
        heading: "3. Service Areas, Hourly Charters & Standby Service",
        paragraphs: [
          "**What regions do you serve?** We provide comprehensive service throughout Manhattan, Brooklyn, Queens, the Bronx, Staten Island, Long Island, Westchester, and New Jersey. We also provide regional charters to Connecticut, Philadelphia, Atlantic City, and upstate New York.",
          "**Can our chauffeur wait on standby during meetings or dinners?** Yes. Our [hourly chauffeur service](/transportation-by-hours-in-new-york) provides a dedicated vehicle and driver on call for your party, allowing unlimited stops, itinerary adjustments, and standby waiting outside offices, restaurants, or event venues.",
        ],
        bullets: [
          "All five NYC boroughs: Manhattan, Brooklyn, Queens, Bronx, Staten Island",
          "Regional airports: JFK, LGA, EWR, TEB, HPN",
          "Tri-State destinations: Long Island, Hamptons, New Jersey, Westchester, Connecticut",
        ],
      },
      {
        heading: "4. Pricing, Tolls, Payments & Billing",
        paragraphs: [
          "**What is included in the quoted price?** Base quotes cover the private vehicle, TLC-licensed chauffeur, and fuel. Major NYC bridge and tunnel tolls, airport access fees, and chauffeur gratuity can be itemized in advance for transparent, all-inclusive corporate billing.",
          "**What payment methods do you accept?** We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure online payment system. Corporate accounts with consolidated monthly invoicing are available upon credit approval.",
        ],
      },
      {
        heading: "5. Booking Lead Times, Changes & Cancellation Policy",
        paragraphs: [
          "**How far in advance should I reserve?** For standard airport transfers and point-to-point rides, booking 48 to 72 hours ahead is recommended. For high-demand periods—such as corporate roadshow seasons, UN Week, major holidays, and weekend weddings—we recommend booking 2 to 4 weeks in advance.",
          "**Can I modify my schedule or add stops after booking?** Yes. You can adjust your itinerary by contacting our 24/7 dispatch desk. Additional stops or extended hours will be billed according to standard hourly rates.",
        ],
      },
      {
        heading: "6. Safety Standards, Child Seats & Onboard Amenities",
        paragraphs: [
          "**Are child safety seats available?** Yes. Age-appropriate infant, toddler, and booster car seats can be installed prior to pickup upon request. Please specify the quantity and seat style in your quote request.",
          "**Are drinks and refreshments allowed in vehicles?** Sealed beverages and light refreshments are permitted. For special celebrations in our stretch limousines, adult passengers (21+) may bring champagne or wine; complimentary glassware and fresh ice are provided in the console.",
        ],
      },
    ],
    links: [
      { label: "Request a quote", href: "/contact-us" },
      { label: "View vehicle fleet", href: "/fleet" },
      { label: "View transportation rates", href: "/rates" },
      { label: "Airport transportation", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
      { label: "Group transportation", href: "/group-transportation-in-new-york-near-me" },
    ],
  },
  "privacy-policy": {
    title: "Client Privacy Policy & Data Protection Practices",
    seoTitle: "Privacy Policy | NY Travel Limo",
    description: "Privacy Policy for NY Travel Limo explaining how we collect, use, and protect your personal information when requesting private transportation services.",
    eyebrow: "Privacy policy",
    intro: "NY Travel Limo operates the https://www.nytravellimo.com/ website, which provides luxury private transportation services, including black car service, Sprinter van rentals, airport transfers, and group transportation in New York City and surrounding areas. This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decides to use our Service.",
    sections: [
      {
        heading: "Information Collection and Use",
        paragraphs: [
          "If you choose to use our Service, then you agree to the collection and use of information in relation to this Privacy Policy. The Personal Information that we collect is used for providing and improving our transportation services. We will not use or share your information with anyone except as described in this Privacy Policy.",
          "The terms used in this Privacy Policy have the same meanings as in our [Terms and Conditions](/terms-and-conditions), which are accessible at [https://www.nytravellimo.com/terms-and-conditions](/terms-and-conditions), unless otherwise defined in this Privacy Policy.",
          "For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to:",
        ],
        bullets: [
          "Full name",
          "Phone number",
          "Email address",
          "Pick-up and drop-off locations",
          "Event details and reservation information",
        ],
      },
      {
        heading: "Purpose of Data Collection",
        paragraphs: [
          "This information is collected through our website forms, email communications, or phone inquiries and is used solely to contact you, process reservations, confirm services, coordinate dispatch, and provide customer support.",
        ],
      },
      {
        heading: "Log Data",
        paragraphs: [
          "We want to inform you that whenever you visit our website, we collect information that your browser sends to us, known as Log Data. This Log Data may include information such as:",
        ],
        bullets: [
          "Your computer's Internet Protocol (IP) address",
          "Browser type and version",
          "Pages of our website that you visit",
          "Time and date of your visit",
          "Time spent on those pages",
          "Other diagnostic statistics",
        ],
      },
      {
        heading: "Use of Log Data",
        paragraphs: [
          "This data is used for website analytics, security monitoring, and improving the performance and functionality of our Service.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the website you visit and are stored on your device's hard drive. NY Travel Limo uses cookies to:",
        ],
        bullets: [
          "Improve user experience",
          "Analyze website traffic",
          "Understand how visitors interact with our website",
        ],
      },
      {
        heading: "Cookie Preferences",
        paragraphs: [
          "You have the option to accept or refuse these cookies using the cookie controls on our site. If you choose to refuse cookies, some portions of our Service may not function properly. For more details, review our [Cookie Policy](/cookie-policy).",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We value your trust in providing us with your Personal Information and strive to use commercially acceptable means of protecting it. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Links to Other Sites",
        paragraphs: [
          "Our website may contain links to other sites (such as our reservation platform). If you click on a third-party link, you will be directed to that site. Please note that these external sites are not operated by NY Travel Limo.",
          "We strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          "Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.",
          "If we discover that a child under 13 has provided us with personal information, we will immediately delete such information from our records. If you are a parent or guardian and believe that your child has provided personal information to us, please contact us so we can take appropriate action.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        paragraphs: [
          "We may update our Privacy Policy from time to time. We advise you to review this page periodically for any changes. Any updates will be posted on this page, and changes are effective immediately after they are posted.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          "If you have any questions or concerns about this Privacy Policy, please contact us:",
        ],
        bullets: [
          "Company: NY Travel Limo",
          "Website: [https://www.nytravellimo.com/](https://www.nytravellimo.com/)",
          "Email: [sales@nytravellimo.com](mailto:sales@nytravellimo.com)",
          "Phone: [+1 (516) 256-2892](tel:5162562892)",
          "Reservations: [Request a Quote](/contact-us)",
          "Location: 358 W 56th St. Suite 4D, New York, NY 10019",
        ],
      },
    ],
    links: [
      { label: "Terms and Conditions", href: "/terms-and-conditions" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Contact NY Travel Limo", href: "/contact-us" },
    ],
  },
  "cookie-policy": {
    title: "Cookie Notice & Website Browsing Preferences",
    seoTitle: "Cookie Policy | NY Travel Limo",
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
    title: "Client Service Agreement & Transportation Policies",
    seoTitle: "Terms and Conditions | NY Travel Limo",
    description: "These terms and conditions outline the rules and regulations for using NY Travel Limo's website and private transportation services.",
    eyebrow: "Terms of use",
    intro: "Welcome to NY Travel Limo. These terms and conditions outline the rules and regulations for the use of NY Travel Limo's website, located at https://www.nytravellimo.com/. By accessing this website, we assume you accept these terms and conditions. Do not continue to use NY Travel Limo if you do not agree to take all of the terms and conditions stated on this page.",
    sections: [
      {
        heading: "Terminology",
        paragraphs: [
          'The following terminology applies to these Terms and Conditions, Privacy Policy, Disclaimer Notice, and all Agreements: "Client", "You", and "Your" refers to you, the person accessing this website and using our services. "The Company", "We", "Our", and "Us" refers to NY Travel Limo. "Party", "Parties", or "Us" refers to both the Client and the Company.',
          "All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of providing our transportation services to the Client in the most appropriate manner, in accordance with and subject to applicable laws of the State of New York and the United States.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We employ the use of cookies. By accessing [https://www.nytravellimo.com/](https://www.nytravellimo.com/), you agree to use cookies in accordance with NY Travel Limo's [Privacy Policy](/privacy-policy).",
          "Cookies are used to enable functionality, improve user experience, and analyze website usage. Some of our partners or service providers may also use cookies.",
        ],
      },
      {
        heading: "License and Intellectual Property",
        paragraphs: [
          "Unless otherwise stated, NY Travel Limo and/or its licensors own the intellectual property rights for all material on [https://www.nytravellimo.com/](https://www.nytravellimo.com/). All intellectual property rights are reserved. You may access this website for your personal use subject to restrictions set in these terms and conditions.",
          "You must not:",
        ],
        bullets: [
          "Republish material from https://www.nytravellimo.com/",
          "Sell, rent, or sub-license material from https://www.nytravellimo.com/",
          "Reproduce, duplicate, or copy material from https://www.nytravellimo.com/",
          "Redistribute content from https://www.nytravellimo.com/",
        ],
      },
      {
        heading: "User Comments and Submissions",
        paragraphs: [
          "Parts of this website may offer users the opportunity to submit information, inquiries, or comments. NY Travel Limo does not pre-screen, edit, or review submissions prior to their presence on the website. Any submitted content reflects the views of the person who submits it and not necessarily the views of NY Travel Limo.",
          "To the extent permitted by applicable law, NY Travel Limo shall not be liable for any content submitted by users or for any damages arising from such submissions. We reserve the right to remove any content that is inappropriate, offensive, or violates these Terms and Conditions.",
          "You warrant that:",
        ],
        bullets: [
          "You have the right to submit the content and have all necessary licenses and consents to do so.",
          "The content does not infringe any intellectual property rights, including copyright, patent, or trademark of any third party.",
          "The content does not contain unlawful, defamatory, libelous, offensive, or otherwise objectionable material.",
          "The content will not be used for unlawful or commercial solicitation purposes.",
        ],
      },
      {
        heading: "License to User Submissions",
        paragraphs: [
          "You grant NY Travel Limo a non-exclusive license to use, reproduce, and edit your submitted content for business and service-related purposes. This Agreement shall begin on the date you access or use the website.",
        ],
      },
      {
        heading: "Hyperlinking to Our Website",
        paragraphs: [
          "The following organizations may link to our Website without prior written approval:",
        ],
        bullets: [
          "Government agencies",
          "Search engines",
          "News organizations",
          "Online directory distributors when linking in the same manner as they hyperlink to other listed businesses",
        ],
      },
      {
        heading: "Approval for Linking and Branding Restrictions",
        paragraphs: [
          "Other organizations may request approval to link to our website. Approval will be granted at our sole discretion.",
          "No use of NY Travel Limo's logo or branding will be allowed for linking purposes without prior written consent.",
        ],
      },
      {
        heading: "iFrames",
        paragraphs: [
          "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
        ],
      },
      {
        heading: "Content Liability",
        paragraphs: [
          "We shall not be held responsible for any content that appears on external websites linking to us. You agree to protect and defend us against all claims arising from your website. No link(s) should appear on any website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.",
        ],
      },
      {
        heading: "Reservation of Rights and Removal of Links",
        paragraphs: [
          "We reserve the right to request removal of any links or any particular link to our website. You agree to immediately remove all links to our website upon request. We also reserve the right to amend these Terms and Conditions at any time. By continuing to use or link to our website, you agree to be bound by the current version of these Terms and Conditions.",
          "If you find any link on our website that you consider offensive, you may contact us. We will consider requests to remove links but are not obligated to do so or to respond to you directly.",
        ],
      },
      {
        heading: "Disclaimer and Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by applicable law, NY Travel Limo excludes all representations, warranties, and conditions relating to the website and the use of this website.",
          "Nothing in this disclaimer will:",
        ],
        bullets: [
          "Limit or exclude liability for death or personal injury resulting from negligence",
          "Limit or exclude liability for fraud or fraudulent misrepresentation",
          "Limit liabilities not permitted under applicable law",
          "Exclude liabilities that may not be excluded under applicable law",
        ],
      },
      {
        heading: "Free Information Provision",
        paragraphs: [
          "As long as the website and information on the website are provided free of charge, NY Travel Limo will not be liable for any loss or damage of any nature.",
        ],
      },
      {
        heading: "Governing Law",
        paragraphs: [
          "These Terms and Conditions shall be governed and interpreted in accordance with the laws of the State of New York and the United States, without regard to conflict of law principles.",
        ],
      },
      {
        heading: "Contact Information",
        paragraphs: [
          "If you have any questions about these Terms and Conditions, please contact us:",
        ],
        bullets: [
          "Company: NY Travel Limo",
          "Website: [https://www.nytravellimo.com/](https://www.nytravellimo.com/)",
          "Email: [sales@nytravellimo.com](mailto:sales@nytravellimo.com)",
          "Phone: [+1 (516) 256-2892](tel:5162562892)",
          "Location: 358 W 56th St. Suite 4D, New York, NY 10019",
        ],
      },
    ],
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Contact NY Travel Limo", href: "/contact-us" },
    ],
  },
};
