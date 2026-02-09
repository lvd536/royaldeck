import { royaleAPI } from "@/utils/royaleAPI";
import Image from "next/image";

export default async function Home() {
    const cards = await royaleAPI.getCards();
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center bg-white dark:bg-black">
                <h1 className="font-clash-bold">Clash Royale</h1>
                <ul className="flex flex-wrap gap-2 items-center justify-center">
                    {cards.items.slice(0, 20).map((i) => (
                        <li
                            className="flex flex-col items-center justify-center"
                            key={i.id}
                        >
                            <Image
                                src={i.iconUrls.medium}
                                alt=""
                                height={200}
                                width={100}
                            />
                            <h1 className="font-clash-regular">{i.name}</h1>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
