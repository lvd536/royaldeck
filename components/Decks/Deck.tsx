import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import { ICustomDeck } from "@/stores/cardCreationStore";
import DeckCard from "./DeckCard";
import DeckControls from "./DeckControls";
import { User } from "firebase/auth";

interface IProps {
    deck: ICustomDeck;
    deckIndex: number;
    controls?: boolean;
    currentUser?: User | null;
}

export default function Deck({
    deck,
    deckIndex,
    controls,
    currentUser,
}: IProps) {
    return (
        <li className="flex flex-col bg-surface rounded-lg p-2">
            <h1 className="font-clash-regular text-center">{deck.name}</h1>
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
                <p className="text-xs font-clash-regular p-2 bg-surface-2 rounded-lg mb-2 mx-auto">
                    {deck.description}
                </p>
            )}
            <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center justify-between gap-4">
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
                    {currentUser && (
                        <div className="flex items-center gap-2">
                            {currentUser.photoURL ? (
                                <Image
                                    src={currentUser.photoURL}
                                    alt="user avatar"
                                    width={14}
                                    height={14}
                                    className="w-7 h-7 rounded-full"
                                />
                            ) : (
                                <div className="font-clash-regular flex items-center justify-center p-4 w-7 h-7 rounded-full bg-surface">
                                    {currentUser.email
                                        ?.split("@")[0][0]
                                        .toUpperCase()}
                                </div>
                            )}
                            <h1 className="text-sm font-clash-regular">
                                {currentUser.displayName ??
                                    currentUser.email?.split("@")[0]}
                            </h1>
                        </div>
                    )}
                </div>
                {controls && <DeckControls deckId={deck.id} />}
            </div>
        </li>
    );
}
