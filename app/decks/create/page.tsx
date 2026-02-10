import DeckCreation from "@/components/Pages/DeckCreation";
import { cards } from "@/utils/royaleAPI";

export default async function page() {
    return <DeckCreation cards={cards} />;
}
