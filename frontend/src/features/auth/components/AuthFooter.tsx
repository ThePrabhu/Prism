import { Link } from "react-router-dom";

interface AuthFooterProps {
    question: string;
    action: string;
    to: string;
}

export default function AuthFooter({
    question,
    action,
    to,
}: AuthFooterProps) {
    return (
        <div
            className="
                mt-8
                text-center
            "
        >
            <span
                className="
                    text-sm
                    text-zinc-500
                "
            >
                {question}{" "}
            </span>

            <Link
                to={to}
                className="
                    text-sm
                    font-semibold
                    text-emerald-600
                    transition-colors
                    duration-300
                    hover:text-emerald-700
                "
            >
                {action}
            </Link>
        </div>
    );
}