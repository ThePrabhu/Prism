import {
    AlertTriangle,
    Clock3,
    IndianRupee,
    Network,
    type LucideIcon,
} from "lucide-react";

export interface Problem {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const problemData: Problem[] = [
    {
        icon: AlertTriangle,

        title: "Hidden GST Mismatches",

        description:
            "Invoice discrepancies often remain unnoticed until filing deadlines, leading to compliance risks and avoidable penalties.",
    },

    {
        icon: Clock3,

        title: "Manual Reconciliation",

        description:
            "Finance teams spend countless hours comparing GSTR-1, GSTR-2B and purchase registers every month.",
    },

    {
        icon: IndianRupee,

        title: "Lost Input Tax Credit",

        description:
            "Eligible ITC is missed because mismatches are detected too late in the reconciliation process.",
    },

    {
        icon: Network,

        title: "Disconnected GST Data",

        description:
            "Invoices, vendors and GST filings remain scattered across multiple systems with no unified view.",
    },
];