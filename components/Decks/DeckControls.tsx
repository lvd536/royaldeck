"use client";
import { auth } from "@/lib/firebase";
import { deleteUserDeck } from "@/utils/database/firebaseMethods";
import { Trash } from "lucide-react";

interface IProps {
    deckId: string;
}

export default function DeckControls({ deckId }: IProps) {
    return (
        <div className="flex items-center gap-4">
            <Trash
                width={35}
                height={35}
                className="p-2 max-md:w-7 max-md:h-auto max-md:p-1 bg-surface-2 rounded-md hover:bg-surface-2/70 transition-bg transition-text duration-300 text-red-400 hover:text-red-600"
                onClick={() =>
                    deleteUserDeck(deckId).then(() => window.location.reload())
                }
            />
        </div>
    );
}
