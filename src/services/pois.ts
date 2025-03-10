import { POI } from "../types/pois";

export const getPOIs = (): POI[] =>  [
    {
        id: 1,
        type: 'hotel',
        name: 'Red Sea Resort',
        lat: 22.8850,
        lang: 39.3295,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CAF50"><path d="M12 2L1 12h3v8h16v-8h3L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>`,
        description: 'A luxury resort with stunning views of the Red Sea, offering a variety of amenities including pools, restaurants, and a spa.',
        bookable: true,
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
        rating: 4.5
    },
    {
        id: 2,
        type: 'hotel',
        name: 'Coral Bay Hotel',
        lat: 22.8821,
        lang: 39.3290,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CAF50"><path d="M12 2L1 12h3v8h16v-8h3L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>`,
        description: 'A family-friendly hotel located near the beach, perfect for a relaxing vacation.',
        bookable: true,
        amenities: ['WiFi', 'Beach Access', 'Family Rooms'],
        rating: 4.0
    },
    {
        id: 3,
        type: 'scuba_diving',
        name: 'Diving Center Red Sea',
        lat: 22.8500,
        lang: 38.3320,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#2196F3"><path d="M12 4a2 2 0 0 1 2 2v1h2v1h-2v2h2v1h-2v1h-2v-1h-2v-1h2v-2h-2V7h2V6a2 2 0 0 1 2-2zm0 2a1 1 0 0 0-1 1v1h2V7a1 1 0 0 0-1-1zm-2 6v1H9v1h1v1h-1v2h6v-2h-1v-1h1v-1h-2zm4 0v1h1v1h-1v1h-2v-1h1v-1h-1v-1h2z"/></svg>`,
        description: 'A professional diving center offering scuba diving courses and excursions to explore the underwater life of the Red Sea.',
        bookable: true,
        services: ['Scuba Diving', 'Snorkeling', 'Equipment Rental'],
        rating: 4.8
    },
    {
        id: 4,
        type: 'airport',
        name: 'Hurghada International Airport',
        lat: 23.1780,
        lang: 40.7995,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#FF9800"><path d="M12 2L2 12h3v6h6v3h3v-3h6v-6h3L12 2zm0 2l8 8h-3v6H10v3h-2v-3H5v-6H2l10-10zm-5 8v2h10v-2H7z"/></svg>`,
        description: 'The main airport serving the Red Sea region, providing international flights to various destinations.',
        bookable: false,
        services: ['Car Rentals', 'Shuttle Services', 'Duty-Free Shopping'],
        terminals: 2
    },
    {
        id: 5,
        type: 'airport',
        name: 'Sharm El Sheikh International Airport',
        lat: 21.9753,
        lang: 38.3940,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#FF9800"><path d="M12 2L2 12h3v6h6v3h3v-3h6v-6h3L12 2zm0 2l8 8h-3v6H10v3h-2v-3H5v-6H2l10-10zm-5 8v2h10v-2H7z"/></svg>`,
        description: 'An international airport located in Sharm El Sheikh, a gateway to the Red Sea resorts.',
        bookable: false,
        services: ['Car Rentals', 'Shuttle Services'],
        terminals: 1
    },
    {
        id: 6,
        type: 'tourist_attraction',
        name: 'Ras Mohammed National Park',
        lat: 22.7480,
        lang: 39.2820,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#9C27B0"><path d="M12 2C8.13 2 5 5.13 5 9c0 4.28 7 11 7 11s7-6.72 7-11c0-3.87-3.13-7-7-7zm0 2a1 1 0 0 0-1 1v1h2V7a1 1 0 0 0-1-1zm-2 6v1H9v1h1v1h-1v2h6v-2h-1v-1h1v-1h-2zm4 0v1h1v1h-1v1h-2v-1h1v-1h-1v-1h2z"/></svg>`,
        description: 'A protected area known for its stunning coral reefs and diverse marine life, ideal for snorkeling and diving.',
        bookable: false,
        entry_fee: 5,
        activities: ['Snorkeling', 'Wildlife Watching']
    }
];