import { BadgeCheck, FileText, TriangleAlert, BadgeIndianRupee } from "lucide-react";

import {
    getActiveWorkspace,
    useDashboardStore,
} from "../../store/dashboardStore";

export default function SummaryCards() {
    const activeWorkspace = useDashboardStore(
        getActiveWorkspace
    );

    const cards = [
        {
            label: "Files Uploaded",
            value: activeWorkspace?.totalFiles ?? 0,
            icon: FileText,
            tone: "zinc",
        },
        {
            label: "Open Issues",
            value: activeWorkspace?.totalAlerts ?? 0,
            icon: TriangleAlert,
            tone: "red",
        },
        {
            label: "Claimable ITC",
            value: `₹${(activeWorkspace?.claimableItc ?? 0).toLocaleString("en-IN")}`,
            icon: BadgeIndianRupee,
            tone: "emerald",
        },
        {
            label: "Status",
            value: activeWorkspace?.status ?? "draft",
            icon: BadgeCheck,
            tone: "emerald",
        },
    ] as const;

    const rows = [
        { label: "GSTR-1", status: "Matched", value: "₹1,85,000" },
        { label: "GSTR-2B", status: "Partial", value: "₹1,12,500" },
        { label: "Invoices", status: "Review", value: "₹2,30,000" },
        { label: "Purchase Register", status: "Pending", value: "₹90,000" },
    ];

    return (
        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="
                                rounded-[28px]
                                border
                                border-zinc-200
                                bg-white/90
                                p-5
                                shadow-sm
                                backdrop-blur-xl
                            "
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                                        {card.label}
                                    </p>
                                    <p
                                        className={`
                                            mt-3 text-3xl font-semibold tracking-tight
                                            ${
                                                card.tone === "red"
                                                    ? "text-red-600"
                                                    : card.tone === "emerald"
                                                    ? "text-emerald-700"
                                                    : "text-zinc-950"
                                            }
                                        `}
                                    >
                                        {card.value}
                                    </p>
                                </div>

                                <div
                                    className={`
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        ${
                                            card.tone === "red"
                                                ? "bg-red-50 text-red-600"
                                                : card.tone === "emerald"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-zinc-100 text-zinc-600"
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-white/90 p-5 shadow-sm backdrop-blur-xl">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            Workspace Breakdown
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
                            {activeWorkspace?.name ?? "Current Workspace"}
                        </h3>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Ready for review
                    </span>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-zinc-200">
                    <table className="w-full border-collapse">
                        <thead className="bg-zinc-50">
                            <tr className="text-left text-xs uppercase tracking-[0.24em] text-zinc-400">
                                <th className="px-4 py-3 font-semibold">Entity</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {rows.map((row, index) => (
                                <tr
                                    key={row.label}
                                    className={index !== rows.length - 1 ? "border-b border-zinc-200" : ""}
                                >
                                    <td className="px-4 py-4">
                                        <div className="font-medium text-zinc-950">
                                            {row.label}
                                        </div>
                                        <div className="mt-1 text-xs text-zinc-400">
                                            GST workspace data
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                ${
                                                    row.status === "Matched"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : row.status === "Partial"
                                                        ? "bg-amber-50 text-amber-700"
                                                        : row.status === "Review"
                                                        ? "bg-violet-50 text-violet-700"
                                                        : "bg-zinc-100 text-zinc-600"
                                                }
                                            `}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-zinc-950">
                                        {row.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
