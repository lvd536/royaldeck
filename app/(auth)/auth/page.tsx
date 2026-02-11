"use client";
import Image from "next/image";
import Wizard from "@/public/Wizard_BG.png";
import Golem from "@/public/Ice_Golem_BG.png";
import Google from "@/public/google.png";
import { useState } from "react";
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/utils/database/firebase";

export default function page() {
    const [signIn, setSignIn] = useState<boolean>(false);

    const toggleSignIn = () => setSignIn((prev) => !prev);

    const handleGoogleAuth = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(
                `Auth ends with error code: ${errorCode}: ${errorMessage}`,
            );
        });
    };

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center bg-background">
                <h1 className="font-clash-bold text-2xl z-2">Royale Deck</h1>
                <h1 className="font-clash-bold text-xl z-2">Auth Page</h1>
                <div className="flex flex-col items-center mt-2">
                    {signIn ? <SignIn /> : <SignUp />}
                    <div className="flex flex-col gap-2 items-center mt-2 mx-auto">
                        <div className="flex gap-2 items-center">
                            <p className="w-25 h-px rounded-full bg-stone-800"></p>
                            <p className="text-sm text-stone-300 font-medium">
                                or
                            </p>
                            <p className="w-25 h-px rounded-full bg-stone-800"></p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg hover:ring-stone-300 transition-ring duration-300">
                                <Image
                                    src={Google}
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                />
                                <p
                                    className="font-clash-regular text-sm pl-2 border-l border-l-stone-500 select-none"
                                    onClick={handleGoogleAuth}
                                >
                                    Continue with Google
                                </p>
                            </div>
                            <p
                                className="font-clash-regular text-xs text-foreground/70 select-none hover:text-stone-300 transition-text duration-300"
                                onClick={toggleSignIn}
                            >
                                {signIn
                                    ? "Already have an account? Sign Up"
                                    : "Doesn't have an account? Sign In"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={Wizard}
                alt="Wizard"
                className="w-50 h-50 sm:w-75 sm:h-75 xl:w-100 xl:h-100 2xl:w-150 2xl:h-150 fixed left-0 top-1/2 -translate-y-1/2 object-cover z-1"
            />
            <Image
                src={Golem}
                alt="Golem"
                className="w-50 h-50 sm:w-75 sm:h-75 xl:w-100 xl:h-100 2xl:w-150 2xl:h-150 fixed right-0 top-1/2 -translate-y-1/2 object-cover z-1"
            />
        </>
    );
}
