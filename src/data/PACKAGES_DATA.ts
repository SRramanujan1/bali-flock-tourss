// ============================================================
// BALI FLOCK TOURS — MASTER PACKAGE & PRICING DATA
// Update prices here — they flow through the whole site
// ============================================================

export const PACKAGES = [
  {
    id: 'boys-trip',
    name: "Boys Trip",
    tagline: "The ultimate lads' Bali adventure",
    holidayStyle: "Boys Trip",
    groupType: "Group of mates",
    duration: "7 Days / 6 Nights",
    pricePerPerson: 0, // TODO: Set price in NZD
    minPeople: 4,
    maxPeople: 30,
    mainImage: "https://static.wixstatic.com/media/b57044_f2d5f7efe01b4828a8e5434d7e56870d~mv2.png",
    description:
      "Pack your crew and get ready for the trip of a lifetime. Bali Flock's Boys Trip is built for groups who want adventure by day and good vibes by night — fully supported, fully sorted.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Settle In",
        description: "Airport pickup and transfer to your accommodation. Free day and night to explore, rest up, or hit the local bars. Tonight is yours.",
        activities: ["Airport pickup & transfer", "Free evening"],
        type: "free",
      },
      {
        day: 2,
        title: "ATV & White Water Rafting",
        description: "8am pickup. Kick things off with an adrenaline-packed ATV ride through Bali's jungle trails, then hit the rapids white water rafting. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["ATV riding", "White water rafting", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 3,
        title: "Free Day",
        description: "Your day, your rules. Sleep in, explore local markets, hire a scooter, or add an optional activity. Swap this for any activity at additional cost.",
        activities: ["Free day", "Optional activity upgrades available"],
        type: "free",
      },
      {
        day: 4,
        title: "Water Sports & Paintball",
        description: "8am pickup. Head to the coast for an epic water sports session — jet ski, banana boat, parasailing and more. Afternoon: paintball battle. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Water sports (jet ski, banana boat, parasailing)", "Paintball", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 5,
        title: "Free Day",
        description: "Another free day to do whatever you want. Beach, temples, markets — or just chill by the pool. Swap for an activity at additional cost.",
        activities: ["Free day", "Optional activity upgrades available"],
        type: "free",
      },
      {
        day: 6,
        title: "Finn's Beach Club",
        description: "8am pickup. The main event. Spend the day at Finn's Beach Club — one of Bali's most iconic venues. VIP experience, drinks, pool, ocean views. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Finn's Beach Club VIP experience", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 7,
        title: "Farewell Massage & Departure",
        description: "Wind down with a traditional Balinese massage before your airport transfer. Safe travels — until next time.",
        activities: ["Balinese massage", "Airport drop-off"],
        type: "departure",
      },
    ],
    inclusions: [
      "All transport throughout the trip",
      "Breakfast & lunch on all activity days",
      "8am pickup / 4–6pm drop-off on activity days",
      "Airport pickup on arrival",
      "Airport drop-off on departure",
      "Bali Flock support throughout",
    ],
  },
  {
    id: 'girls-trip',
    name: "Girls Trip",
    tagline: "Hens, besties & good vibes only",
    holidayStyle: "Girls Trip",
    groupType: "Girls group",
    duration: "7 Days / 6 Nights",
    pricePerPerson: 0, // TODO: Set price in NZD
    minPeople: 4,
    maxPeople: 30,
    mainImage: "https://static.wixstatic.com/media/b57044_8f3c2e1a4d5b6c7e9f0a1b2c3d4e5f6g~mv2.png",
    description:
      "Whether it's a hens party, a girls' getaway, or you just deserve a break — Bali Flock's Girls Trip has you covered. Spa days, swings, beach clubs, and everything in between.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Settle In",
        description: "Airport pickup and transfer to your accommodation. Free day and night — relax, explore, or start celebrating. Tonight is yours.",
        activities: ["Airport pickup & transfer", "Free evening"],
        type: "free",
      },
      {
        day: 2,
        title: "Full Spa Day",
        description: "8am pickup. Pure luxury. Enjoy a full spa day including manicure, pedicure, full body massage, GHD hair wash and blow-dry. Feel amazing. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Manicure & pedicure", "Full body massage", "GHD hair wash & styling", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 3,
        title: "Free Day",
        description: "Your free day. Sleep in, hit the markets, explore Seminyak, or add an optional activity. Swap this for any activity at additional cost.",
        activities: ["Free day", "Optional activity upgrades available"],
        type: "free",
      },
      {
        day: 4,
        title: "Bali Swing + Choose Your Adventure",
        description: "8am pickup. Iconic Bali swing with lunch included. Then pick ONE optional activity: water sports, shopping tour, or ATV riding. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Bali swing (with lunch)", "CHOOSE ONE: Water sports OR Shopping tour OR ATV riding", "Breakfast & lunch included"],
        type: "activity",
        hasChoice: true,
        choices: ["Water sports", "Shopping tour", "ATV riding"],
      },
      {
        day: 5,
        title: "Free Day",
        description: "Another free day. Beach, temples, poolside, or add an optional activity. Totally up to you.",
        activities: ["Free day", "Optional activity upgrades available"],
        type: "free",
      },
      {
        day: 6,
        title: "Finn's Beach Club",
        description: "8am pickup. The highlight. Finn's Beach Club — Bali's ultimate beach club experience. VIP vibes, pool, ocean views, great music. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Finn's Beach Club VIP experience", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 7,
        title: "Farewell Massage & Departure",
        description: "One last Balinese massage before your airport transfer. The perfect send-off.",
        activities: ["Balinese massage", "Airport drop-off"],
        type: "departure",
      },
    ],
    inclusions: [
      "All transport throughout the trip",
      "Breakfast & lunch on all activity days",
      "8am pickup / 4–6pm drop-off on activity days",
      "Airport pickup on arrival",
      "Airport drop-off on departure",
      "Bali Flock support throughout",
    ],
  },
  {
    id: 'family-reunion',
    name: "Family Reunion",
    tagline: "Fun for every generation",
    holidayStyle: "Family",
    groupType: "Families",
    duration: "7 Days / 6 Nights",
    pricePerPerson: 0, // TODO: Set price in NZD
    minPeople: 4,
    maxPeople: 50,
    mainImage: "https://static.wixstatic.com/media/b57044_3e362053ef074c5fa6c3d27ae63df37c~mv2.png",
    description:
      "The perfect family getaway — built for big groups and all ages. Thrilling theme parks, water adventures, and even a child-free afternoon for the adults. Everyone wins.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Free Day",
        description: "Airport pickup and transfer to your accommodation. Settle in, explore, relax. Free day for everyone to get comfortable.",
        activities: ["Airport pickup & transfer", "Free day"],
        type: "free",
      },
      {
        day: 2,
        title: "Water Theme Park",
        description: "8am pickup. A full day at Bali's best water theme park — slides, lazy rivers, wave pools. Kids and adults alike will love it. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Water theme park (full day)", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 3,
        title: "Child-Free Day/Night (Adults)",
        description: "Select your hours and number of children for supervised child care. Adults get a well-deserved break — spa, pool bar, or explore. Arranged in advance, flexible timing.",
        activities: ["Supervised child care (select hours & number of children)", "Adults: free time"],
        type: "special",
        note: "Please specify number of children and preferred hours when booking",
      },
      {
        day: 4,
        title: "Trans Studio Theme Park",
        description: "8am pickup. Full day at Trans Studio Bali — rides, entertainment, and fun for all ages. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Trans Studio Theme Park (full day)", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 5,
        title: "Water Sports Day",
        description: "8am pickup. Family-friendly water sports on Bali's coastline. Banana boat, jet ski (adults), parasailing, and more. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Family water sports", "Banana boat", "Jet ski (adults)", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 6,
        title: "Turtle Island & Snorkelling",
        description: "8am pickup. Boat out to Turtle Island — snorkel with sea turtles, explore the reef, and soak up the ocean. An unforgettable day for the whole family. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Turtle Island visit", "Snorkelling", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 7,
        title: "Departure Day",
        description: "Pack up and head home with memories to last a lifetime. Airport drop-off included.",
        activities: ["Airport drop-off"],
        type: "departure",
      },
    ],
    inclusions: [
      "All transport throughout the trip",
      "Breakfast & lunch on all activity days",
      "8am pickup / 4–6pm drop-off on activity days",
      "Airport pickup on arrival",
      "Airport drop-off on departure",
      "Supervised child care day (Day 3)",
      "Bali Flock support throughout",
    ],
  },
  {
    id: 'couples-retreat',
    name: "Couples Retreat",
    tagline: "Romance, adventure & Bali magic",
    holidayStyle: "Couples",
    groupType: "Couples",
    duration: "7 Days / 6 Nights",
    pricePerPerson: 0, // TODO: Set price in NZD
    minPeople: 2,
    maxPeople: 20,
    mainImage: "https://static.wixstatic.com/media/b57044_d20c708aa6ec4cdb9d761e228ad676a8~mv2.png",
    description:
      "The ultimate couples escape. Adventure, romance, culture, and luxury — all wrapped into 7 unforgettable days in Bali. Whether you're celebrating or just treating yourselves, this is the one.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Romance Begins",
        description: "Airport pickup and transfer to your accommodation. Free day to settle in, explore, and soak up the Bali atmosphere together.",
        activities: ["Airport pickup & transfer", "Free evening for two"],
        type: "free",
      },
      {
        day: 2,
        title: "ATV, Bali Swing & Culture",
        description: "8am pickup. Start with an exhilarating ATV ride through jungle trails, then the iconic Bali Swing with breathtaking views and lunch. Finish with a Balinese temple tour or traditional cultural experience. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["ATV riding", "Bali swing (with lunch)", "Temple tour OR Balinese cultural experience", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 3,
        title: "Couples Spa & Finn's Day Bed",
        description: "8am pickup. A full couples spa day — side-by-side massages, treatments, and total relaxation. Then head to Finn's Beach Club for a private day bed by the ocean. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Couples spa experience", "Finn's Beach Club day bed", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 4,
        title: "Nusa Penida Island Tour",
        description: "8am pickup. Full day island tour of Nusa Penida — one of Bali's most stunning islands. Kelingking Beach, Angel's Billabong, Broken Beach and more. Breathtaking scenery. Breakfast and lunch included. Drop-off 4–6pm.",
        activities: ["Nusa Penida full day tour", "Kelingking Beach", "Angel's Billabong", "Broken Beach", "Breakfast & lunch included"],
        type: "activity",
      },
      {
        day: 5,
        title: "Ubud Escape — Night 1",
        description: "Transfer to beautiful Ubud — Bali's cultural heart. Check into stunning couples accommodation surrounded by rice terraces and jungle. Explore at your own pace.",
        activities: ["Transfer to Ubud", "Couples accommodation (night 1)", "Free afternoon & evening"],
        type: "special",
      },
      {
        day: 6,
        title: "Ubud Escape — Night 2",
        description: "Another full day in Ubud. Visit rice terraces, art galleries, the Sacred Monkey Forest, or simply enjoy your beautiful surroundings. Second night in couples accommodation.",
        activities: ["Free day in Ubud", "Couples accommodation (night 2)", "Optional: rice terraces, monkey forest, art galleries"],
        type: "special",
      },
      {
        day: 7,
        title: "Farewell Massage & Departure",
        description: "Transfer back from Ubud. Enjoy a final Balinese couples massage before your airport drop-off. The perfect end to a perfect trip.",
        activities: ["Transfer from Ubud", "Couples Balinese massage", "Airport drop-off"],
        type: "departure",
      },
    ],
    inclusions: [
      "All transport throughout the trip",
      "Breakfast & lunch on all activity days",
      "8am pickup / 4–6pm drop-off on activity days",
      "Airport pickup on arrival",
      "Airport drop-off on departure",
      "2 nights Ubud couples accommodation",
      "Bali Flock support throughout",
    ],
  },
];

