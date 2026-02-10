const DECKS_BASE = "/decks";
const AUTH_BASE = "/auth";

export const browserRoutes = {
    home: {
        name: "Home",
        link: "/home",
    },
    profile: {
        name: "Profile",
        link: "/profile",
    },
    decks: {
        name: "Decks",
        link: DECKS_BASE,
        creation: {
            name: "Deck Creation",
            link: DECKS_BASE + "/create",
        },
    },
    auth: {
        name: "Auth Page",
        link: AUTH_BASE,
        callback: {
            name: "Auth Callback",
            link: AUTH_BASE + "/callback",
        },
    },
    top: {
        name: "Top Decks",
        link: "/top",
    },
    events: {
        name: "Active Events",
        link: "/events",
    },
} as const;
