import Image from "next/image";
import emptyCard from "@/public/empyCard.png";

interface IProps {
    cards: Record<number, string>;
    currentCardKey: number | null;
    deckIndex: number;
    openCardList: (slotIndex: number, deckIndex: number) => void;
}

export default function Cards({
    cards,
    currentCardKey,
    deckIndex,
    openCardList,
}: IProps) {
    return (
        <ul className="flex items-center justify-center">
            {Object.entries(cards).map(([key, valueStr]) => {
                const slotIndex = Number(key);
                const src = valueStr && valueStr.length > 0 ? valueStr : null;

                return (
                    <li
                        key={`${deckIndex}-${slotIndex}`}
                        className={`cursor-pointer ${currentCardKey === +key && "animate-pulse"}`}
                        onClick={() => openCardList(slotIndex, deckIndex)}
                    >
                        {src ? (
                            <Image
                                src={src}
                                alt={`card-${slotIndex}`}
                                width={500}
                                height={1000}
                                className="w-[102px] h-auto object-fit mb-3"
                            />
                        ) : (
                            <Image
                                src={emptyCard}
                                width={110}
                                height={160}
                                alt="empty"
                                className="w-[110px] h-auto"
                                loading="eager"
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