export const ACTIVITIES = [
  { id: 'atv', name: 'ATV Riding', category: 'outdoors', duration: '3 hours', pricePerPerson: 0, description: 'Ride through jungle trails and rice paddies on an ATV' },
  { id: 'rafting', name: 'White Water Rafting', category: 'outdoors', duration: '3 hours', pricePerPerson: 0, description: 'Navigate Bali\'s famous Ayung River rapids' },
  { id: 'watersports', name: 'Water Sports', category: 'watersport', duration: '3 hours', pricePerPerson: 0, description: 'Jet ski, banana boat, parasailing & more' },
  { id: 'paintball', name: 'Paintball', category: 'outdoors', duration: '2 hours', pricePerPerson: 0, description: 'Competitive paintball battle with your group' },
  { id: 'bali-swing', name: 'Bali Swing', category: 'outdoors', duration: '2 hours', pricePerPerson: 0, description: 'Iconic Bali swing with stunning jungle backdrop & lunch' },
  { id: 'finns', name: "Finn's Beach Club", category: 'nightlife', duration: 'Full day', pricePerPerson: 0, description: "Bali's most iconic beach club — VIP day experience" },
  { id: 'spa', name: 'Spa Day', category: 'indoors', duration: 'Full day', pricePerPerson: 0, description: 'Full spa experience including massage, mani-pedi & hair' },
  { id: 'nusa-penida', name: 'Nusa Penida Island Tour', category: 'explore', duration: 'Full day', pricePerPerson: 0, description: "Full day tour of Bali's most stunning island" },
  { id: 'water-park', name: 'Water Theme Park', category: 'outdoors', duration: 'Full day', pricePerPerson: 0, description: 'Slides, wave pools & lazy river — perfect for families' },
  { id: 'trans-studio', name: 'Trans Studio Theme Park', category: 'outdoors', duration: 'Full day', pricePerPerson: 0, description: 'Rides and entertainment for all ages' },
  { id: 'turtle-island', name: 'Turtle Island & Snorkelling', category: 'watersport', duration: 'Full day', pricePerPerson: 0, description: 'Snorkel with sea turtles and explore the reef' },
  { id: 'massage', name: 'Balinese Massage', category: 'indoors', duration: '1.5 hours', pricePerPerson: 0, description: 'Traditional Balinese full body massage' },
  { id: 'temple-tour', name: 'Temple & Cultural Tour', category: 'explore', duration: '3 hours', pricePerPerson: 0, description: 'Visit iconic Balinese temples and learn about local culture' },
  { id: 'shopping', name: 'Shopping Tour', category: 'explore', duration: '3 hours', pricePerPerson: 0, description: 'Guided shopping tour through Bali\'s best markets and boutiques' },
];

