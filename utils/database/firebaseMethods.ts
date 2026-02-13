import { User } from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ICustomDeck } from "@/stores/cardCreationStore";

export async function sendDeck(deck: ICustomDeck) {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    await addDoc(collection(db, "decks"), {
        name: deck.name,
        cycle: deck.cycle,
        elixir: deck.elixir,
        cards: deck.cards,
        isPublished: false,
        uid: userId,
    });
}

export async function publishDeck(deckId: string) {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    const docRef = doc(db, "decks", deckId);

    await updateDoc(docRef, {
        isPublished: true,
    });
}

export async function editDeck(deckId: string, deck: ICustomDeck) {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    const docRef = doc(db, "decks", deckId);

    await setDoc(docRef, {
        name: deck.name,
        cycle: deck.cycle,
        elixir: deck.elixir,
        cards: deck.cards,
    });
}
