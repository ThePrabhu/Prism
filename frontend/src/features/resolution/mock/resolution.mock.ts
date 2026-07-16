// src/features/resolution/mock/resolution.mock.ts

import type {
    ResolutionCase,
    ResolutionSummary,
} from "../types/resolution.types";

export const resolutionCases: ResolutionCase[] = [
    {
        id: "case-001",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2038",

        vendorName: "ABC Pvt Ltd",

        vendorGSTIN: "29ABCDE1234F1Z5",

        issueType: "invoice_missing",

        title: "Invoice Missing in GSTR-2B",

        description:
            "Invoice exists in purchase register but is missing in supplier GSTR-2B.",

        severity: "critical",

        status: "open",

        blockedAmount: 12400,

        recoverableAmount: 12400,

        confidence: 98,

        aiRecommendation:
            "Request supplier to upload the missing invoice in the next GST filing.",

        createdAt: "2026-07-18T09:30:00Z",

        updatedAt: "2026-07-18T09:30:00Z",
    },

    {
        id: "case-002",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2081",

        vendorName: "XYZ Industries",

        vendorGSTIN: "27XYZAB4567A1Z3",

        issueType: "gstin_mismatch",

        title: "GSTIN Mismatch",

        description:
            "Vendor GSTIN does not match uploaded invoice.",

        severity: "high",

        status: "in_progress",

        blockedAmount: 8500,

        recoverableAmount: 8500,

        confidence: 95,

        aiRecommendation:
            "Verify GSTIN with supplier before claiming ITC.",

        createdAt: "2026-07-17T10:40:00Z",

        updatedAt: "2026-07-18T08:15:00Z",
    },

    {
        id: "case-003",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2135",

        vendorName: "Delta Traders",

        vendorGSTIN: "24DELTA7788H1Z9",

        issueType: "tax_difference",

        title: "Tax Amount Difference",

        description:
            "GST amount differs between uploaded invoice and GSTR data.",

        severity: "medium",

        status: "open",

        blockedAmount: 3200,

        recoverableAmount: 3200,

        confidence: 90,

        aiRecommendation:
            "Verify tax calculations before filing.",

        createdAt: "2026-07-16T13:00:00Z",

        updatedAt: "2026-07-16T13:00:00Z",
    },

    {
        id: "case-004",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2140",

        vendorName: "Prime Supplies",

        vendorGSTIN: "33PRIME9876K1Z2",

        issueType: "duplicate_invoice",

        title: "Duplicate Invoice",

        description:
            "Duplicate invoice detected across uploaded documents.",

        severity: "low",

        status: "resolved",

        blockedAmount: 1500,

        recoverableAmount: 1500,

        confidence: 99,

        aiRecommendation:
            "Ignore duplicate entry and keep latest invoice.",

        createdAt: "2026-07-15T14:20:00Z",

        updatedAt: "2026-07-17T09:10:00Z",
    },

    {
        id: "case-005",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2202",

        vendorName: "Omni Logistics",

        vendorGSTIN: "29OMNI3344P1Z8",

        issueType: "vendor_not_filed",

        title: "Vendor Return Not Filed",

        description:
            "Vendor has not yet filed corresponding GST return.",

        severity: "critical",

        status: "open",

        blockedAmount: 28100,

        recoverableAmount: 28100,

        confidence: 99,

        aiRecommendation:
            "Contact vendor immediately and request filing before due date.",

        createdAt: "2026-07-18T08:45:00Z",

        updatedAt: "2026-07-18T08:45:00Z",
    },

    {
        id: "case-006",
        workspaceId: "workspace-001",

        invoiceNumber: "INV-2225",

        vendorName: "Skyline Tech",

        vendorGSTIN: "29SKY12345A1Z7",

        issueType: "itc_blocked",

        title: "Blocked ITC",

        description:
            "Invoice qualifies for ITC but is currently blocked because of mismatch.",

        severity: "high",

        status: "in_progress",

        blockedAmount: 19200,

        recoverableAmount: 19200,

        confidence: 97,

        aiRecommendation:
            "Resolve mismatch and reclaim ITC.",

        createdAt: "2026-07-18T09:00:00Z",

        updatedAt: "2026-07-18T09:20:00Z",
    },
];

export const resolutionSummary: ResolutionSummary = {
    totalCases: 6,

    openCases: 4,

    resolvedCases: 1,

    criticalCases: 2,

    totalBlockedAmount: 72900,

    totalRecoverableAmount: 72900,
};