"use client";
import { Menu } from "lucide-react";
import ClashButton from "./ClashButton";
import { browserRoutes } from "@/consts/browserRoutes";

export default function NavPanel() {
    const handleOpen = () => {
        const navPanel = document.getElementById("navPanel");
        if (!navPanel) return;
        navPanel.classList.toggle("-translate-x-full");
    };
    return (
        <div className="z-10">
            <Menu
                className="fixed left-0 top-0 p-1 m-1 bg-surface-2 rounded-md z-2"
                width={30}
                height={30}
                onClick={handleOpen}
            />
            <nav
                id="navPanel"
                className="fixed left-0 top-0 flex max-md:w-50 flex-col gap-2 h-full pt-10 px-6 items-start font-clash-regular bg-surface rounded-r-lg transition-translate duration-300"
            >
                <ClashButton
                    text="Home"
                    variant="blue"
                    href={browserRoutes.home.link}
                />
                <ClashButton
                    text="Profile"
                    variant="blue"
                    href={browserRoutes.profile.link}
                />
                <ClashButton
                    text="Create deck"
                    variant="blue"
                    href={browserRoutes.decks.creation.link}
                />
            </nav>
        </div>
    );
}
