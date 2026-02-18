"use client";

import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import DeckCard from "./DeckCard";
import DeckControls from "./DeckControls";
import CreatorCredits from "./CreatorCredits";
import { ICustomDeck } from "@/types/interfaces";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getDeckLikeId,
    getDeckLikesCount,
    likeDeck,
    unlikeDeck,
} from "@/utils/database/firebaseMethods";

interface IProps {
    deck: ICustomDeck;
    deckIndex: number;
    controls?: boolean;
    showCredits?: boolean;
    canLike?: boolean;
    uid?: string;
    onClick?: () => void;
}

export default function Deck({
    deck,
    deckIndex,
    controls,
    showCredits,
    canLike,
    uid,
    onClick,
}: IProps) {
    const [deckLikes, setDeckLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeId, setLikeId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const likesCount = await getDeckLikesCount(deck.id);
            setDeckLikes(likesCount);
        })();
    }, []);

    useEffect(() => {
        if (!canLike || !uid) return;

        (async () => {
            const deckLike = (await getDeckLikeId(uid, deck.id)).docs[0];

            if (deckLike && deckLike.exists()) {
                setIsLiked(true);
                setLikeId(deckLike.id);
            } else {
                setIsLiked(false);
                setLikeId(null);
            }
        })();
    }, []);

    useEffect(() => {
        if (!canLike || !uid) return;

        const timeout = setTimeout(() => {
            if (isLiked && !likeId) {
                likeDeck(uid, deck.id)
                    .then((likeId) => {
                        setIsLiked(true);
                        setLikeId(likeId);
                    })
                    .catch(() => {
                        setIsLiked(false);
                        setLikeId(null);
                    });
            } else if (!isLiked && likeId) {
                unlikeDeck(likeId).finally(() => {
                    setIsLiked(false);
                    setLikeId(null);
                });
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isLiked]);

    const handleLike = () => {
        if (!canLike || !uid) return;

        setIsLiked((prev) => !prev);
        setDeckLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    return (
        <li
            className="flex relative flex-col bg-surface rounded-lg hover:ring-1 hover:shadow-lg hover:shadow-indigo-800 hover:ring-indigo-600 transition-[ring, shadow] duration-300 p-2"
            onClick={onClick}
        >
            <h1 className="max-md:text-xs font-clash-regular text-center">
                {deck.name}
            </h1>
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
                <p className="max-md:text-[11px] text-xs font-clash-regular p-2 bg-surface-2 rounded-lg mb-2 mx-auto">
                    {deck.description}
                </p>
            )}
            <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center font-clash-regular max-md:text-[11px] text-sm">
                            <Image
                                src={elixir}
                                alt="elixir icon"
                                width={35}
                                height={35}
                                className="max-md:w-7 w-10 h-auto"
                            />
                            <p>{deck.elixir}</p>
                        </div>
                        <div className="flex items-center font-clash-regular max-md:text-[11px] text-sm gap-2">
                            <Image
                                src={cycle}
                                alt="cycle icon"
                                width={25}
                                height={25}
                                className="max-md:w-4 w-5 h-auto"
                            />
                            <p>{deck.cycle}</p>
                        </div>
                        <div className="flex items-center font-clash-regular max-md:text-[11px] text-sm gap-2">
                            <Heart
                                width={25}
                                height={25}
                                className="max-md:w-4 w-5 h-auto text-foreground/80"
                            />
                            <p>{deckLikes}</p>
                        </div>
                    </div>
                    {showCredits && <CreatorCredits creatorId={deck.uid!} />}
                </div>
                {controls && <DeckControls deckId={deck.id} />}
            </div>
            {canLike && uid && (
                <Heart
                    width={35}
                    height={35}
                    className={`absolute right-2 top-2 p-2 bg-surface-2 hover:bg-surface-2/70 ${isLiked ? "text-green-400 hover:text-green-600" : "text-red-400 hover:text-red-600"} rounded-md transition-bg transition-text duration-300`}
                    onClick={handleLike}
                />
            )}
        </li>
    );
}
