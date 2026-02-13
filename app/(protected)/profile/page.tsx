import Image from "next/image";
import emptyCard from "@/public/empyCard.png";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import NoDecks from "@/public/NoDecks.png";
import { deleteUserDeck, getUserDecks } from "@/utils/database/firebaseMethods";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { cookies } from "next/headers";
import { Trash } from "lucide-react";

export default async function page() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("uid")?.value;
    const decks = await getUserDecks(userId);

    return (
        <div className="flex flex-col w-full h-full mt-2 px-[10%] md:px-[20%] gap-2">
            <ProfileHeader />
            <div className="w-full rounded-lg p-2 bg-surface-2">
                {decks ? (
                    <>
                        <h1 className="font-clash-regular">Your decks</h1>
                        <ul className="w-full flex flex-col items-center justify-center mx-auto gap-2">
                            {decks.map((deck, deckIndex) => (
                                <li
                                    className="flex flex-col bg-surface rounded-lg p-2"
                                    key={deck.id ?? deckIndex}
                                >
                                    <h1 className="font-clash-regular">
                                        {deck.name}
                                    </h1>
                                    <ul className="flex items-center justify-center">
                                        {Object.entries(deck.cards).map(
                                            ([key, valueStr]) => {
                                                const slotIndex = Number(key);
                                                const src =
                                                    valueStr &&
                                                    valueStr.length > 0
                                                        ? valueStr
                                                        : null;

                                                return (
                                                    <li
                                                        key={`${deckIndex}-${slotIndex}`}
                                                        className={`cursor-pointer`}
                                                    >
                                                        {src ? (
                                                            <Image
                                                                src={src}
                                                                alt={`card-${slotIndex}`}
                                                                width={500}
                                                                height={1000}
                                                                className="w-[102px] h-auto object-fit mb-3"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={emptyCard}
                                                                width={110}
                                                                height={160}
                                                                alt="empty"
                                                                className="w-[110px] h-auto"
                                                                loading="eager"
                                                            />
                                                        )}
                                                    </li>
                                                );
                                            },
                                        )}
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
                                        <div className="flex items-center gap-4">
                                            <Trash
                                                width={35}
                                                height={35}
                                                className="p-2 bg-surface-2 rounded-md hover:bg-surface-2/70 transition-bg transition-text duration-300 text-red-400 hover:text-red-600"
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <Image
                        src={NoDecks}
                        alt="No decks image"
                        className="rounded-lg"
                    />
                )}
            </div>
        </div>
    );
}
