import { useMemo } from "react";
import { Filter, RotateCcw, Search } from "lucide-react";

import type {
    ResolutionFilters as ResolutionFiltersType,
    ResolutionSeverity,
    ResolutionStatus,
    ResolutionType,
} from "../types/resolution.types";

interface ResolutionFiltersProps {
    filters: ResolutionFiltersType;
    onChange: (filters: ResolutionFiltersType) => void;
    vendors?: string[];
}

const severityOptions: Array<ResolutionSeverity | "all"> = [
    "all",
    "critical",
    "high",
    "medium",
    "low",
];

const statusOptions: Array<ResolutionStatus | "all"> = [
    "all",
    "open",
    "in_progress",
    "resolved",
];

const issueTypeOptions: Array<ResolutionType | "all"> = [
    "all",
    "invoice_missing",
    "gstin_mismatch",
    "tax_difference",
    "duplicate_invoice",
    "invoice_date_mismatch",
    "vendor_not_filed",
    "itc_blocked",
    "other",
];

function labelize(value: string) {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ResolutionFilters({
    filters,
    onChange,
    vendors = [],
}: ResolutionFiltersProps) {
    const vendorOptions = useMemo(() => {
        return ["all", ...vendors];
    }, [vendors]);

    function update<K extends keyof ResolutionFiltersType>(
        key: K,
        value: ResolutionFiltersType[K]
    ) {
        onChange({
            ...filters,
            [key]: value,
        });
    }

    function resetFilters() {
        onChange({
            search: "",
            severity: "all",
            status: "all",
            issueType: "all",
            vendor: "all",
            sortBy: "date",
            sortOrder: "desc",
        });
    }

    return (
        <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-emerald-600" />
                        <h2 className="text-lg font-semibold text-zinc-950">
                            Filters
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">
                        Narrow cases by severity, status, vendor, and issue type.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                    <RotateCcw size={15} />
                    Reset
                </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-6">
                <label className="xl:col-span-2">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Search
                    </span>
                    <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                        <Search size={16} className="text-zinc-400" />
                        <input
                            value={filters.search}
                            onChange={(e) => update("search", e.target.value)}
                            placeholder="Invoice, vendor, GSTIN..."
                            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                        />
                    </div>
                </label>

                <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Severity
                    </span>
                    <select
                        value={filters.severity}
                        onChange={(e) =>
                            update(
                                "severity",
                                e.target.value as ResolutionSeverity | "all"
                            )
                        }
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                    >
                        {severityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === "all" ? "All" : labelize(option)}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Status
                    </span>
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            update(
                                "status",
                                e.target.value as ResolutionStatus | "all"
                            )
                        }
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                    >
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === "all" ? "All" : labelize(option)}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Issue Type
                    </span>
                    <select
                        value={filters.issueType}
                        onChange={(e) =>
                            update(
                                "issueType",
                                e.target.value as ResolutionType | "all"
                            )
                        }
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                    >
                        {issueTypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === "all" ? "All" : labelize(option)}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Vendor
                    </span>
                    <select
                        value={filters.vendor}
                        onChange={(e) => update("vendor", e.target.value)}
                        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                    >
                        {vendorOptions.map((vendor) => (
                            <option key={vendor} value={vendor}>
                                {vendor === "all" ? "All" : vendor}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        Sort
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={filters.sortBy}
                            onChange={(e) =>
                                update(
                                    "sortBy",
                                    e.target.value as ResolutionFiltersType["sortBy"]
                                )
                            }
                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                        >
                            <option value="date">Date</option>
                            <option value="severity">Severity</option>
                            <option value="amount">Amount</option>
                            <option value="confidence">Confidence</option>
                        </select>

                        <select
                            value={filters.sortOrder}
                            onChange={(e) =>
                                update(
                                    "sortOrder",
                                    e.target.value as ResolutionFiltersType["sortOrder"]
                                )
                            }
                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition hover:cursor-pointer focus:border-emerald-400"
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                </label>
            </div>
        </section>
    );
}