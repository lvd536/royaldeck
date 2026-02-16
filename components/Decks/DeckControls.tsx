"use client";
import { auth } from "@/utils/database/firebase";
import { deleteUserDeck } from "@/utils/database/firebaseMethods";
import { Trash } from "lucide-react";

interface IProps {
    deckId: string;
}

export default function DeckControls({ deckId }: IProps) {
    const userId = auth.currentUser?.uid;

    if (!userId) return null;

    return (
        <div className="flex items-center gap-4">
            <Trash
                width={35}
                height={35}
                className="p-2 bg-surface-2 rounded-md hover:bg-surface-2/70 transition-bg transition-text duration-300 text-red-400 hover:text-red-600"
                onClick={() =>
                    deleteUserDeck(userId, deckId).then(() =>
                        window.location.reload(),
                    )
                }
            />
        </div>
    );
}
