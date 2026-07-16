import type { ResolutionSeverity } from "../types/resolution.types";

interface SeverityBadgeProps {
    severity: ResolutionSeverity;
}

const severityStyles: Record<ResolutionSeverity, string> = {
    critical: "bg-red-50 text-red-700 border-red-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const severityLabels: Record<ResolutionSeverity, string> = {
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
};

export default function SeverityBadge({
    severity,
}: SeverityBadgeProps) {
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
                ${severityStyles[severity]}
            `}
        >
            {severityLabels[severity]}
        </span>
    );
}