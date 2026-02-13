import { User } from "firebase/auth";
import { auth, db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { ICustomDeck } from "@/stores/cardCreationStore";

export async function sendDeck(userId: string | undefined, deck: ICustomDeck) {
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

export async function publishDeck(userId: string | undefined, deckId: string) {
    if (!userId) return;

    const decksRef = doc(db, "decks", deckId);

    await updateDoc(decksRef, {
        isPublished: true,
    });
}

export async function editDeck(
    userId: string | undefined,
    deckId: string,
    deck: ICustomDeck,
) {
    if (!userId) return;

    const decksRef = doc(db, "decks", deckId);

    await setDoc(decksRef, {
        name: deck.name,
        cycle: deck.cycle,
        elixir: deck.elixir,
        cards: deck.cards,
    });
}

export async function getUserDecks(userId: string | undefined) {
    if (!userId) return;

    const decksRef = collection(db, "decks");

    const q = query(decksRef, where("uid", "==", userId));

    const decksQuerySnapshot = await getDocs(q);

    return decksQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as ICustomDeck[];
}

export async function getPublishedDecks(userId: string | undefined) {
    if (!userId) return;

    const decksRef = collection(db, "decks");

    const q = query(decksRef, where("isPublished", "==", true));

    const decksQuerySnapshot = await getDocs(q);

    return decksQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as ICustomDeck[];
}

export async function deleteUserDeck(
    userId: string | undefined,
    deckId: string,
) {
    if (!userId) return;

    const deckRef = doc(db, "decks", deckId);

    await deleteDoc(deckRef);
}
