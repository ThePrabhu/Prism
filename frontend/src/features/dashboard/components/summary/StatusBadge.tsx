interface Props {
    status:
        | "Matched"
        | "Partial"
        | "Review"
        | "Pending"
        | "Synced";
}

const styles = {
    Matched:
        "bg-emerald-50 text-emerald-700",

    Synced:
        "bg-blue-50 text-blue-700",

    Review:
        "bg-violet-50 text-violet-700",

    Partial:
        "bg-amber-50 text-amber-700",

    Pending:
        "bg-zinc-100 text-zinc-600",
};

export default function StatusBadge({
    status,
}: Props) {
    return (
        <span
            className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${styles[status]}
            `}
        >
            {status}
        </span>
    );
}