export const ADD_ONS = [
  {
    id: 'security',
    name: 'NZ Licensed Security',
    description: 'New Zealand licensed security guard for your group. Around-the-clock support ensuring your group stays safe and on schedule with a fun roll-call system.',
    pricePerDay: 100, // NZD
    accommodationPerDay: 80, // NZD
    foodPerDay: 20, // NZD
    note: 'Price is $100 NZD/day + $80 NZD accommodation/day + flights + $20 NZD food per diems/day',
  },
  {
    id: 'tour-guide',
    name: 'NZ Tour Guide',
    description: 'A New Zealand-based tour guide who keeps your group on the itinerary with a fun roll-call system, ensuring smooth flow and around-the-clock support throughout your holiday.',
    pricePerDay: 100, // NZD
    accommodationPerDay: 80, // NZD
    foodPerDay: 20, // NZD
    note: 'Price is $100 NZD/day + $80 NZD accommodation/day + flights + $20 NZD food per diems/day',
  },
  {
    id: 'scooter-small',
    name: 'Scooter Hire (Small)',
    description: 'Small scooter hire for exploring Bali at your own pace.',
    pricePerDay: 0, // TODO: Set price
    note: 'Price per day, per scooter',
  },
  {
    id: 'scooter-large',
    name: 'Scooter Hire (Large)',
    description: 'Large scooter hire for those who want a bit more power.',
    pricePerDay: 0, // TODO: Set price
    note: 'Price per day, per scooter',
  },
  {
    id: 'tattoo',
    name: 'Tattoo Studio',
    description: 'Book a session at our partner tattoo studio in Bali — take home something permanent from your trip.',
    pricePerDay: 0, // TODO: Set price
    note: 'Price varies by design — contact us for a quote',
  },
];

export const FEES = {
  baliEntryFee: 100, // NZD per person (visa + tourism tax levy)
  depositPerPerson: 1000, // NZD — non-refundable, non-transferable
  activityDayFee: 1000000, // IDR — 1 mil Prady fee per activity day
  fullPaymentWeeksBefore: 6,
};

export const ACCOMMODATION = {
  largGroup: {
    label: '20+ persons',
    options: [
      { name: 'Windom Hotel — Ocean View', description: 'Per room, ocean-facing. Stunning views.', pricePerRoom: 0 },
      { name: 'Windom Hotel — Back View', description: 'Per room, garden/back-facing.', pricePerRoom: 0 },
    ],
  },
  smallGroup: {
    label: 'Under 20 persons',
    options: [
      { name: 'Private Villa', description: 'Sourced via Booking.com / Airbnb. We\'ll find the best option for your group size and budget.', pricePerRoom: 0 },
    ],
  },
};
