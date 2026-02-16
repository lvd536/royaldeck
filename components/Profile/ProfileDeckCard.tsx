import Image from "next/image";
import emptyCard from "@/public/empyCard.png";

interface IProps {
    src: string | null;
    slotIndex: number;
}

export default function ProfileDeckCard({ src, slotIndex }: IProps) {
    return (
        <li className="cursor-pointer">
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
}
