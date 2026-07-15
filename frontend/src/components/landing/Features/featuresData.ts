import type { ReactNode } from "react";

export interface Feature {
    title: string;
    description: string;
    size: "large" | "medium";
    visual?: ReactNode;
}

export const featureData: Feature[] = [
    {
        title: "AI GST Reconciliation",
        description:
            "Match GSTR-1, GSTR-2B, purchase registers and invoices in one workspace with clear exception handling.",
        size: "large",
    },
    {
        title: "GST Knowledge Graph",
        description:
            "Visualize relationships across vendors, invoices, filings and notices to understand every GST dependency.",
        size: "medium",
    },
    {
        title: "AI Copilot",
        description:
            "Ask why mismatches happened and get explainable answers your finance team can act on immediately.",
        size: "medium",
    },
    {
        title: "Vendor Intelligence",
        description:
            "Monitor vendor health, filing behavior and compliance risk before it affects your Input Tax Credit.",
        size: "medium",
    },
    {
        title: "Compliance Alerts",
        description:
            "Catch missing filings, blocked ITC and reconciliation risks early with prioritized alerts.",
        size: "medium",
    },
    {
        title: "Reports and Insights",
        description:
            "Turn reconciliation activity into clear summaries, trend reports and decision-ready finance insights.",
        size: "medium",
    },
];
