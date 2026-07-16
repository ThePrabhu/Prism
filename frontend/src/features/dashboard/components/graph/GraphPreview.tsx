import { useState } from "react";
import { Network, ArrowRightLeft } from "lucide-react";

import {
    getActiveWorkspace,
    useDashboardStore,
} from "../../store/dashboardStore";

const filters = [
    "All",
    "GSTR-1",
    "GSTR-2B",
    "Invoices",
    "Vendors",
    "Exceptions",
];

export default function GraphPreview() {
    const [activeFilter, setActiveFilter] = useState("All");

    const activeWorkspace = useDashboardStore(
        getActiveWorkspace
    );

    const metrics = [
        {
            label: "Nodes",
            value: activeWorkspace?.graph.nodes ?? 128,
        },
        {
            label: "Edges",
            value: activeWorkspace?.graph.edges ?? 241,
        },
        {
            label: "Vendors",
            value: activeWorkspace?.summary.vendors ?? 34,
        },
        {
            label: "Issues",
            value: activeWorkspace?.totalAlerts ?? 0,
        },
    ];

    return (
        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            Relationship Graph
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                            Neo4j workspace for {activeWorkspace?.name ?? "your workspace"}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <Network size={14} />
                        Live Graph Preview
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const active = activeFilter === filter;

                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    rounded-full
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    transition-all
                                    ${
                                        active
                                            ? "bg-zinc-950 text-white"
                                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950"
                                    }
                                `}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                    <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6">
                        <div className="absolute inset-0 opacity-[0.08]">
                            <div
                                className="
                                    h-full w-full
                                    bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)]
                                    bg-[size:52px_52px]
                                "
                            />
                        </div>

                        <div className="relative h-full">
                            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-3xl" />

                            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border border-zinc-200 bg-white shadow-xl">
                                <ArrowRightLeft className="text-emerald-600" size={28} />
                            </div>

                            {[
                                { top: "14%", left: "18%", label: "Vendor A" },
                                { top: "20%", left: "72%", label: "GSTR-2B" },
                                { top: "62%", left: "16%", label: "Invoice" },
                                { top: "68%", left: "72%", label: "Mismatch" },
                                { top: "42%", left: "46%", label: "Buyer" },
                            ].map((node, index) => (
                                <div
                                    key={node.label}
                                    className="absolute"
                                    style={{ top: node.top, left: node.left }}
                                >
                                    <div
                                        className={`
                                            rounded-full
                                            border
                                            px-4
                                            py-2
                                            text-sm
                                            font-semibold
                                            shadow-sm
                                            ${
                                                index % 2 === 0
                                                    ? "border-zinc-200 bg-white text-zinc-700"
                                                    : "border-emerald-100 bg-emerald-50 text-emerald-700"
                                            }
                                        `}
                                    >
                                        {node.label}
                                    </div>
                                </div>
                            ))}

                            <svg
                                className="absolute inset-0 h-full w-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <line x1="50" y1="50" x2="22" y2="18" stroke="#d4d4d8" strokeWidth="0.8" />
                                <line x1="50" y1="50" x2="78" y2="22" stroke="#d4d4d8" strokeWidth="0.8" />
                                <line x1="50" y1="50" x2="20" y2="66" stroke="#d4d4d8" strokeWidth="0.8" />
                                <line x1="50" y1="50" x2="78" y2="72" stroke="#d4d4d8" strokeWidth="0.8" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[28px] border border-zinc-200 bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                                Graph Summary
                            </p>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {metrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                                    >
                                        <p className="text-xs text-zinc-500">
                                            {metric.label}
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold text-zinc-950">
                                            {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-zinc-200 bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                                Filter Context
                            </p>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Active filter</span>
                                    <span className="font-semibold text-zinc-950">
                                        {activeFilter}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Current workspace</span>
                                    <span className="font-semibold text-zinc-950">
                                        {activeWorkspace?.name ?? "Unknown"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Claimable ITC</span>
                                    <span className="font-semibold text-emerald-700">
                                        ₹{(activeWorkspace?.claimableItc ?? 0).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-5">
                            <p className="text-sm font-semibold text-zinc-950">
                                Quick Insight
                            </p>
                            <p className="mt-2 text-sm leading-7 text-zinc-600">
                                Graph connectivity shows vendor and invoice relationships for the selected workspace. Missing returns and mismatched invoices will appear here after processing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                    Workspace Snapshot
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                    {activeWorkspace?.name ?? "Current Workspace"}
                </h3>

                <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs text-zinc-500">Status</p>
                        <p className="mt-2 text-base font-semibold text-zinc-950">
                            {activeWorkspace?.status ?? "draft"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs text-zinc-500">Files</p>
                        <p className="mt-2 text-base font-semibold text-zinc-950">
                            {activeWorkspace?.totalFiles ?? 0} uploaded
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs text-zinc-500">Open Issues</p>
                        <p className="mt-2 text-base font-semibold text-zinc-950">
                            {activeWorkspace?.totalAlerts ?? 0}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <p className="text-xs text-emerald-700">Claimable ITC</p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-700">
                            ₹{(activeWorkspace?.claimableItc ?? 0).toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
