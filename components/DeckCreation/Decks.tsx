import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import Cards from "./Cards";
import { SendHorizonal, Trash } from "lucide-react";
import { useCardCreationStore } from "@/stores/cardCreationStore";

export default function Decks() {
    const {
        decks,
        handleChangeName,
        handleDeleteDeck,
        handlePublishDeck,
        currentCardKey,
        openCardList,
    } = useCardCreationStore();

    return (
        <ul className="w-full flex flex-col items-center justify-center mx-auto gap-2">
            {decks.map((deck, deckIndex) => (
                <li
                    className="flex flex-col bg-surface-2 rounded-lg p-2"
                    key={deck.id ?? deckIndex}
                >
                    <input
                        type="text"
                        className="font-clash-regular outline-0"
                        value={deck.name}
                        onChange={(e) =>
                            handleChangeName(e.target.value, deckIndex)
                        }
                    />
                    <Cards
                        cards={deck.cards}
                        currentCardKey={currentCardKey}
                        deckIndex={deckIndex}
                        openCardList={openCardList}
                    />
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center font-clash-regular text-sm">
                                <Image
                                    src={elixir}
                                    alt="elixir icon"
                                    width={35}
                                    height={35}
                                    className="w-10 h-auto"
                                />
                                <p>{deck.elixir}</p>
                            </div>
                            <div className="flex items-center font-clash-regular text-sm gap-2">
                                <Image
                                    src={cycle}
                                    alt="cycle icon"
                                    width={25}
                                    height={25}
                                    className="w-5 h-auto"
                                />
                                <p>{deck.cycle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Trash
                                width={35}
                                height={35}
                                className="p-2 bg-surface rounded-md hover:bg-surface/70 transition-bg transition-text duration-300 text-red-400 hover:text-red-600"
                                onClick={() => handleDeleteDeck(deck.id)}
                            />
                            <SendHorizonal
                                width={35}
                                height={35}
                                className="p-2 bg-surface rounded-md hover:bg-surface/70 transition-bg duration-300 text-green-500 hover:text-green-400"
                                onClick={() => handlePublishDeck(deck.id)}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
