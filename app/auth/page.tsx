import Image from "next/image";
import Wizard from "@/public/Wizard_BG.png";
import Golem from "@/public/Ice_Golem_BG.png";
import { Mail, KeyRound } from "lucide-react";
import Google from "@/public/google.png";

export default function page() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center bg-background">
                <h1 className="font-clash-bold text-2xl z-2">Royale Deck</h1>
                <h1 className="font-clash-bold text-xl z-2">Auth Page</h1>
                <form className="flex flex-col gap-1 my-auto bg-background/50 p-2 rounded-lg z-2">
                    <label
                        htmlFor="emailInput"
                        className="text-xs font-clash-regular"
                    >
                        Email
                    </label>
                    <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg focus-within:ring-stone-300 transition-ring duration-300">
                        <Mail />
                        <input
                            type="text"
                            name="emailInput"
                            id="emailInput"
                            className="w-full h-full outline-0 font-clash-regular text-sm pl-2 border-l border-l-stone-500"
                        />
                    </div>
                    <label
                        htmlFor="passwordInput"
                        className="text-xs font-clash-regular mt-1"
                    >
                        Password
                    </label>
                    <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg focus-within:ring-stone-300 transition-ring duration-300">
                        <KeyRound />
                        <input
                            type="password"
                            name="passwordInput"
                            id="passwordInput"
                            className="w-full h-full outline-0 font-clash-regular text-sm pl-2 border-l border-l-stone-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center mt-2 mx-auto">
                        <div className="flex gap-2 items-center">
                            <p className="w-25 h-px rounded-full bg-stone-800"></p>
                            <p className="text-sm text-stone-300 font-medium">
                                or
                            </p>
                            <p className="w-25 h-px rounded-full bg-stone-800"></p>
                        </div>
                        <div>
                            <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg">
                                <Image
                                    src={Google}
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                />
                                <p className="font-clash-regular text-sm pl-2 border-l border-l-stone-500 select-none">
                                    Continue with Google
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
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
