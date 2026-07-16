import { ChevronRight, FileText } from "lucide-react";

import type { ResolutionCase } from "../types/resolution.types";
import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

interface ResolutionTableProps {
    cases: ResolutionCase[];
    selectedCaseId?: string | null;
    onSelectCase: (resolutionCase: ResolutionCase) => void;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatIssueType(issueType: ResolutionCase["issueType"]) {
    return issueType
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ResolutionTable({
    cases,
    selectedCaseId,
    onSelectCase,
}: ResolutionTableProps) {
    if (!cases.length) {
        return (
            <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                        <FileText size={24} />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-zinc-950">
                        No resolution cases found
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-zinc-500">
                        Try changing the filters or upload more documents to generate issue cases for this workspace.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-zinc-950">
                    Resolution Cases
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Review and act on issues detected from the active workspace.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Case
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Vendor
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Issue
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Severity
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Blocked ITC
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Confidence
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-100 bg-white">
                        {cases.map((resolutionCase) => {
                            const isSelected =
                                resolutionCase.id === selectedCaseId;

                            return (
                                <tr
                                    key={resolutionCase.id}
                                    onClick={() => onSelectCase(resolutionCase)}
                                    className={`
                                        cursor-pointer
                                        transition
                                        hover:bg-emerald-50/50
                                        ${isSelected ? "bg-emerald-50/70" : ""}
                                    `}
                                >
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-zinc-950">
                                                {resolutionCase.title}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {resolutionCase.invoiceNumber}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-zinc-900">
                                                {resolutionCase.vendorName}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {resolutionCase.vendorGSTIN}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <p className="max-w-[260px] text-sm text-zinc-600">
                                            {formatIssueType(
                                                resolutionCase.issueType
                                            )}
                                        </p>
                                    </td>

                                    <td className="px-6 py-5">
                                        <SeverityBadge
                                            severity={resolutionCase.severity}
                                        />
                                    </td>

                                    <td className="px-6 py-5">
                                        <StatusBadge
                                            status={resolutionCase.status}
                                        />
                                    </td>

                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-zinc-950">
                                            {formatCurrency(
                                                resolutionCase.blockedAmount
                                            )}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Recoverable{" "}
                                            {formatCurrency(
                                                resolutionCase.recoverableAmount
                                            )}
                                        </p>
                                    </td>

                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-zinc-950">
                                            {resolutionCase.confidence}%
                                        </p>
                                    </td>

                                    <td className="px-6 py-5 text-right">
                                        <button
                                            type="button"
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-zinc-200
                                                bg-white
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-zinc-700
                                                transition
                                                hover:cursor-pointer
                                                hover:border-emerald-300
                                                hover:bg-emerald-50
                                                hover:text-emerald-700
                                            "
                                        >
                                            Open
                                            <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}