import { sendDeck } from "@/utils/database/firebaseMethods";
import { cards } from "@/utils/royaleAPI";
import { CardResponse } from "@varandas/clash-royale-api/lib/interfaces";
import { create } from "zustand";

const initialDeck: ICustomDeck = {
    id: "0",
    name: "Deck 0",
    elixir: 0,
    cycle: 0,
    cards: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" },
};

export interface ICustomDeck {
    id: string;
    name: string;
    elixir: number;
    cycle: number;
    cards: Record<number, string>;
}

interface ICardCreationStore {
    decks: ICustomDeck[];
    currentCardKey: number | null;
    currentDeckIndex: number | null;
    isCardListOpen: boolean;

    setDecks: (newDecks: ICustomDeck[]) => void;
    setCurrentCardKey: (newCardKey: number | null) => void;
    setCurrentDeckIndex: (newDeckIndex: number | null) => void;
    setIsCardListOpen: (newState: boolean) => void;

    openCardList: (slotIndex: number, deckIndex: number) => void;
    closeCardList: () => void;
    handleAddCard: (cards: CardResponse, imageUrl: string) => void;
    calcDeckElixir: (
        cards: CardResponse,
        deckCards: Record<number, string>,
    ) => number;
    calcCycleElixir: (
        cards: CardResponse,
        deckCards: Record<number, string>,
    ) => number;
    getLowCostCards: (
        cards: CardResponse,
        deckCards: Record<number, string>,
    ) => [string, string][];
    handleDeleteDeck: (id: string) => void;
    handleAddDeck: () => void;
    handleRefreshDecks: () => void;
    handlePublishDeck: (deckId: string) => void;
}

export const useCardCreationStore = create<ICardCreationStore>()(
    (set, get) => ({
        decks: [initialDeck],
        currentCardKey: null,
        currentDeckIndex: null,
        isCardListOpen: false,

        setDecks: (newDecks: ICustomDeck[]) => set({ decks: newDecks }),
        setCurrentCardKey: (newCardKey: number | null) =>
            set({ currentCardKey: newCardKey }),
        setCurrentDeckIndex: (newDeckIndex: number | null) =>
            set({ currentDeckIndex: newDeckIndex }),
        setIsCardListOpen: (newState: boolean) =>
            set({ isCardListOpen: newState }),

        openCardList: (slotIndex: number, deckIndex: number) => {
            get().setCurrentCardKey(slotIndex);
            get().setCurrentDeckIndex(deckIndex);
            get().setIsCardListOpen(true);
        },

        closeCardList: () => {
            get().setIsCardListOpen(false);
            get().setCurrentCardKey(null);
            get().setCurrentDeckIndex(null);
        },

        handleAddCard: (cards: CardResponse, imageUrl: string) => {
            if (
                get().currentCardKey === null ||
                get().currentDeckIndex === null
            ) {
                console.warn("No slot or deck selected");
                return;
            }

            const newDecks = get().decks.map((d) => ({
                ...d,
                cards: { ...d.cards },
            }));

            if (
                get().currentDeckIndex! < 0 ||
                get().currentDeckIndex! >= newDecks.length
            ) {
                console.error(
                    "deck index out of range",
                    get().currentDeckIndex,
                );
                return;
            }

            const currentDeck = newDecks[get().currentDeckIndex!];

            currentDeck.cards[get().currentCardKey!] = imageUrl;
            currentDeck.elixir = get().calcDeckElixir(cards, currentDeck.cards);
            currentDeck.cycle = get().calcCycleElixir(cards, currentDeck.cards);

            get().setDecks(newDecks);

            get().closeCardList();
        },

        calcDeckElixir: (
            cards: CardResponse,
            deckCards: Record<number, string>,
        ) => {
            return Number(
                (
                    Object.values(deckCards).reduce((sum, value) => {
                        const card = cards.items.find(
                            (i) =>
                                i.iconUrls.medium === value ||
                                i.iconUrls.evolutionMedium === value,
                        );
                        return sum + (Number(card?.elixirCost) || 0);
                    }, 0) / 8
                ).toFixed(1),
            );
        },
        calcCycleElixir: (
            cards: CardResponse,
            deckCards: Record<number, string>,
        ) => {
            return get()
                .getLowCostCards(cards, deckCards)
                .reduce((acc, [_, url]) => {
                    const cardInfo = cards.items.find(
                        (i) =>
                            i.iconUrls.medium === url ||
                            i.iconUrls.evolutionMedium === url,
                    );
                    const cost = cardInfo?.elixirCost || 0;

                    return acc + cost;
                }, 0);
        },
        getLowCostCards: (
            cards: CardResponse,
            deckCards: Record<number, string>,
        ) => {
            const costMap = new Map(
                cards.items.flatMap((i) => [
                    [i.iconUrls.medium, i.elixirCost],
                    [i.iconUrls.evolutionMedium, i.elixirCost],
                ]),
            );

            const test = Object.entries(deckCards)
                .sort(([, urlA], [, urlB]) => {
                    const costA = costMap.get(urlA) || 99;
                    const costB = costMap.get(urlB) || 99;
                    return costA - costB;
                })
                .slice(0, 4);
            return test;
        },

        handleDeleteDeck: (id: string) => {
            if (get().decks.length > 1) {
                const newDecks = get().decks.filter((deck) => deck.id !== id);
                get().setDecks(newDecks);
            } else get().setDecks([initialDeck]);
        },

        handleAddDeck: () => {
            const newDeckId = Number(get().decks.at(-1)!.id) + 1;
            const newDecks = [
                ...get().decks,
                {
                    ...initialDeck,
                    id: newDeckId.toString(),
                    name: `Deck ${newDeckId}`,
                },
            ];
            get().setDecks(newDecks);
        },

        handleRefreshDecks: () => get().setDecks([initialDeck]),

        handlePublishDeck: (deckId: string) => {
            const decks = get().decks;
            const newDecks = decks.filter((d) => d.id !== deckId);
            const targetDeck = decks.filter((d) => d.id === deckId)[0];

            if (targetDeck) {
                sendDeck(targetDeck);
                if (newDecks.length < 1) {
                    get().setDecks([initialDeck]);
                } else get().setDecks(newDecks);
            }
        },
    }),
);
