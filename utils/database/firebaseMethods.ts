import { ICustomDeck, IDeckLike } from "@/types/interfaces";
import { db } from "../../lib/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";

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

export async function getDeckCreatorData(uid: string) {
    const userDoc = await getDoc(
        doc(db, "users", "feQe7aNRCfhrTLH5tYnja9OXeui1"),
    );

    return userDoc.data();
}

export async function getUserLikes(userId: string | undefined) {
    if (!userId) return;

    const likesRef = collection(db, "likes");

    const q = query(likesRef, where("uid", "==", userId));

    const userLikesQuerySnapshot = await getDocs(q);

    return userLikesQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as IDeckLike[];
}

export async function getDeckLikes(deckId: string | undefined) {
    const likesRef = collection(db, "likes");

    const q = query(likesRef, where("deckId", "==", deckId));

    const deckLikesQuerySnapshot = await getDocs(q);

    return deckLikesQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as IDeckLike[];
}

export async function likeDeck(uid: string, deckId: string) {
    const likesRef = collection(db, "likes");

    const likesQuerySnapshot = await getDeckLikeId(uid, deckId);

    if (likesQuerySnapshot.empty) {
        const like = await addDoc(likesRef, {
            uid,
            deckId,
        });
        if (like.id) return Promise.resolve(like.id);
        else return Promise.reject(null);
    }
    return Promise.reject(null);
}
export async function unlikeDeck(likeId: string) {
    const likeDoc = doc(db, "likes", likeId);
    await deleteDoc(likeDoc);
}
export async function getDeckLikeId(uid: string, deckId: string) {
    const likesRef = collection(db, "likes");

    const q = query(
        likesRef,
        where("uid", "==", uid),
        where("deckId", "==", deckId),
    );
    return await getDocs(q);
}

export async function getDeckLikesCount(deckId: string) {
    const likesRef = collection(db, "likes");

    const q = query(likesRef, where("deckId", "==", deckId));

    const deckLikesQuerySnapshot = await getDocs(q);

    return deckLikesQuerySnapshot.docs.length;
}
