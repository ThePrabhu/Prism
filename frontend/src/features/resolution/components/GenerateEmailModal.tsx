import { useMemo, useState } from "react";
import {
    X,
    Mail,
    Send,
    Sparkles,
} from "lucide-react";

import type { ResolutionCase } from "../types/resolution.types";

interface GenerateEmailModalProps {
    open: boolean;
    resolutionCase: ResolutionCase | null;

    onClose: () => void;

    onSend: (payload: {
        to: string;
        subject: string;
        body: string;
    }) => void;
}

export default function GenerateEmailModal({
    open,
    resolutionCase,
    onClose,
    onSend,
}: GenerateEmailModalProps) {
    const [email, setEmail] = useState("");

    const subject = useMemo(() => {
        if (!resolutionCase) return "";

        return `GST Reconciliation Issue - ${resolutionCase.invoiceNumber}`;
    }, [resolutionCase]);

    const body = useMemo(() => {
        if (!resolutionCase) return "";

        return `Dear ${resolutionCase.vendorName},

Our GST reconciliation system detected an issue related to Invoice ${resolutionCase.invoiceNumber}.

Issue:
${resolutionCase.title}

Description:
${resolutionCase.description}

Blocked ITC:
₹${resolutionCase.blockedAmount.toLocaleString()}

Recommended Action:
${resolutionCase.aiRecommendation}

Please review the invoice and provide the corrected GST filing or supporting documents at your earliest convenience.

Regards,
Finance Team
Prism AI`;
    }, [resolutionCase]);

    if (!open || !resolutionCase) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="
                    fixed
                    left-1/2
                    top-1/2
                    z-[90]
                    w-full
                    max-w-3xl
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-zinc-200 px-7 py-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">

                            <Mail
                                size={22}
                                className="text-emerald-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold">
                                AI Email Generator
                            </h2>

                            <p className="text-sm text-zinc-500">
                                Review before sending
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 hover:bg-zinc-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-7">

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Recipient Email
                        </label>

                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="vendor@example.com"
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Subject
                        </label>

                        <input
                            value={subject}
                            readOnly
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Email Body
                        </label>

                        <textarea
                            rows={14}
                            value={body}
                            readOnly
                            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 leading-7"
                        />

                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                        <Sparkles size={16} />

                        Gemini/OpenAI will generate this email
                        automatically after backend integration.

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-zinc-200 px-7 py-5">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-zinc-200 px-5 py-3 hover:bg-zinc-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onSend({
                                to: email,
                                subject,
                                body,
                            })
                        }
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
                    >
                        <Send size={17} />

                        Send Email
                    </button>

                </div>

            </div>

        </>
    );
}