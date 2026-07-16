import { useMemo } from "react";

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

import ITCHeader from "../components/ITCHeader";
import ITCTable from "../components/ITCTable";
import ITCSummary from "../components/ITCSummary";

import type { ITCRecord } from "../types/itc.types";

function createMockITCRecords(
    workspaceId: string | null
): ITCRecord[] {

    const id = workspaceId ?? "workspace-demo";

    return [

        {
            id: "itc-1",

            workspaceId: id,

            invoiceNumber: "INV-1024",

            vendorName: "ABC Industries",

            vendorGSTIN: "29ABCDE1234F1Z5",

            invoiceAmount: 125000,

            taxAmount: 22500,

            blockedITC: 22500,

            recoverableITC: 22500,

            reason: "Missing GSTR-2B",

            confidence: 97,

            status: "blocked",

            resolutionCaseId: "case-1",

            createdAt: new Date().toISOString(),
        },

        {
            id: "itc-2",

            workspaceId: id,

            invoiceNumber: "INV-1108",

            vendorName: "Prime Traders",

            vendorGSTIN: "27PQRSX4567L1Z2",

            invoiceAmount: 68000,

            taxAmount: 12240,

            blockedITC: 12240,

            recoverableITC: 12240,

            reason: "GSTIN Mismatch",

            confidence: 92,

            status: "pending",

            resolutionCaseId: "case-2",

            createdAt: new Date().toISOString(),
        },

        {
            id: "itc-3",

            workspaceId: id,

            invoiceNumber: "INV-1182",

            vendorName: "Delta Solutions",

            vendorGSTIN: "33XYZAB9876Q1Z8",

            invoiceAmount: 48000,

            taxAmount: 8640,

            blockedITC: 0,

            recoverableITC: 8640,

            reason: "Invoice Not Filed",

            confidence: 89,

            status: "claimable",

            resolutionCaseId: "case-3",

            createdAt: new Date().toISOString(),
        },

    ];
}

export default function ITCCenter() {

    const activeWorkspaceId =
        useDashboardStore(
            (state) => state.activeWorkspaceId
        );

    const activeWorkspace =
        useDashboardStore((state) =>
            state.workspaces.find(
                (workspace) =>
                    workspace.id ===
                    activeWorkspaceId
            )
        );

    const records = useMemo(() => {

        return createMockITCRecords(
            activeWorkspaceId
        );

    }, [activeWorkspaceId]);

    if (!activeWorkspace) {

        return (

            <main
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    justify-center
                    py-32
                "
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                    "
                >
                    No Workspace Selected
                </h2>

                <p
                    className="
                        mt-4
                        text-zinc-500
                    "
                >
                    Select a workspace to
                    view recoverable ITC.
                </p>

            </main>

        );

    }

    return (

        <main
            className="
                mx-auto
                flex
                w-full
                max-w-7xl
                flex-col
                gap-8
                px-8
                py-8
            "
        >

            <ITCHeader
                workspace={activeWorkspace}
            />

            <ITCTable
                records={records}
            />

            <ITCSummary
                workspace={activeWorkspace}
            />

        </main>

    );

}