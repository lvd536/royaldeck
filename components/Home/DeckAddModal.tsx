import { ICustomDeck } from "@/types/interfaces";
import { X } from "lucide-react";
import Deck from "../Decks/Deck";

interface IProps {
    decks: ICustomDeck[];
    isModalOpen: boolean;
    onClose: () => void;
    handleAddDeck: (deck: ICustomDeck, deckIndex: number) => void;
}

export default function DeckAddModal({
    decks,
    isModalOpen,
    handleAddDeck,
    onClose,
}: IProps) {
    if (!isModalOpen) return null;
    return (
        <div className="fixed flex items-center justify-center w-full h-full bg-black/30 z-1">
            {decks.length >= 1 ? (
                <div className="flex relative w-3/4 md:w-1/2 px-2 py-8 bg-surface-2 rounded-lg z-2 items-center justify-center">
                    <ul className="flex flex-col gap-2">
                        {decks.map((deck, deckIndex) => (
                            <Deck
                                deck={deck}
                                deckIndex={deckIndex}
                                onClick={() => handleAddDeck(deck, deckIndex)}
                                key={deck.id ?? deckIndex}
                            />
                        ))}
                    </ul>
                    <X
                        width={35}
                        height={35}
                        className="absolute right-1 top-1 p-2 text-red-600 hover:text-foreground rounded-md bg-surface/60 hover:shadow-xs shadow-surface transition-[shadow, text] duration-300"
                        onClick={onClose}
                    />
                </div>
            ) : (
                <div className="flex relative max-sm:w-6/7 md:w-2/3 w-1/2 h-60 items-center justify-center text-center text-sm sm:text-lg md:text-xl font-clash-regular text-foreground/75 p-2 bg-surface-2 rounded-lg">
                    <p>
                        There are no decks here yet, but you can create deck
                        now!
                    </p>
                    <X
                        width={35}
                        height={35}
                        className="absolute right-1 top-1 p-2 text-red-600 hover:text-foreground rounded-md bg-surface hover:shadow-xs shadow-surface transition-[shadow, text] duration-300"
                        onClick={onClose}
                    />
                </div>
            )}
        </div>
    );
}
