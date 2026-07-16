// src/features/resolution/components/ExplainPanel.tsx

import {
    Sparkles,
    CircleAlert,
    BadgeIndianRupee,
    Building2,
    FileText,
} from "lucide-react";

import type { ResolutionCase } from "../types/resolution.types";

interface ExplainPanelProps {
    resolutionCase: ResolutionCase;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function ExplainPanel({
    resolutionCase,
}: ExplainPanelProps) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-emerald-200
                bg-emerald-50
                p-6
            "
        >
            {/* Header */}

            <div className="flex items-center gap-3">
                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white
                    "
                >
                    <Sparkles
                        size={20}
                        className="text-emerald-600"
                    />
                </div>

                <div>
                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-zinc-900
                        "
                    >
                        AI Explanation
                    </h3>

                    <p
                        className="
                            text-sm
                            text-zinc-500
                        "
                    >
                        Why Prism detected this issue
                    </p>
                </div>
            </div>

            {/* Explanation */}

            <div className="mt-8 space-y-5">

                <ExplanationCard
                    icon={<CircleAlert size={18} />}
                    title="Problem"
                    description={resolutionCase.description}
                />

                <ExplanationCard
                    icon={<Building2 size={18} />}
                    title="Vendor"
                    description={`${resolutionCase.vendorName} (${resolutionCase.vendorGSTIN})`}
                />

                <ExplanationCard
                    icon={<FileText size={18} />}
                    title="Invoice"
                    description={resolutionCase.invoiceNumber}
                />

                <ExplanationCard
                    icon={<BadgeIndianRupee size={18} />}
                    title="Financial Impact"
                    description={`Blocked ITC of ${formatCurrency(
                        resolutionCase.blockedAmount
                    )} has been detected.`}
                />

            </div>

            {/* AI Recommendation */}

            <div
                className="
                    mt-8
                    rounded-2xl
                    border
                    border-white
                    bg-white
                    p-5
                "
            >
                <h4
                    className="
                        text-sm
                        font-semibold
                        text-emerald-700
                    "
                >
                    Prism Recommendation
                </h4>

                <p
                    className="
                        mt-3
                        text-sm
                        leading-7
                        text-zinc-700
                    "
                >
                    {resolutionCase.aiRecommendation}
                </p>
            </div>

            {/* Future Backend */}

            <div
                className="
                    mt-6
                    rounded-2xl
                    border
                    border-dashed
                    border-zinc-300
                    bg-white
                    p-5
                "
            >
                <p
                    className="
                        text-xs
                        leading-6
                        text-zinc-500
                    "
                >
                    <strong>Backend Integration:</strong> Later this
                    explanation will be generated dynamically by
                    Gemini/OpenAI based on invoice data, GST filings,
                    vendor history, ITC eligibility and Neo4j graph
                    relationships.
                </p>
            </div>
        </section>
    );
}

interface ExplanationCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function ExplanationCard({
    icon,
    title,
    description,
}: ExplanationCardProps) {
    return (
        <div
            className="
                flex
                gap-4
                rounded-2xl
                bg-white
                p-5
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                "
            >
                {icon}
            </div>

            <div>
                <h5
                    className="
                        font-semibold
                        text-zinc-900
                    "
                >
                    {title}
                </h5>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-7
                        text-zinc-600
                    "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}