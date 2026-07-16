export type ResolutionSeverity =
    | "critical"
    | "high"
    | "medium"
    | "low";

export type ResolutionStatus =
    | "open"
    | "in_progress"
    | "resolved";

export type ResolutionType =
    | "invoice_missing"
    | "gstin_mismatch"
    | "tax_difference"
    | "duplicate_invoice"
    | "invoice_date_mismatch"
    | "vendor_not_filed"
    | "itc_blocked"
    | "other";

export interface ResolutionCase {
    id: string;

    workspaceId: string;

    invoiceNumber: string;

    vendorName: string;

    vendorGSTIN: string;

    issueType: ResolutionType;

    title: string;

    description: string;

    severity: ResolutionSeverity;

    status: ResolutionStatus;

    blockedAmount: number;

    recoverableAmount: number;

    confidence: number;

    aiRecommendation: string;

    createdAt: string;

    updatedAt: string;
}

export interface ResolutionSummary {
    totalCases: number;

    openCases: number;

    resolvedCases: number;

    criticalCases: number;

    totalBlockedAmount: number;

    totalRecoverableAmount: number;
}

export interface ResolutionFilters {
    search: string;

    severity: ResolutionSeverity | "all";

    status: ResolutionStatus | "all";

    issueType: ResolutionType | "all";

    vendor: string;

    sortBy:
        | "severity"
        | "amount"
        | "date"
        | "confidence";

    sortOrder:
        | "asc"
        | "desc";
}

export interface ResolutionState {
    cases: ResolutionCase[];

    selectedCase: ResolutionCase | null;

    filters: ResolutionFilters;

    loading: boolean;

    summary: ResolutionSummary;
}