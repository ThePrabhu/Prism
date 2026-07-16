import type { ResolutionStatus } from "../types/resolution.types";

interface StatusBadgeProps {
    status: ResolutionStatus;
}

const statusStyles: Record<ResolutionStatus, string> = {
    open: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<ResolutionStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
                ${statusStyles[status]}
            `}
        >
            {statusLabels[status]}
        </span>
    );
}