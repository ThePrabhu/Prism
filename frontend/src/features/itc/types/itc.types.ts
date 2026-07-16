/* ==========================================================
   ITC SUMMARY
========================================================== */

export interface ITCSummary {
    workspaceId: string;

    totalInvoices: number;

    matchedInvoices: number;

    mismatchedInvoices: number;

    claimableITC: number;

    blockedITC: number;

    recoverableITC: number;

    totalVendors: number;

    lastUpdated: string;
}

/* ==========================================================
   ITC TABLE
========================================================== */

export type ITCStatus =
    | "claimable"
    | "blocked"
    | "recovered"
    | "pending";

export type ITCReason =
    | "Missing GSTR-2B"
    | "GSTIN Mismatch"
    | "Invoice Not Filed"
    | "Tax Difference"
    | "Duplicate Invoice"
    | "Manual Verification";

export interface ITCRecord {
    id: string;

    workspaceId: string;

    invoiceNumber: string;

    vendorName: string;

    vendorGSTIN: string;

    invoiceAmount: number;

    taxAmount: number;

    blockedITC: number;

    recoverableITC: number;

    reason: ITCReason;

    confidence: number;

    status: ITCStatus;

    resolutionCaseId?: string;

    createdAt: string;
}

/* ==========================================================
   FILTERS
========================================================== */

export interface ITCFilters {
    search: string;

    status:
        | "all"
        | ITCStatus;

    reason:
        | "all"
        | ITCReason;
}