export const INITIAL_BOOKINGS = [
  {
    id: 'WL-84920',
    packageId: 'pkg-bali',
    packageTitle: 'Bali Island Sanctuary & Cultural Splendor',
    destination: 'Bali, Indonesia',
    travelerName: 'Sarah Johnson',
    email: 'sarah.j@wanderlust.com',
    phone: '+1 (555) 234-8900',
    guestsCount: 2,
    roomsCount: 1,
    travelDates: {
      startDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 12 days from now
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    totalPaidUSD: 3188,
    paymentMethod: 'Credit Card (Visa ending in 4242)',
    paymentDate: '2026-09-08',
    status: 'Confirmed',
    flight: {
      flightNumber: 'SQ-942',
      airline: 'Singapore Airlines',
      route: 'SIN ➔ DPS (Bali)',
      departureTime: '10:15 AM',
      arrivalTime: '01:05 PM',
      terminal: 'Terminal 2',
      gate: 'A14',
      seat: '12A, 12B',
      status: 'On Time'
    },
    hotel: {
      name: 'Uluwatu Sunset Ocean Villa & Spa',
      roomType: 'Panoramic Ocean Suite with Plunge Pool',
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      confirmationCode: 'ULU-98124',
      address: 'Jl. Pantai Suluban No. 88, Uluwatu, Bali'
    },
    transport: {
      provider: 'Wanderlust Chauffeur Services',
      vehicle: 'Executive Mercedes-Benz Van',
      pickupLocation: 'Denpasar DPS International Arrivals Gate B',
      driverName: 'Wayan Sudarma (+62 812-3456-7890)',
      time: '1:30 PM'
    },
    insurance: {
      policyNumber: 'TG-GOLD-94821',
      provider: 'TravelGuard World Elite',
      coverage: '$250,000 Medical & Trip Interruption',
      status: 'Active'
    },
    concierge: {
      name: 'Chloe Davis',
      title: 'Senior Luxury Travel Concierge',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      status: 'Online',
      phone: '+1 (800) 555-WNDR'
    }
  }
];
