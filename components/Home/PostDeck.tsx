"use client";
import { Plus, X, SendHorizonal } from "lucide-react";
import Deck from "../Decks/Deck";
import { useState } from "react";
import { publishDeck } from "@/utils/database/firebaseMethods";
import { ICustomDeck } from "@/types/interfaces";

interface IProps {
    decks?: ICustomDeck[] | null;
}

export default function PostDeck({ decks }: IProps) {
    const [selectedDeck, setSelectedDeck] = useState<ICustomDeck | null>(null);
    const [selectedDeckIndex, setSelectedDeckIndex] = useState<number | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");

    if (!decks) return null;

    const handleAddDeck = (deck: ICustomDeck, deckIndex: number) => {
        setSelectedDeck(deck);
        setSelectedDeckIndex(deckIndex);
        setIsModalOpen(false);
    };

    const handleResetDeck = () => {
        setSelectedDeck(null);
        setSelectedDeckIndex(null);
    };

    const handlePublishDeck = () => {
        if (!selectedDeck) return;
        publishDeck(selectedDeck.id, description).then(() =>
            window.location.reload(),
        );
    };

    return (
        <>
            <div className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg">
                <div className="flex gap-1">
                    <input
                        type="text"
                        maxLength={100}
                        className="w-full font-clash-regular max-md:text-[11px] text-sm p-2 rounded-md outline-0 bg-surface"
                        placeholder="Choose your deck, add a comment and share it!"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <X
                        width={35}
                        height={35}
                        className="p-2 bg-surface rounded-md hover:bg-surface/70 transition-bg transition-text duration-300 text-red-400 hover:text-red-600"
                        onClick={handleResetDeck}
                    />
                    <SendHorizonal
                        width={35}
                        height={35}
                        className="p-2 bg-surface rounded-md hover:bg-surface/70 transition-bg transition-text duration-300 text-green-400 hover:text-green-600"
                        onClick={handlePublishDeck}
                    />
                </div>
                {selectedDeck && selectedDeckIndex !== null ? (
                    <Deck
                        deck={selectedDeck}
                        deckIndex={selectedDeckIndex}
                        key={selectedDeck.id ?? selectedDeckIndex}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-30 p-2 bg-surface rounded-lg">
                        <Plus
                            width={35}
                            height={35}
                            className="p-2 rounded-md bg-surface-2 hover:shadow-xs shadow-surface-2 transition-shadow duration-200"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed flex items-center justify-center w-full h-full bg-black/30 z-1">
                    <ul className="flex flex-col gap-2 w-3/4 md:w-1/2 p-2 bg-surface-2 rounded-lg z-2">
                        {decks &&
                            decks.map((deck, deckIndex) => (
                                <Deck
                                    deck={deck}
                                    deckIndex={deckIndex}
                                    onClick={() =>
                                        handleAddDeck(deck, deckIndex)
                                    }
                                    key={deck.id ?? deckIndex}
                                />
                            ))}
                    </ul>
                </div>
            )}
        </>
    );
}
