import { Building2, Factory, Landmark, ShoppingBag } from "lucide-react";

export const useCasesData = [
    {
        title: "Mid-market finance",
        audience: "CFO and finance ops",
        description:
            "Centralize monthly reconciliations and keep leadership aligned on GST exposure without adding more manual review steps.",
        icon: Building2,
    },
    {
        title: "Manufacturing",
        audience: "Shared services and tax",
        description:
            "Track vendor mismatches, blocked credits, and plant-level exceptions across multiple entities and locations.",
        icon: Factory,
    },
    {
        title: "Retail and distribution",
        audience: "Controllers and compliance",
        description:
            "Monitor high-volume invoice flows and surface the most important filing exceptions before deadlines compress.",
        icon: ShoppingBag,
    },
    {
        title: "Advisory and audit",
        audience: "External practitioners",
        description:
            "Use explainable outputs to move from sample checking to targeted recommendations that clients can trust.",
        icon: Landmark,
    },
];