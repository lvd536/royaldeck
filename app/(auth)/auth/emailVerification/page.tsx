"use client";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";

const VERIFICATION_TIMEOUT = 20;

export default function page() {
    const [currentTimeout, setCurrentTimeout] = useState<number>(0);

    const handleSendNewLink = () => {
        const user = auth.currentUser;
        if (user) {
            sendEmailVerification(user).then(() =>
                setCurrentTimeout(VERIFICATION_TIMEOUT),
            );
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (currentTimeout > 0) {
            interval = setInterval(() => {
                setCurrentTimeout((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [currentTimeout]);

    return (
        <div className="flex flex-col gap-2 h-full w-full items-center justify-center">
            <span className="w-full sm:w-1/2 lg:w-1/4 font-clash-regular p-2 bg-surface rounded-lg">
                Please confirm your email to continue using Royale Deck. An
                email has been sent to your email address.
            </span>
            <div className="relative">
                <button
                    className="font-clash-regular text-sm p-2 ring-1 ring-surface-2 rounded-lg hover:bg-surface-2/20 transition-bg duration-300"
                    disabled={currentTimeout > 0}
                    onClick={handleSendNewLink}
                >
                    Send new verification link
                </button>
                <div
                    className="absolute top-0 left-0 h-full bg-black/40 rounded-lg"
                    style={{
                        width: (currentTimeout / VERIFICATION_TIMEOUT) * 230,
                    }}
                />
            </div>
        </div>
    );
}
