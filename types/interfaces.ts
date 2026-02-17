export interface IUserRecord {
    uid: string;
    email: string | undefined;
    displayName: string | undefined;
    photoURL: string | undefined;
    emailVerified: boolean;
    phoneNumber: string | undefined;
}

export interface ICustomDeck {
    id: string;
    name: string;
    elixir: number;
    cycle: number;
    cards: Record<number, string>;
    isPublished: boolean;
    description?: string;
    uid?: string;
}
