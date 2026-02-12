import Image from "next/image";
import elixir from "@/public/elixir.png";
import cycle from "@/public/cycle.png";
import { ICustomDeck } from "../Pages/DeckCreation";
import emptyCard from "@/public/empyCard.png";
import { CardResponse } from "@varandas/clash-royale-api/lib/interfaces";
import Cards from "./Cards";

interface IProps {
    decks: ICustomDeck[];
    cards: CardResponse;
    currentCardKey: number | null;
    openCardList: (slotIndex: number, deckIndex: number) => void;
}

export default function Decks({
    decks,
    cards,
    currentCardKey,
    openCardList,
}: IProps) {
    const calcDeckElixir = (deckCards: Record<number, string>) => {
        return (
            Object.values(deckCards).reduce((sum, value) => {
                const card = cards.items.find(
                    (i) =>
                        i.iconUrls.medium === value ||
                        i.iconUrls.evolutionMedium === value,
                );
                return sum + (Number(card?.elixirCost) || 0);
            }, 0) / 8
        ).toFixed(1);
    };
    const calcCycleElixir = (deckCards: Record<number, string>) => {
        return getLowCostCards(deckCards).reduce((acc, [key, url]) => {
            const cardInfo = cards.items.find(
                (i) =>
                    i.iconUrls.medium === url ||
                    i.iconUrls.evolutionMedium === url,
            );
            const cost = cardInfo?.elixirCost || 0;

            return acc + cost;
        }, 0);
    };
    const getLowCostCards = (deckCards: Record<number, string>) => {
        const costMap = new Map(
            cards.items.flatMap((i) => [
                [i.iconUrls.medium, i.elixirCost],
                [i.iconUrls.evolutionMedium, i.elixirCost],
            ]),
        );

        return Object.entries(deckCards)
            .sort(([, urlA], [, urlB]) => {
                const costA = costMap.get(urlA) || 99;
                const costB = costMap.get(urlB) || 99;
                return costA - costB;
            })
            .slice(0, 4);
    };
    return (
        <ul className="w-full flex flex-col items-center justify-center mx-auto">
            {decks.map((deck, deckIndex) => (
                <li
                    className="flex flex-col bg-surface-2 rounded-lg p-2"
                    key={deck.id ?? deckIndex}
                >
                    <h1 className="font-clash-regular">{deck.name}</h1>
                    <Cards
                        cards={deck.cards}
                        currentCardKey={currentCardKey}
                        deckIndex={deckIndex}
                        openCardList={openCardList}
                    />
                    <div className="flex items-center gap-4">
                        <div className="flex items-center font-clash-regular text-sm">
                            <Image
                                src={elixir}
                                alt="elixir icon"
                                width={35}
                                height={35}
                                className="w-10 h-auto"
                            />
                            <p>{calcDeckElixir(deck.cards)}</p>
                        </div>
                        <div className="flex items-center font-clash-regular text-sm gap-2">
                            <Image
                                src={cycle}
                                alt="cycle icon"
                                width={25}
                                height={25}
                                className="w-5 h-auto"
                            />
                            <p>{calcCycleElixir(deck.cards)}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
