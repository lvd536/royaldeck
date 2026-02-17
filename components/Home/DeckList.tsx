"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect, useState } from "react";
import Deck from "../Decks/Deck";
import { ICustomDeck } from "@/types/interfaces";
import { auth } from "@/lib/firebase";

interface IProps {
    decks?: ICustomDeck[];
}

export default function DeckList({ decks }: IProps) {
    const [currentDecks, setCurrentDecks] = useState<ICustomDeck[] | null>(
        null,
    );

    const scrollY = useScrollPosition();

    const currentUser = auth.currentUser;

    useEffect(() => {
        if (decks) setCurrentDecks(decks.slice(0, 10));
    }, []);

    useEffect(() => {
        if (
            decks &&
            currentDecks &&
            window.screenY * 0.8 < scrollY &&
            decks.length > currentDecks.length
        )
            setCurrentDecks(decks.slice(0, currentDecks.length + 10));
    }, [scrollY]);
    if (!decks || !currentUser) return null;
    return (
        <>
            {decks.length >= 1 ? (
                <ul className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg">
                    {currentDecks &&
                        currentDecks.map((deck, deckIndex) => (
                            <Deck
                                deck={deck}
                                deckIndex={deckIndex}
                                showCredits
                                canLike={deck.uid !== currentUser.uid}
                                uid={currentUser.uid}
                                key={deck.id ?? deckIndex}
                            />
                        ))}
                </ul>
            ) : (
                <div className="flex w-full h-60 items-center justify-center text-center text-md sm:text-xl md:text-2xl font-clash-regular rounded-lg bg-surface-2 text-foreground/75 p-2">
                    There are no decks here yet, but you can already publish
                    yours!
                </div>
            )}
        </>
    );
}
