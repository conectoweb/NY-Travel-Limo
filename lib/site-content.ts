export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type DetailPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: ContentSection[];
  recommendedFleet: string[];
};

export const fleetPages: DetailPage[] = [
  {
    slug: "sprinter-van-rental-with-driver-new-york-nyc",
    title: "Sprinter Van Rental with Driver in NYC",
    description:
      "Request a Mercedes-Benz Sprinter van rental in NYC with a driver for airport, business and group trips. Ask about 10- to 14-passenger configurations and Brooklyn pickups.",
    eyebrow: "Featured group transportation",
    intro:
      "Arrange a Sprinter van rental in NYC with a professional driver for airport transfers, business travel, events or group outings. Mercedes-Benz Sprinter configurations for 10 to 14 passengers are a featured option; confirm the exact seating and luggage fit for your itinerary. Brooklyn Sprinter van service can also be discussed when you share your pickup address.",
    sections: [
      {
        heading: "Mercedes Sprinter rental for New York group travel",
        paragraphs: [
          "Keep your travel plans together instead of coordinating several separate rides. Whether you are comparing a passenger van rental in NYC or a Mercedes Sprinter rental in NYC, share how many people are traveling, how much luggage you expect and where you need to go so we can discuss the right vehicle for your itinerary.",
          "A 14-passenger van rental in NYC may suit a group that needs one coordinated pickup or shared trips between venues. Sprinter configurations vary, so confirm passenger and luggage fit when requesting your quote.",
        ],
        bullets: [
          "Airport transportation to and from JFK, LaGuardia and Newark",
          "Corporate meetings, roadshows and business events",
          "Wedding parties, celebrations and private group outings",
          "Cruise terminal transfers and New York sightseeing",
        ],
      },
      {
        heading: "How to plan your Sprinter ride",
        paragraphs: [
          "Share your date, pickup and drop-off addresses, passenger count, luggage needs and any stops. For an hourly itinerary, include the time you expect to need the vehicle. Our team can use those details to help you request transportation that fits the trip.",
        ],
      },
      {
        heading: "Check passenger and luggage fit",
        paragraphs: [
          "Sprinter layouts vary, and the space available for luggage depends on the passenger configuration. Give the team a realistic passenger count and a rough bag count rather than relying on a general seat estimate.",
          "For airport, cruise or event transportation, mention larger cases, equipment or items that need extra room. Confirm the exact vehicle configuration before completing a reservation.",
        ],
        bullets: [
          "Number of adults and children traveling",
          "Suitcases, carry-ons and oversized items",
          "Pickup order for groups coming from different locations",
          "Any mobility or boarding considerations to discuss",
        ],
      },
      {
        heading: "Popular Sprinter itineraries in New York",
        paragraphs: [
          "A van can help a group stay together for airport transfers, corporate schedules, wedding events, cruise terminal trips and private outings. Each itinerary has different timing and loading needs, so share the destinations in order and note any fixed arrival times.",
          "If your day includes several locations, include expected waiting periods and the final drop-off. The reservation team can review the complete request and discuss the transportation plan.",
        ],
      },
    ],
    recommendedFleet: ["suv", "limousine"],
  },
  {
    slug: "luxury-suv-rental-nyc",
    title: "Private SUV Service with Chauffeur in NYC",
    description:
      "Arrange private SUV transportation in New York for airport transfers, business travel, family trips and point-to-point rides.",
    eyebrow: "Private SUV transportation",
    intro:
      "A chauffeur-driven SUV is a comfortable option for private travel around New York. NY Travel Limo can help plan an airport pickup, a business ride or a direct trip across the city. Share your passenger and luggage needs so we can discuss the best fit.",
    sections: [
      {
        heading: "SUV transportation for everyday plans and special trips",
        paragraphs: [
          "Choose a private SUV when you want a dedicated ride for your itinerary, whether that means a direct transfer, a day of meetings or a pickup after a flight. Your chauffeur and pickup plan are arranged around the trip details you provide.",
          "Traveling with a larger party or extra bags? Let us know before booking. We can help compare SUV transportation with a Sprinter van or another vehicle option.",
        ],
        bullets: [
          "Airport pickups and drop-offs",
          "Corporate and executive transportation",
          "Private point-to-point rides",
          "Family travel and special occasions",
        ],
      },
      {
        heading: "Tell us what your trip requires",
        paragraphs: [
          "Include the date and time, addresses, number of passengers, luggage and any timing considerations in your quote request. For an airport ride, provide your flight details and let us know whether you need pickup or drop-off service.",
        ],
      },
      {
        heading: "Plan for passengers, bags and the route",
        paragraphs: [
          "SUV passenger and luggage capacity depends on the specific vehicle and seating setup. Share the number of travelers and bags, including child seats or oversized luggage, so the team can discuss an appropriate option.",
          "A direct airport transfer, business pickup and multi-stop day each require different timing. Include the pickup address, destination and any additional stops when you request a quote.",
        ],
        bullets: [
          "Passenger count and approximate luggage",
          "Flight or appointment timing where relevant",
          "Return-trip details or intermediate stops",
          "Any pickup notes that will help identify the location",
        ],
      },
      {
        heading: "Private SUV transportation for New York trips",
        paragraphs: [
          "An SUV may work for a private airport ride, a family trip or a smaller business itinerary. If your party or luggage needs more room, ask the team to compare SUV and Sprinter van options before finalizing the reservation.",
          "Vehicle availability and configuration can change. Confirm the selected vehicle and the trip arrangements directly with NY Travel Limo.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "limousine"],
  },
  {
    slug: "lincoln-stretch-limo-rental-nyc",
    title: "Chauffeur-Driven Limousine Service in NYC",
    description:
      "Plan limousine transportation in New York for weddings, celebrations, evenings out and other special occasions.",
    eyebrow: "Limousine service for special occasions",
    intro:
      "Make the transportation part of your occasion. NY Travel Limo arranges private limousine service in New York for weddings, celebrations, evenings out and event travel. Tell us the schedule and stops you have in mind so we can help plan the ride.",
    sections: [
      {
        heading: "A polished ride for your event",
        paragraphs: [
          "Whether you need transportation for a couple, a wedding party or guests moving between locations, start with the details that shape the day: pickup times, venue addresses, planned stops and the number of people traveling.",
          "Vehicle availability and seating arrangements can vary. Please confirm the vehicle, passenger count and any special requests with our team before completing your reservation.",
        ],
        bullets: [
          "Wedding-day and reception transportation",
          "Anniversaries, birthdays and milestone celebrations",
          "Proms, formal events and evenings out",
          "Private transportation between venues",
        ],
      },
      {
        heading: "Coordinate the schedule in advance",
        paragraphs: [
          "Share your event date, itinerary and timing when you request a quote. If your plans include multiple pickups or stops, listing them up front helps the team understand the full transportation plan.",
        ],
      },
      {
        heading: "Choose the limousine around the occasion",
        paragraphs: [
          "The right arrangement depends on how many people are traveling, the locations involved and the role transportation plays in your event. Tell the team whether you need a single arrival, transfers between venues or a planned return ride.",
          "Confirm the available vehicle, passenger capacity, pickup times and any service terms before completing your reservation. Do not assume a particular vehicle configuration until it is confirmed.",
        ],
        bullets: [
          "Event date and requested pickup window",
          "Venue and return addresses",
          "Number of passengers for each ride",
          "Stops, waiting periods and special timing notes",
        ],
      },
      {
        heading: "Make event transportation easier to coordinate",
        paragraphs: [
          "For a wedding or celebration, share one ordered schedule with the key addresses and the number of passengers at each pickup. Identify a contact person who can help clarify timing if the plan changes.",
          "If several groups need rides, describe each group separately. The team can review the request and discuss vehicle availability and arrangements for the occasion.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv"],
  },
];

export const servicePages: DetailPage[] = [
  {
    slug: "contact-us",
    title: "Contact NY Travel Limo",
    description:
      "Contact NY Travel Limo to discuss private chauffeur transportation, request a quote or plan your New York itinerary.",
    eyebrow: "We're here to help",
    intro:
      "Have a question about your transportation plans? Contact NY Travel Limo to discuss your itinerary, vehicle options or quote request. Sharing your date, locations, passenger count and travel needs helps our team understand how to assist.",
    sections: [
      {
        heading: "Request a transportation quote",
        paragraphs: [
          "Use the Contact Us quote form to share your trip details, or open our reservation platform to arrange an airport transfer, business itinerary, group trip, wedding or special event.",
        ],
        bullets: [
          "516-256-2892",
          "718-397-1333",
        ],
      },
      {
        heading: "Visit our New York office",
        paragraphs: [
          "NY Travel Limo is located at 358 W 56th St, Suite 4D, New York, NY 10019. Please contact us before visiting to confirm arrangements.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "airport-transportation-services-in-nyc-with-professional-chauffeurs",
    title: "Airport Transportation in NYC",
    description:
      "Arrange NYC airport transportation to or from JFK, LaGuardia or Newark with a private chauffeur. Share your flight, pickup, destination and luggage details.",
    eyebrow: "Airport transfers",
    intro:
      "Plan private airport transportation in NYC to or from JFK, LaGuardia and Newark. NY Travel Limo helps individuals, families, business travelers and groups organize a New York airport transportation service around flight details, pickup locations, passengers and luggage.",
    sections: [
      {
        heading: "Airport rides planned around your trip",
        paragraphs: [
          "Tell us which airport you are using, where you are going, when you need the ride and how many people and bags are traveling. For arrivals, include your flight information and preferred pickup details in your request.",
          "Traveling with a group or extra luggage? A Sprinter van may be a convenient option. SUV and limousine transportation are also available for different trip needs; ask our team to help you compare.",
        ],
        bullets: ["John F. Kennedy International Airport (JFK)", "LaGuardia Airport (LGA)", "Newark Liberty International Airport (EWR)"],
      },
      {
        heading: "What to include in your quote request",
        paragraphs: [
          "Provide your travel date, flight details, pickup and destination addresses, passenger count and luggage needs. Add any child-seat request or additional stop so the team can review your full itinerary.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "corporate-transportation-service-with-driver-in-new-york",
    title: "Corporate Transportation NYC",
    description:
      "Plan corporate transportation in New York for executives, meetings, airport transfers, company events and visiting teams with a private chauffeur service.",
    eyebrow: "Business travel",
    intro:
      "NY Travel Limo arranges corporate transportation in New York for executives, employees, clients and visiting teams. Use a corporate car service in NYC for an airport transfer, executive transportation, a business meeting or a multi-stop company itinerary.",
    sections: [
      {
        heading: "Transportation that follows your business itinerary",
        paragraphs: [
          "Plan a direct transfer between the airport, hotel and office, or share a schedule with multiple meetings and event locations. Let us know whether you need a one-way ride, a return trip or a vehicle for a longer period.",
          "For a team traveling together, consider a Sprinter van. SUVs and limousines can suit other executive, client or event transportation needs.",
        ],
        bullets: ["Airport and hotel transfers", "Meetings and client transportation", "Corporate events and group travel", "Multi-stop business itineraries"],
      },
      {
        heading: "Make the request easy to coordinate",
        paragraphs: [
          "Include dates, pickup times, addresses, passenger count and a contact person for the itinerary. If your schedule may change or includes several stops, provide as much detail as possible when requesting a quote.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "roadshow-transportation-nyc",
    title: "Roadshow Transportation NYC",
    description:
      "Coordinate roadshow transportation in New York for investor meetings and multi-stop business schedules with a private chauffeur and an itinerary-led request.",
    eyebrow: "Corporate roadshows",
    intro:
      "Plan corporate roadshow transportation in NYC around investor meetings, addresses and arrival times. Share your full schedule to discuss executive roadshow transportation in New York and vehicle options for the traveling team.",
    sections: [
      {
        heading: "Keep a multi-stop itinerary organized",
        paragraphs: [
          "Share the full meeting schedule, including addresses, appointment times and expected wait periods. This gives the team a clear picture of the day, rather than only the first and last stop.",
          "Choose a vehicle based on who is traveling and the shape of your schedule. Sprinter vans can accommodate group itineraries; SUVs and limousines offer additional private transportation options.",
        ],
      },
      {
        heading: "Roadshow details to have ready",
        paragraphs: [
          "Before requesting a quote, gather the travel dates, passenger count, pickup location, meeting addresses and any timing requirements. If there is a preferred contact for day-of coordination, include those details in your reservation request.",
        ],
        bullets: ["Meeting locations in itinerary order", "Pickup time and anticipated duration", "Passenger and luggage details", "Any requested stops or schedule notes"],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "cruise-terminal-transportation-services-in-new-york-with-driver",
    title: "Cruise Terminal Transportation NYC",
    description:
      "Arrange private cruise port transportation in NYC between Manhattan Cruise Terminal, airports, hotels and your destination. Share your sailing and luggage details.",
    eyebrow: "Cruise transfers",
    intro:
      "Plan cruise terminal transportation in NYC between your home, hotel, airport and Manhattan Cruise Terminal. NY Travel Limo helps individuals, families and groups coordinate private cruise transportation in New York with the sailing, pickup and luggage details in one itinerary.",
    sections: [
      {
        heading: "Connect your cruise plans",
        paragraphs: [
          "Tell us your terminal, sailing date, preferred pickup time and where you are coming from or going next. If you are traveling with several people or multiple suitcases, include that information so we can discuss a suitable vehicle.",
          "Sprinter vans are a featured option for groups. SUVs and limousines are also available to consider depending on your party and itinerary.",
        ],
        bullets: ["Hotel-to-terminal transfers", "Airport-to-terminal transportation", "Terminal pickups after your cruise", "Group and family travel"],
      },
      {
        heading: "Plan for a smooth pickup",
        paragraphs: [
          "Share your cruise line, terminal information, passenger count, luggage needs and any timing instructions in your quote request. Pickup arrangements can depend on terminal procedures, so confirm the meeting details with the team before travel day.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans",
    title: "Wedding Transportation NYC",
    description:
      "Plan NYC wedding transportation for couples, wedding parties and guests between ceremony, reception, hotel and photo locations with chauffeur-driven vehicles.",
    eyebrow: "Weddings and celebrations",
    intro:
      "Arrange a wedding transportation service in New York around the ceremony, photo locations, reception and hotel. NY Travel Limo helps couples and planners coordinate private wedding transportation in NYC, from a limousine arrival to Sprinter van transportation for groups.",
    sections: [
      {
        heading: "Plan rides for the whole wedding day",
        paragraphs: [
          "Start with a list of who needs transportation, when each group should be picked up and where they need to go. Include any gap between the ceremony and reception, photo stops or late-night return trips.",
          "A Sprinter van can be useful for moving a group together, while SUVs and limousines offer other options for couples, families and special arrivals. Confirm the vehicle and passenger arrangements for each part of the day.",
        ],
        bullets: ["Couple and wedding party transportation", "Guest shuttles between selected locations", "Hotel and venue transfers", "Limousine transportation for a special occasion"],
      },
      {
        heading: "Share the schedule before the big day",
        paragraphs: [
          "Send the wedding date, venue addresses, pickup list, estimated times and passenger counts when requesting a quote. A clear itinerary helps everyone understand the transportation plan.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "transportation-by-hours-in-new-york",
    title: "Hourly Transportation NYC",
    description:
      "Request hourly car service in NYC for meetings, events, shopping, sightseeing and multi-stop plans with a chauffeur by the hour in New York.",
    eyebrow: "Hourly transportation",
    intro:
      "When your plans include several stops, hourly chauffeur service in New York can organize transportation around a broader itinerary. Share the start time, expected duration and destinations to discuss private transportation by the hour in NYC.",
    sections: [
      {
        heading: "A flexible option for a day in the city",
        paragraphs: [
          "Hourly service may suit a day of business meetings, an event schedule, shopping or private sightseeing. Share the expected start time, trip duration and destinations so the team can review the plan with you.",
          "Choose among Sprinter vans, SUVs and limousines according to your group size, occasion and preferences. Vehicle availability and booking terms should be confirmed as part of your quote.",
        ],
      },
      {
        heading: "Build your itinerary",
        paragraphs: [
          "Include the pickup address, estimated hours, stops in order, passenger count and any return-time needs. If you are unsure how long the schedule will take, explain your plans when you request a quote.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "new-york-city-tour-with-professional-chauffeurs",
    title: "Private City Tour NYC with a Chauffeur",
    description:
      "Plan a private sightseeing tour in NYC with a driver between your chosen New York landmarks, neighborhoods, museums, dining and shopping stops.",
    eyebrow: "Explore New York",
    intro:
      "Plan a private city tour in NYC with chauffeur transportation between the landmarks, neighborhoods and stops you want to visit. Share your route and available time to discuss a New York private sightseeing tour.",
    sections: [
      {
        heading: "Choose the stops that matter to you",
        paragraphs: [
          "A private ride lets you organize your day around your preferred locations and timing. Share your starting point, destinations, expected duration and any stops where you would like time to explore.",
          "Traveling with family or a group? A Sprinter van may suit a shared itinerary. SUVs and limousines are additional options for private sightseeing transportation.",
        ],
        bullets: ["Manhattan landmarks and neighborhoods", "Museum, dining and shopping stops", "Private group sightseeing", "Custom pickup and drop-off plans"],
      },
      {
        heading: "What to include when you book",
        paragraphs: [
          "Provide your date, pickup location, approximate duration, passenger count and the places you want to visit. The quote request is the right time to discuss timing, wait periods and the vehicle that best fits your day.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "point-to-point-transportation-service-in-new-york",
    title: "Point-to-Point Transportation NYC",
    description:
      "Arrange point-to-point car service in NYC between your chosen pickup and destination, with a private chauffeur for direct New York trips.",
    eyebrow: "Direct private rides",
    intro:
      "For a direct trip from one address to another, request private point-to-point transportation in New York. Share your pickup and destination to discuss a point-to-point chauffeur ride in NYC.",
    sections: [
      {
        heading: "A ride from your pickup to your destination",
        paragraphs: [
          "Point-to-point service can work for airport transfers, hotel and venue rides, business appointments or a private trip across the city. Add any extra stops to your request so the itinerary reflects the ride you need.",
          "For a larger party, ask about a Sprinter van. SUVs and limousines are also available options depending on the trip and occasion.",
        ],
      },
      {
        heading: "Provide clear trip details",
        paragraphs: [
          "Include the travel date and time, complete pickup and drop-off addresses, passenger count, luggage needs and any special instructions. This helps the team review your request and prepare a quote.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "wine-tours-transportation-service-from-new-york",
    title: "Wine Tour Transportation from NYC",
    description:
      "Plan private wine tour transportation from NYC to Long Island wineries, with your pickup, tasting stops, group size and return itinerary.",
    eyebrow: "Wine tour transportation",
    intro:
      "Plan private wine tour transportation from NYC to Long Island wineries or other destinations. Share your stops, travel date, passenger count and expected schedule to discuss winery transportation with a driver.",
    sections: [
      {
        heading: "Plan the route before your wine tour",
        paragraphs: [
          "List the wineries or other destinations you plan to visit, along with pickup and return locations. If you are still building the itinerary, provide the places and timing you know so far.",
          "A Sprinter van is a featured option for group transportation. SUVs and limousines may also be considered depending on your party size and occasion; confirm availability and fit when requesting a quote.",
        ],
        bullets: [
          "Pickup and return to New York",
          "A planned route with multiple stops",
          "Group transportation for a private outing",
          "Vehicle selection based on passengers and luggage",
        ],
      },
      {
        heading: "Details to include in your request",
        paragraphs: [
          "Provide the date, pickup address, destinations, estimated duration, passenger count and any timing requirements. Confirm all arrangements and the return plan with the reservation team before travel.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
  {
    slug: "group-transportation-in-new-york-near-me",
    title: "Group Transportation NYC",
    description:
      "Plan private group transportation in NYC for airport trips, events, business schedules, cruise transfers and tours, with Sprinter vans featured for groups.",
    eyebrow: "Group transportation",
    intro:
      "Arrange private group transportation in NYC for airport trips, events, business schedules, tours or private outings. Share your itinerary and party details to discuss a Sprinter van, SUV or limousine for group travel in New York.",
    sections: [
      {
        heading: "One transportation plan for your group",
        paragraphs: [
          "Group trips can include several pickups, luggage and fixed arrival times. Share the complete schedule and passenger count so the team can review the trip as a whole.",
          "Sprinter vans are a featured option for group transportation. Passenger and luggage configurations vary, so confirm that the available vehicle suits your group before completing a reservation.",
        ],
        bullets: [
          "Airport and cruise terminal transfers",
          "Corporate meetings and events",
          "Wedding parties and celebrations",
          "Private sightseeing and group outings",
        ],
      },
      {
        heading: "Share the details that shape the ride",
        paragraphs: [
          "Include the travel date, pickup and drop-off addresses, number of passengers, luggage needs, stops and timing. If your plans include multiple vehicles or pickup locations, describe each one in your request.",
        ],
      },
    ],
    recommendedFleet: ["sprinter", "suv", "limousine"],
  },
];

export const detailPages = [...fleetPages, ...servicePages];

export const fleetOptions = [
  {
    key: "sprinter",
    title: "Mercedes-Benz Sprinter Vans",
    description:
      "Our featured group option, with Sprinter configurations for 10 to 14 passengers. Confirm the exact seating and luggage fit for your itinerary.",
    href: "/sprinter-van-rental-with-driver-new-york-nyc",
  },
  {
    key: "suv",
    title: "Private SUVs",
    description:
      "A private chauffeur-driven option for airport trips, business travel, families and point-to-point rides.",
    href: "/luxury-suv-rental-nyc",
  },
  {
    key: "limousine",
    title: "Limousines",
    description:
      "A special-occasion ride for weddings, celebrations, evenings out and event transportation.",
    href: "/lincoln-stretch-limo-rental-nyc",
  },
] as const;

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  intro: string;
  sections: ContentSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "choosing-between-a-sprinter-van-suv-and-limousine",
    title: "Sprinter Van, SUV or Limousine: Which Ride Fits Your NYC Trip?",
    description:
      "Compare Sprinter vans, SUVs and limousines for New York airport trips, group travel, business schedules and special occasions.",
    category: "Choosing a vehicle",
    updated: "2026-10-22",
    intro:
      "The right vehicle depends on who is traveling, how much luggage you have and what the day looks like. Here is a simple way to compare a Sprinter van, SUV and limousine before requesting a quote.",
    sections: [
      {
        heading: "Choose a Sprinter van for group travel",
        paragraphs: [
          "A chauffeur-driven Mercedes-Benz Sprinter van is a strong option to consider when several people need to travel together. It can make coordination easier for airport transfers, business itineraries, weddings, cruise trips and group outings.",
          "Passenger and luggage configurations can differ, so share your group size and bag count before confirming a vehicle.",
        ],
      },
      {
        heading: "Choose an SUV for a private ride",
        paragraphs: [
          "An SUV may suit a traveler, couple or family looking for private transportation between an airport, hotel, meeting or event. Let the team know how many people and bags are traveling to check that it fits your needs.",
        ],
      },
      {
        heading: "Choose a limousine for a special occasion",
        paragraphs: [
          "A limousine can make sense when the ride is part of a wedding, celebration, formal event or evening out. Share the event schedule, pickup locations and passenger count so the transportation plan matches the occasion.",
        ],
      },
      {
        heading: "Compare the options using your itinerary",
        paragraphs: [
          "Before you decide, write down your passenger count, luggage, stops and timing. If you are still unsure, request a quote and ask about Sprinter vans, SUVs and limousines for the specific trip you are planning.",
        ],
      },
    ],
  },
  {
    slug: "planning-an-airport-transfer-in-new-york",
    title: "How to Plan a Private Airport Transfer in New York",
    description:
      "A practical checklist for planning private transportation to or from JFK, LaGuardia or Newark Airport.",
    category: "Airport travel",
    updated: "2026-10-22",
    intro:
      "A little trip information makes airport transportation easier to arrange. Use this checklist when planning a private ride to or from JFK, LaGuardia or Newark Airport.",
    sections: [
      {
        heading: "Confirm the airport and destination",
        paragraphs: [
          "New York travelers may use JFK, LaGuardia or Newark. Confirm the airport and include the full pickup or drop-off address so your transportation request is clear.",
        ],
      },
      {
        heading: "Share flight and pickup details",
        paragraphs: [
          "For an arrival, include your flight information and explain your preferred pickup plan. If you are departing, provide the flight time and the address where you need to be picked up.",
        ],
      },
      {
        heading: "Account for passengers and bags",
        paragraphs: [
          "Include the number of travelers and approximate luggage needs. Groups may want to consider a Sprinter van; SUVs are another private option. Confirm the vehicle configuration with the provider before booking.",
        ],
      },
      {
        heading: "Request your quote early",
        paragraphs: [
          "Send the travel date, time, locations and any extra stops when requesting a quote. For airport transportation in New York, NY Travel Limo can discuss private chauffeur options for your itinerary.",
        ],
      },
    ],
  },
  {
    slug: "planning-group-transportation-in-nyc",
    title: "A Simple Guide to Planning Group Transportation in NYC",
    description:
      "Plan New York group transportation by considering passenger count, luggage, stops, timing and whether a Sprinter van is right for the trip.",
    category: "Group travel",
    updated: "2026-10-22",
    intro:
      "Group transportation is easier to coordinate when everyone shares a clear plan. Use these steps to organize a ride for a business team, wedding party, family trip or group outing in New York.",
    sections: [
      {
        heading: "Start with your passenger and luggage count",
        paragraphs: [
          "Write down how many people are traveling and how many bags or other items they expect to bring. A Sprinter van is a featured choice for group transportation, but you should confirm the vehicle's passenger and luggage configuration for your specific group.",
        ],
      },
      {
        heading: "List every pickup, stop and destination",
        paragraphs: [
          "Include complete addresses and put multiple stops in the order you expect to visit them. Add any scheduled arrival times, event start times or expected waiting periods.",
        ],
      },
      {
        heading: "Match the vehicle to the occasion",
        paragraphs: [
          "Sprinter vans can help keep a group together. An SUV may be a better fit for a smaller private ride, while a limousine can suit a wedding or celebration. Ask about available options when you request your quote.",
        ],
      },
      {
        heading: "Send the details in one request",
        paragraphs: [
          "Providing a complete itinerary gives the transportation team useful context. Include your date, timing, locations, passenger count and any special requests, then review the proposed plan before you complete your reservation.",
        ],
      },
    ],
  },
];

export function findDetailPage(slug: string) {
  return detailPages.find((page) => page.slug === slug);
}

export function findBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
