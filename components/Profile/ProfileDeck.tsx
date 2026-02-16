import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import { Trash } from "lucide-react";
import { ICustomDeck } from "@/stores/cardCreationStore";
import ProfileDeckCard from "./ProfileDeckCard";
import ProfileDeckControls from "./ProfileDeckControls";

interface IProps {
    deck: ICustomDeck;
    deckIndex: number;
}

export default function ProfileDeck({ deck, deckIndex }: IProps) {
    return (
        <li className="flex flex-col bg-surface rounded-lg p-2">
            <h1 className="font-clash-regular">{deck.name}</h1>
            <ul className="flex items-center justify-center">
                {Object.entries(deck.cards).map(([key, valueStr]) => {
                    const slotIndex = Number(key);
                    const src =
                        valueStr && valueStr.length > 0 ? valueStr : null;

                    return (
                        <ProfileDeckCard
                            slotIndex={slotIndex}
                            src={src}
                            key={`${deckIndex}-${slotIndex}`}
                        />
                    );
                })}
            </ul>
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
                <ProfileDeckControls deckId={deck.id} />
            </div>
        </li>
    );
}
