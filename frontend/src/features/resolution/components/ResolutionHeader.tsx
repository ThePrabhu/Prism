import { FileSpreadsheet, AlertTriangle, CircleDollarSign, CheckCircle2 } from "lucide-react";

import { useWorkspace } from "../../dashboard/hooks/useWorkspace";

export default function ResolutionHeader() {
    const { activeWorkspace } = useWorkspace();

    const workspaceName =
        activeWorkspace?.name ?? "No active workspace";

    const totalInvoices =
        activeWorkspace?.summary?.invoices ?? 0;

    const openIssues =
        activeWorkspace?.totalAlerts ?? 0;

    const recoverableItc =
        activeWorkspace?.summary?.claimableITC ??
        activeWorkspace?.claimableItc ??
        0;

    const status =
        activeWorkspace?.status ?? "draft";

    return (
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Resolution Center
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-[-0.04em] text-zinc-950">
                            {workspaceName}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                            Review mismatches, blocked ITC, and AI-generated resolution cases for the active workspace.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700">
                            <FileSpreadsheet size={15} />
                            {totalInvoices.toLocaleString()} invoices
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
                            <AlertTriangle size={15} />
                            {openIssues} open issues
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                            <CircleDollarSign size={15} />
                            ₹{recoverableItc.toLocaleString()} recoverable
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600">
                            Status: <span className="capitalize">{status}</span>
                        </span>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            Total Cases
                        </p>
                        <p className="mt-2 text-2xl font-bold text-zinc-950">
                            {openIssues.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            Resolution Goal
                        </p>
                        <p className="mt-2 text-2xl font-bold text-zinc-950">
                            100%
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}