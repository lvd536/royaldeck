"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import Image from "next/image";

interface IProps {
    creatorId: string;
}

export default function CreatorCredits({ creatorId }: IProps) {
    const { user, loading, error } = useUserProfile(creatorId);

    if (loading || error) return null;

    return (
        <div className="flex items-center gap-2">
            {user!.photoURL ? (
                <Image
                    src={user!.photoURL}
                    alt="user avatar"
                    width={14}
                    height={14}
                    className="w-7 h-7 rounded-full"
                />
            ) : (
                <div className="font-clash-regular flex items-center justify-center p-4 w-7 h-7 rounded-full bg-surface">
                    {user!.email?.split("@")[0][0].toUpperCase()}
                </div>
            )}
            <h1 className="text-sm font-clash-regular">
                {user!.displayName ?? user!.email?.split("@")[0]}
            </h1>
        </div>
    );
}
