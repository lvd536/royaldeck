import Image from "next/image";
import NoDecks from "@/public/NoDecks.png";
import { getUserDecks } from "@/utils/database/firebaseMethods";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { cookies } from "next/headers";
import Deck from "@/components/Decks/Deck";

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
                                <Deck
                                    deck={deck}
                                    deckIndex={deckIndex}
                                    controls
                                    key={deck.id ?? deckIndex}
                                />
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
