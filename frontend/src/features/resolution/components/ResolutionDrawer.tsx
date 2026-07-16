import { X, Bot, Mail, Sparkles } from "lucide-react";

import type { ResolutionCase } from "../types/resolution.types";

interface ResolutionDrawerProps {
    open: boolean;
    resolutionCase: ResolutionCase | null;

    onClose: () => void;
    onExplain: () => void;
    onAskAI: () => void;
    onGenerateEmail: () => void;
}

export default function ResolutionDrawer({
    open,
    resolutionCase,
    onClose,
    onExplain,
    onAskAI,
    onGenerateEmail,
}: ResolutionDrawerProps) {
    if (!open || !resolutionCase) {
        return null;
    }

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            <aside
                className="
                    fixed
                    right-0
                    top-0
                    z-50
                    h-screen
                    w-[540px]
                    overflow-y-auto
                    border-l
                    border-zinc-200
                    bg-white
                    shadow-2xl
                "
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-zinc-200 p-6">

                    <div>

                        <h2 className="text-xl font-semibold">
                            {resolutionCase.title}
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            {resolutionCase.invoiceNumber}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 hover:bg-zinc-100"
                    >
                        <X size={20} />
                    </button>

                </div>

{/* Body */}

<div className="space-y-6 p-6">

    {/* Issue Overview */}

    <div className="rounded-2xl border border-zinc-200 p-5">

        <h3 className="mb-4 text-lg font-semibold">
            Issue Overview
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
                <p className="text-zinc-500">
                    Vendor
                </p>

                <p className="mt-1 font-medium">
                    {resolutionCase.vendorName}
                </p>
            </div>

            <div>
                <p className="text-zinc-500">
                    GSTIN
                </p>

                <p className="mt-1 font-medium">
                    {resolutionCase.vendorGSTIN}
                </p>
            </div>

            <div>
                <p className="text-zinc-500">
                    Invoice
                </p>

                <p className="mt-1 font-medium">
                    {resolutionCase.invoiceNumber}
                </p>
            </div>

            <div>
                <p className="text-zinc-500">
                    Confidence
                </p>

                <p className="mt-1 font-medium">
                    {resolutionCase.confidence}%
                </p>
            </div>

            <div>
                <p className="text-zinc-500">
                    Blocked ITC
                </p>

                <p className="mt-1 font-semibold text-red-600">
                    ₹{resolutionCase.blockedAmount.toLocaleString()}
                </p>
            </div>

            <div>
                <p className="text-zinc-500">
                    Recoverable
                </p>

                <p className="mt-1 font-semibold text-emerald-600">
                    ₹{resolutionCase.recoverableAmount.toLocaleString()}
                </p>
            </div>

        </div>

    </div>

    {/* AI Recommendation */}

    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

        <h3 className="font-semibold text-emerald-700">
            AI Recommendation
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-700">
            {resolutionCase.aiRecommendation}
        </p>

    </div>

    {/* Description */}

    <div className="rounded-2xl border border-zinc-200 p-5">

        <h3 className="font-semibold">
            Description
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-600">
            {resolutionCase.description}
        </p>

    </div>

    {/* Action Buttons */}

    <div className="grid grid-cols-3 gap-3">

        <button
            onClick={onExplain}
            className="rounded-2xl border border-zinc-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
        >
            <Sparkles
                className="mx-auto mb-3 text-emerald-600"
                size={20}
            />

            <p className="text-sm font-medium">
                Explain
            </p>

        </button>

        <button
            onClick={onAskAI}
            className="rounded-2xl border border-zinc-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
        >
            <Bot
                className="mx-auto mb-3 text-emerald-600"
                size={20}
            />

            <p className="text-sm font-medium">
                Ask AI
            </p>

        </button>

        <button
            onClick={onGenerateEmail}
            className="rounded-2xl border border-zinc-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
        >
            <Mail
                className="mx-auto mb-3 text-emerald-600"
                size={20}
            />

            <p className="text-sm font-medium">
                Email
            </p>

        </button>

    </div>

</div>

            </aside>
        </>
    );
}