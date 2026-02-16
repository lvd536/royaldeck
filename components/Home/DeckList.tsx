"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ICustomDeck } from "@/stores/cardCreationStore";
import { useEffect, useState } from "react";
import Deck from "../Decks/Deck";
import { User } from "firebase/auth";

interface IProps {
    decks?: ICustomDeck[];
    deckCreator?: User | null;
}

export default function DeckList({ decks, deckCreator }: IProps) {
    const [currentDecks, setCurrentDecks] = useState<ICustomDeck[] | null>(
        null,
    );
    const scrollY = useScrollPosition();

    if (!decks) return null;

    useEffect(() => {
        setCurrentDecks(decks.slice(0, 10));
    }, []);

    useEffect(() => {
        if (
            currentDecks &&
            window.screenY * 0.8 < scrollY &&
            decks.length > currentDecks.length
        )
            setCurrentDecks(decks.slice(0, currentDecks.length + 10));
    }, [scrollY]);

    return (
        <ul className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg">
            {currentDecks &&
                currentDecks.map((deck, deckIndex) => (
                    <Deck
                        deck={deck}
                        deckIndex={deckIndex}
                        showCredits
                        key={deck.id ?? deckIndex}
                    />
                ))}
        </ul>
    );
}
