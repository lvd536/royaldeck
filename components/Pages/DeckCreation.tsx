"use client";
import Image from "next/image";
import Decks from "../DeckCreation/Decks";
import ClashButton from "../ClashButton";
import { useCardCreationStore } from "@/stores/cardCreationStore";
import { CardResponse } from "@varandas/clash-royale-api/lib/interfaces";

interface IProps {
    cards: CardResponse;
}

export default function DeckCreation({ cards }: IProps) {
    const {
        handleAddDeck,
        handleRefreshDecks,
        handleAddCard,
        isCardListOpen,
        closeCardList,
    } = useCardCreationStore();

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
            <Decks />
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
                                            handleAddCard(
                                                cards,
                                                i.iconUrls.medium,
                                            )
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
                                                    cards,
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
