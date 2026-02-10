"use client";
import { Menu } from "lucide-react";
import ClashButton from "./ClashButton";

export default function NavPanel() {
    const handleOpen = () => {
        const navPanel = document.getElementById("navPanel");
        navPanel?.classList.toggle("-translate-x-full");
    };
    return (
        <div>
            <Menu
                className="fixed left-0 top-0 p-2 m-1 bg-surface-2 rounded-md z-2"
                width={35}
                height={35}
                onClick={handleOpen}
            />
            <nav
                id="navPanel"
                className="flex flex-col gap-2 h-full pt-10 px-6 items-start font-clash-regular bg-surface rounded-r-lg transition-translate duration-300"
            >
                <ClashButton text="Home" variant="blue" />
                <ClashButton text="Profile" variant="blue" />
                <ClashButton text="Create deck" variant="blue" />
                <ClashButton text="Top" variant="blue" />
                <ClashButton text="Events" variant="blue" />
            </nav>
        </div>
    );
}
