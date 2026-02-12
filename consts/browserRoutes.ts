const DECKS_BASE = "/decks";
const AUTH_BASE = "/auth";

export const browserRoutes = {
    home: {
        name: "Home",
        link: "/",
    },
    profile: {
        name: "Profile",
        link: "/profile",
    },
    decks: {
        creation: {
            name: "Deck Creation",
            link: DECKS_BASE + "/create",
        },
    },
    auth: {
        name: "Auth Page",
        link: AUTH_BASE,
        emailVerification: {
            name: "Email verification",
            link: AUTH_BASE + "/emailVerification",
        },
    },
} as const;
