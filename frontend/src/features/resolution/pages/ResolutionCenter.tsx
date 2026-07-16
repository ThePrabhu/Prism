import { useMemo, useState } from "react";

import { useDashboardStore } from "../../dashboard/store/dashboardStore";
import ResolutionHeader from "../components/ResolutionHeader";
import ResolutionFilters from "../components/ResolutionFilters";
import ResolutionTable from "../components/ResolutionTable";
import ResolutionDrawer from "../components/ResolutionDrawer";

import ExplainPanel from "../components/ExplainPanel";
import AskAIPanel from "../components/AskAIPanel";
import GenerateEmailModal from "../components/GenerateEmailModal";


import type {
    ResolutionCase,
    ResolutionFilters as ResolutionFiltersType,
} from "../types/resolution.types";

function createMockCases(workspaceId: string | null): ResolutionCase[] {
    const id = workspaceId ?? "workspace-demo";

    return [
        {
            id: "case-1",
            workspaceId: id,
            invoiceNumber: "INV-2038",
            vendorName: "ABC Pvt Ltd",
            vendorGSTIN: "29ABCDE1234F1Z5",
            issueType: "invoice_missing",
            title: "Invoice Missing in GSTR-2B",
            description:
                "Invoice exists in purchase records but is missing from supplier GSTR-2B.",
            severity: "critical",
            status: "open",
            blockedAmount: 12400,
            recoverableAmount: 12400,
            confidence: 98,
            aiRecommendation:
                "Contact supplier and request corrected filing. Generate a reminder email.",
            createdAt: "2026-07-15T10:30:00.000Z",
            updatedAt: "2026-07-15T10:30:00.000Z",
        },
        {
            id: "case-2",
            workspaceId: id,
            invoiceNumber: "INV-2112",
            vendorName: "XYZ Ltd",
            vendorGSTIN: "27XYZAB1234C1Z2",
            issueType: "gstin_mismatch",
            title: "GSTIN Mismatch Detected",
            description:
                "GSTIN in the invoice does not match the GSTIN submitted in GSTR data.",
            severity: "high",
            status: "in_progress",
            blockedAmount: 8200,
            recoverableAmount: 8200,
            confidence: 94,
            aiRecommendation:
                "Verify vendor GSTIN and request corrected invoice documentation.",
            createdAt: "2026-07-15T11:00:00.000Z",
            updatedAt: "2026-07-15T11:20:00.000Z",
        },
        {
            id: "case-3",
            workspaceId: id,
            invoiceNumber: "INV-2231",
            vendorName: "Omni Traders",
            vendorGSTIN: "24OMNITR1234G1Z7",
            issueType: "tax_difference",
            title: "Tax Amount Difference",
            description:
                "Tax amount in invoice differs from the amount reflected in matching records.",
            severity: "medium",
            status: "open",
            blockedAmount: 5600,
            recoverableAmount: 4300,
            confidence: 89,
            aiRecommendation:
                "Compare line-item totals and request a revised invoice if needed.",
            createdAt: "2026-07-14T14:15:00.000Z",
            updatedAt: "2026-07-14T14:15:00.000Z",
        },
        {
            id: "case-4",
            workspaceId: id,
            invoiceNumber: "INV-2299",
            vendorName: "Prime Supplies",
            vendorGSTIN: "33PRIME1234K1Z8",
            issueType: "duplicate_invoice",
            title: "Duplicate Invoice Detected",
            description:
                "The same invoice appears more than once in uploaded records.",
            severity: "low",
            status: "resolved",
            blockedAmount: 3100,
            recoverableAmount: 3100,
            confidence: 92,
            aiRecommendation:
                "Mark the duplicate as resolved and keep the latest valid record.",
            createdAt: "2026-07-13T09:10:00.000Z",
            updatedAt: "2026-07-15T08:40:00.000Z",
        },
    ];
}

