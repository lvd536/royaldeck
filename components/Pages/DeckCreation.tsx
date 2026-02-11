"use client";
import { CardResponse } from "@varandas/clash-royale-api/lib/interfaces";
import { useState } from "react";
import emptyCard from "@/public/empyCard.png";
import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";

interface ICustomDeck {
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
    cards: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
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

    return (
        <div className="w-full flex flex-col max-md:px-2 mt-5">
            <ul className="w-full flex flex-col items-center justify-center mx-auto">
                {decks.map((deck, deckIndex) => (
                    <li
                        className="flex flex-col bg-surface-2 rounded-lg p-2"
                        key={deck.id ?? deckIndex}
                    >
                        <h1 className="font-clash-regular">{deck.name}</h1>
                        <ul className="flex items-center justify-center">
                            {Object.entries(deck.cards).map(
                                ([key, valueStr]) => {
                                    const slotIndex = Number(key);
                                    const src =
                                        valueStr && valueStr.length > 0
                                            ? valueStr
                                            : null;

                                    return (
                                        <li
                                            key={`${deckIndex}-${slotIndex}`}
                                            className={`cursor-pointer ${currentCardKey === +key && "animate-pulse"}`}
                                            onClick={() =>
                                                openCardList(
                                                    slotIndex,
                                                    deckIndex,
                                                )
                                            }
                                        >
                                            {src ? (
                                                <Image
                                                    src={src}
                                                    alt={`card-${slotIndex}`}
                                                    width={100}
                                                    height={150}
                                                    className="object-fit mb-2.5"
                                                />
                                            ) : (
                                                <Image
                                                    src={emptyCard}
                                                    width={110}
                                                    height={160}
                                                    alt="empty"
                                                />
                                            )}
                                        </li>
                                    );
                                },
                            )}
                        </ul>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center font-clash-regular text-sm">
                                <Image
                                    src={elixir}
                                    alt="elixir icon"
                                    width={35}
                                    height={35}
                                />
                                <p>{deck.elixir}</p>
                            </div>
                            <div className="flex items-center font-clash-regular text-sm gap-2">
                                <Image
                                    src={cycle}
                                    alt="cycle icon"
                                    width={25}
                                    height={25}
                                />
                                <p>{deck.cycle}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

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
                                        width={50}
                                        height={100}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            handleAddCard(i.iconUrls.medium)
                                        }
                                    />
                                    {i.iconUrls.evolutionMedium && (
                                        <Image
                                            src={i.iconUrls.evolutionMedium}
                                            alt={`card-evo-${i.id}`}
                                            width={50}
                                            height={100}
                                            style={{ cursor: "pointer" }}
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
