import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import { ICustomDeck } from "@/stores/cardCreationStore";
import DeckCard from "./DeckCard";
import DeckControls from "./DeckControls";
import CreatorCredits from "./CreatorCredits";

interface IProps {
    deck: ICustomDeck;
    deckIndex: number;
    controls?: boolean;
    showCredits?: boolean;
    onClick?: () => void;
}

export default function Deck({
    deck,
    deckIndex,
    controls,
    showCredits,
    onClick,
}: IProps) {
    return (
        <li
            className="flex flex-col bg-surface rounded-lg p-2"
            onClick={onClick}
        >
            <h1 className="max-md:text-xs font-clash-regular text-center">
                {deck.name}
            </h1>
            <ul className="flex items-center justify-center">
                {Object.entries(deck.cards).map(([key, valueStr]) => {
                    const slotIndex = Number(key);
                    const src =
                        valueStr && valueStr.length > 0 ? valueStr : null;

                    return (
                        <DeckCard
                            slotIndex={slotIndex}
                            src={src}
                            key={`${deckIndex}-${slotIndex}`}
                        />
                    );
                })}
            </ul>
            {deck.description && (
                <p className="max-md:text-[11px] text-xs font-clash-regular p-2 bg-surface-2 rounded-lg mb-2 mx-auto">
                    {deck.description}
                </p>
            )}
            <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center font-clash-regular max-md:text-[11px] text-sm">
                            <Image
                                src={elixir}
                                alt="elixir icon"
                                width={35}
                                height={35}
                                className="max-md:w-7 w-10 h-auto"
                            />
                            <p>{deck.elixir}</p>
                        </div>
                        <div className="flex items-center font-clash-regular max-md:text-[11px] text-sm gap-2">
                            <Image
                                src={cycle}
                                alt="cycle icon"
                                width={25}
                                height={25}
                                className="max-md:w-4 w-5 h-auto"
                            />
                            <p>{deck.cycle}</p>
                        </div>
                    </div>
                    {showCredits && <CreatorCredits creatorId={deck.uid!} />}
                </div>
                {controls && <DeckControls deckId={deck.id} />}
            </div>
        </li>
    );
}