export default function ResolutionCenter() {
    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    const activeWorkspace = useDashboardStore((state) =>
        state.workspaces.find(
            (workspace) => workspace.id === activeWorkspaceId
        )
    );

    const [filters, setFilters] =
        useState<ResolutionFiltersType>({
            search: "",
            severity: "all",
            status: "all",
            issueType: "all",
            vendor: "all",
            sortBy: "date",
            sortOrder: "desc",
        });

    const [selectedCase, setSelectedCase] =
    useState<ResolutionCase | null>(null);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [showExplain, setShowExplain] =
        useState(false);

    const [showEmail, setShowEmail] =
        useState(false);

    const [showAI, setShowAI] =
        useState(false);

    const cases = useMemo(() => {
        return createMockCases(activeWorkspaceId).filter(
            (item) =>
                item.workspaceId === activeWorkspaceId ||
                !activeWorkspaceId
        );
    }, [activeWorkspaceId]);

    const vendors = useMemo(() => {
        return Array.from(
            new Set(cases.map((item) => item.vendorName))
        );
    }, [cases]);

    const filteredCases = useMemo(() => {
        const search = filters.search.trim().toLowerCase();

        return cases
            .filter((item) => {
                if (filters.severity !== "all" && item.severity !== filters.severity) {
                    return false;
                }

                if (filters.status !== "all" && item.status !== filters.status) {
                    return false;
                }

                if (filters.issueType !== "all" && item.issueType !== filters.issueType) {
                    return false;
                }

                if (filters.vendor !== "all" && item.vendorName !== filters.vendor) {
                    return false;
                }

                if (!search) return true;

                return [
                    item.title,
                    item.description,
                    item.vendorName,
                    item.vendorGSTIN,
                    item.invoiceNumber,
                ].some((field) =>
                    field.toLowerCase().includes(search)
                );
            })
            .sort((a, b) => {
                const order = filters.sortOrder === "asc" ? 1 : -1;

                if (filters.sortBy === "date") {
                    return (
                        order *
                        (new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime())
                    );
                }

                if (filters.sortBy === "amount") {
                    return order * (a.blockedAmount - b.blockedAmount);
                }

                if (filters.sortBy === "confidence") {
                    return order * (a.confidence - b.confidence);
                }

                const severityWeight: Record<
                    ResolutionCase["severity"],
                    number
                > = {
                    critical: 4,
                    high: 3,
                    medium: 2,
                    low: 1,
                };

                return (
                    order *
                    (severityWeight[a.severity] -
                        severityWeight[b.severity])
                );
            });
    }, [cases, filters]);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-8">
            <ResolutionHeader />

            <ResolutionFilters
                filters={filters}
                onChange={setFilters}
                vendors={vendors}
            />

            <ResolutionTable
            cases={filteredCases}
            selectedCaseId={selectedCase?.id ?? null}
            onSelectCase={(item) => {
                setSelectedCase(item);
                setDrawerOpen(true);
            }}

            />

           <ResolutionDrawer
                open={drawerOpen}
                resolutionCase={selectedCase}
                onClose={() => {
                    setDrawerOpen(false);
                    setShowExplain(false);
                    setShowAI(false);
                }}
                onExplain={() => {
                    setShowExplain(true);
                    setShowAI(false);
                }}
                onAskAI={() => {
                    setShowAI(true);
                    setShowExplain(false);
                }}
                onGenerateEmail={() => {
                    setShowEmail(true);
                }}
            />

            {drawerOpen &&
                selectedCase &&
                showExplain && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-[60]
                            overflow-y-auto
                            bg-white
                        "
                    >
                        <div
                            className="
                                mx-auto
                                max-w-5xl
                                p-8
                            "
                        >
                            <ExplainPanel
                                resolutionCase={selectedCase}
                            />
                        </div>
                    </div>
                )}

                {drawerOpen &&
                selectedCase &&
                showAI && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-[60]
                            overflow-y-auto
                            bg-white
                        "
                    >
                        <div
                            className="
                                mx-auto
                                max-w-5xl
                                p-8"
                            >
                            <AskAIPanel
                                resolutionCase={selectedCase}
                            />
                        </div>
                    </div>
                )}

                <GenerateEmailModal
                open={showEmail}
                resolutionCase={selectedCase}
                onClose={() => setShowEmail(false)}
                onSend={(payload: any) => {
                    console.log(payload);

                    setShowEmail(false);
                }}
            />

            {!activeWorkspace && (
                <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
                    Create or select a workspace to review resolution cases.
                </div>
            )}
        </main>
    );
}