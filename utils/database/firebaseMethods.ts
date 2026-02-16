import { db } from "./firebase";
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
        isPublished: deck.isPublished,
        uid: userId,
    });
}

export async function publishDeck(deckId: string, description: string) {
    const decksRef = doc(db, "decks", deckId);

    await updateDoc(decksRef, {
        isPublished: true,
        description,
    });
}

export async function editDeck(deckId: string, deck: ICustomDeck) {
    const decksRef = doc(db, "decks", deckId);

    await setDoc(decksRef, {
        name: deck.name,
        cycle: deck.cycle,
        elixir: deck.elixir,
        cards: deck.cards,
        isPublished: deck.isPublished,
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

export async function getUnPublishedDecks(userId: string | undefined) {
    if (!userId) return;

    const decksRef = collection(db, "decks");

    const q = query(
        decksRef,
        where("isPublished", "!=", true),
        where("uid", "==", userId),
    );

    const decksQuerySnapshot = await getDocs(q);

    return decksQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as ICustomDeck[];
}

export async function deleteUserDeck(deckId: string) {
    const deckRef = doc(db, "decks", deckId);

    await deleteDoc(deckRef);
}
