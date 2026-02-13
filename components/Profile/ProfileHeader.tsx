"use client";
import Image from "next/image";
import { auth } from "@/utils/database/firebase";
import { LogOut } from "lucide-react";

export default function ProfileHeader() {
    const user = auth.currentUser;
    if (!user) return null;
    return (
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
                        <p className="text-xs text-foreground/10">{user.uid}</p>
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
    );
}
