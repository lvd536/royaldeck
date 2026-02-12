"use client";
import { CardResponse } from "@varandas/clash-royale-api/lib/interfaces";
import { useState } from "react";
import Image from "next/image";
import Decks from "../DeckCreation/Decks";
import ClashButton from "../ClashButton";

export interface ICustomDeck {
    id: number;
    name: string;
    elixir: number;
    cycle: number;
    cards: Record<number, string>;
}

interface IProps {
    cards: CardResponse;
}

const initialDeck: ICustomDeck = {
    id: 0,
    name: "Deck 0",
    elixir: 0,
    cycle: 0,
    cards: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
};

export default function DeckCreation({ cards }: IProps) {
    const [decks, setDecks] = useState<ICustomDeck[]>([initialDeck]);
    const [currentCardKey, setCurrentCardKey] = useState<number | null>(null);
    const [currentDeckIndex, setCurrentDeckIndex] = useState<number | null>(
        null,
    );
    const [isCardListOpen, setIsCardListOpen] = useState(false);

    if (!cards || !cards.items) {
        return <div>Cards not provided</div>;
    }

    const openCardList = (slotIndex: number, deckIndex: number) => {
        setCurrentCardKey(slotIndex);
        setCurrentDeckIndex(deckIndex);
        setIsCardListOpen(true);
    };

    const closeCardList = () => {
        setIsCardListOpen(false);
        setCurrentCardKey(null);
        setCurrentDeckIndex(null);
    };

    const handleAddCard = (imageUrl: string) => {
        if (currentCardKey === null || currentDeckIndex === null) {
            console.warn("No slot or deck selected");
            return;
        }

        const newDecks = decks.map((d) => ({ ...d, cards: { ...d.cards } }));

        if (currentDeckIndex < 0 || currentDeckIndex >= newDecks.length) {
            console.error("deck index out of range", currentDeckIndex);
            return;
        }

        newDecks[currentDeckIndex].cards[currentCardKey] = imageUrl;

        setDecks(newDecks);

        closeCardList();
    };

    const handleDeleteDeck = (id: number) => {
        if (decks.length > 1) {
            const newDecks = decks.filter((deck) => deck.id !== id);
            setDecks(newDecks);
        } else setDecks([initialDeck]);
    };

    const handleAddDeck = () => {
        const newDeckId = decks.at(-1)!.id + 1;
        const newDecks = [
            ...decks,
            {
                ...initialDeck,
                id: newDeckId,
                name: `Deck ${newDeckId}`,
            },
        ];
        setDecks(newDecks);
    };

    const handleRefreshDecks = () => setDecks([initialDeck]);

    return (
        <div className="w-full flex flex-col max-md:px-2 mt-5">
            <div className="flex font-clash-regular items-center justify-between gap-2 mb-4">
                <ClashButton
                    text="Add deck"
                    variant="green"
                    onClick={handleAddDeck}
                />
                <ClashButton
                    text="Clear decks"
                    variant="red"
                    onClick={handleRefreshDecks}
                />
            </div>
            <Decks
                decks={decks}
                cards={cards}
                currentCardKey={currentCardKey}
                openCardList={openCardList}
                handleDeleteDeck={handleDeleteDeck}
            />
            {isCardListOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={closeCardList}
                        aria-hidden
                    />

                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-2 rounded-t-lg p-4 max-h-1/2 overflow-y-auto">
                        <div className="flex justify-between items-center mb-2">
                            <strong className="font-clash-regular text-sm">
                                Select a card
                            </strong>
                            <button
                                onClick={closeCardList}
                                className="font-clash-regular text-sm"
                            >
                                Close
                            </button>
                        </div>

                        <ul className="flex flex-wrap items-center justify-center gap-2">
                            {cards.items.map((i) => (
                                <li
                                    key={i.id}
                                    className="flex gap-2 items-center"
                                >
                                    <Image
                                        src={i.iconUrls.medium}
                                        alt={`card-${i.id}`}
                                        width={500}
                                        height={1000}
                                        style={{ cursor: "pointer" }}
                                        className="w-20 h-auto"
                                        onClick={() =>
                                            handleAddCard(i.iconUrls.medium)
                                        }
                                    />
                                    {i.iconUrls.evolutionMedium && (
                                        <Image
                                            src={i.iconUrls.evolutionMedium}
                                            alt={`card-evo-${i.id}`}
                                            width={500}
                                            height={1000}
                                            style={{ cursor: "pointer" }}
                                            className="w-20 h-auto"
                                            onClick={() =>
                                                handleAddCard(
                                                    i.iconUrls.evolutionMedium!,
                                                )
                                            }
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
