import Link from "next/link";

type ClashButtonVariant = "yellow" | "green" | "red" | "blue";

interface ClashButtonProps {
    text?: string;
    variant?: ClashButtonVariant;
    onClick?: () => void;
    href?: string;
}

export default function ClashButton({
    text = "Battle",
    variant = "yellow",
    onClick,
    href,
}: ClashButtonProps) {
    return (
        <>
            {href ? (
                <Link
                    href={href}
                    className={`clash-btn ${variant}`}
                    onClick={onClick}
                >
                    <div className="layer layer-1">
                        <div className="layer layer-2">
                            <div className="layer layer-3">
                                <span className="label">{text}</span>
                                <div className="shine" />
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className={`clash-btn ${variant}`} onClick={onClick}>
                    <div className="layer layer-1">
                        <div className="layer layer-2">
                            <div className="layer layer-3">
                                <span className="label">{text}</span>
                                <div className="shine" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
