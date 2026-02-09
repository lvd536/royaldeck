import { royaleAPI } from "@/utils/royaleAPI";

export default async function Home() {
    const cards = await royaleAPI.getCards();
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center bg-background">
                <h1 className="font-clash-bold text-2xl">Royale Deck</h1>
                <h1 className="font-clash-bold text-xl">Home Page</h1>
            </main>
        </div>
    );
}
