export interface PricingPlan {
    title: string;
    monthly: string;
    yearly: string;
    description: string;
    button: string;
    popular?: boolean;
    features: string[];
}

export const pricingData: PricingPlan[] = [
    {
        title: "Starter",
        monthly: "Free",
        yearly: "Free",
        description:
            "Perfect for students and small businesses getting started.",

        button: "Get Started",

        features: [
            "Upload GST Files",
            "Basic Dashboard",
            "Limited Reconciliation",
            "Knowledge Graph Preview",
            "Community Support",
        ],
    },

    {
        title: "Professional",

        monthly: "₹149",

        yearly: "₹1599",

        description:
            "Best for finance teams and GST professionals.",

        button: "Choose Professional",

        popular: true,

        features: [
            "Unlimited Reconciliation",
            "Vendor Intelligence",
            "AI Copilot",
            "Email Notifications",
            "Compliance Alerts",
            "Priority Support",
        ],
    },

    {
        title: "Enterprise",

        monthly: "₹199",

        yearly: "₹1999",

        description:
            "Advanced workflows for enterprises and CA firms.",

        button: "Contact Sales",

        features: [
            "Everything in Professional",
            "Unlimited Organizations",
            "Advanced Reports",
            "Audit Dashboard",
            "API Access",
            "Dedicated Support",
        ],
    },
];