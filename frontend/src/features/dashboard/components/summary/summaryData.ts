export interface SummaryRow {
    id: string;

    source: string;

    status:
        | "Matched"
        | "Partial"
        | "Review"
        | "Pending"
        | "Synced";

    records: number;

    issues: number;

    impact: string;

    updated: string;
}

export const summaryRows: SummaryRow[] = [
    {
        id: "1",
        source: "GSTR-1",
        status: "Matched",
        records: 24530,
        issues: 2,
        impact: "₹1,85,000",
        updated: "2 min ago",
    },
    {
        id: "2",
        source: "GSTR-2B",
        status: "Partial",
        records: 18320,
        issues: 5,
        impact: "₹1,12,500",
        updated: "2 min ago",
    },
    {
        id: "3",
        source: "Invoices",
        status: "Review",
        records: 24540,
        issues: 8,
        impact: "₹2,30,000",
        updated: "2 min ago",
    },
    {
        id: "4",
        source: "Purchase Register",
        status: "Pending",
        records: 18320,
        issues: 3,
        impact: "₹90,000",
        updated: "2 min ago",
    },
];