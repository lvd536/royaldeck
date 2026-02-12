import { Plus } from "lucide-react";

export default async function Home() {
    return (
        <div className="flex flex-col w-full items-center mt-2 px-[10%] md:px-[20%] gap-2">
            <div className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg">
                <input
                    type="text"
                    className="w-full font-clash-regular sm:text-sm p-2 rounded-lg outline-0 bg-surface"
                    placeholder="Choose your deck, add a comment and share it!"
                />
                <div className="flex items-center justify-center w-full h-30 p-2 bg-surface rounded-lg">
                    <Plus
                        width={35}
                        height={35}
                        className="p-2 rounded-md bg-surface-2 hover:shadow-xs shadow-surface-2 transition-shadow duration-200"
                    />
                </div>
            </div>
            <ul className="flex flex-col gap-2 w-full p-2 bg-surface-2 rounded-lg"></ul>
        </div>
    );
}
