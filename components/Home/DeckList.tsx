"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ICustomDeck } from "@/stores/cardCreationStore";
import { useEffect, useState } from "react";
import Deck from "../Decks/Deck";
import { auth } from "@/utils/database/firebase";

interface IProps {
    userDecks?: ICustomDeck[];
}

export default function DeckList({ userDecks }: IProps) {
    const [currentDecks, setCurrentDecks] = useState<ICustomDeck[] | null>(
        null,
    );
    const scrollY = useScrollPosition();

    const currentUser = auth.currentUser;

    if (!userDecks) return null;

    useEffect(() => {
        setCurrentDecks(userDecks.slice(0, 10));
    }, []);

    useEffect(() => {
        if (
            currentDecks &&
            window.screenY * 0.8 > scrollY &&
            userDecks.length > currentDecks.length
        )
            setCurrentDecks(userDecks.slice(0, currentDecks.length + 10));
    }, [scrollY]);

    return (
        <ul className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg">
            {currentDecks &&
                currentDecks.map((deck, deckIndex) => (
                    <Deck
                        deck={deck}
                        deckIndex={deckIndex}
                        currentUser={currentUser}
                        key={deck.id ?? deckIndex}
                    />
                ))}
        </ul>
    );
}
