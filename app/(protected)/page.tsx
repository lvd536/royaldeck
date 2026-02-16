import DeckList from "@/components/Home/DeckList";
import PostDeck from "@/components/Home/PostDeck";
import {
    getPublishedDecks,
    getUnPublishedDecks,
} from "@/utils/database/firebaseMethods";
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("uid")?.value;
    const publishedDecks = await getPublishedDecks(userId);
    const userUnPublishedDecks = await getUnPublishedDecks(userId);
    return (
        <div className="flex flex-col w-full items-center mt-2 px-[10%] md:px-[20%] gap-4">
            <PostDeck decks={userUnPublishedDecks} />
            <DeckList decks={publishedDecks} />
        </div>
    );
}
