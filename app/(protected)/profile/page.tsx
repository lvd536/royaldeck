"use client";
import { auth } from "@/utils/database/firebase";
import { LogOut } from "lucide-react";
import Image from "next/image";
import NoDecks from "@/public/NoDecks.png";

export default function page() {
    const user = auth.currentUser;
    if (!user) return null;
    const decks = false;
    return (
        <div className="flex flex-col w-full h-full mt-2 px-[10%] md:px-[20%] gap-2">
            <div className="w-full rounded-lg p-2 bg-surface-2">
                <div className="flex items-center justify-between gap-2 px-2">
                    <div className="flex items-center gap-2">
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt="user avatar"
                                width={20}
                                height={20}
                                className="w-11 h-11 rounded-full"
                            />
                        ) : (
                            <div className="font-clash-regular flex items-center justify-center p-4 w-11 h-11 rounded-full bg-surface">
                                {user.email?.split("@")[0][0].toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="text-sm font-clash-regular">
                                {user.displayName ?? user.email?.split("@")[0]}
                            </h1>
                            <p className="text-xs text-foreground/10">
                                {user.uid}
                            </p>
                        </div>
                    </div>
                    <LogOut
                        width={35}
                        height={35}
                        className="p-2 bg-surface rounded-md"
                        onClick={() => auth.signOut()}
                    />
                </div>
            </div>
            <div className="w-full min-h-40 rounded-lg p-2 bg-surface-2">
                {decks ? (
                    <h1 className="font-clash-regular">Your decks</h1>
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
