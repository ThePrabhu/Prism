export interface FAQItem {
    question: string;
    answer: string;
}

export const faqData: FAQItem[] = [
    {
        question: "What is Prism?",
        answer:
            "Prism is an AI-powered GST reconciliation platform that helps businesses detect mismatches, recover Input Tax Credit, monitor vendor compliance, and simplify GST workflows.",
    },

    {
        question: "Who is Prism built for?",
        answer:
            "Prism is designed for finance teams, CA firms, GST consultants, enterprises, auditors, and businesses that manage GST compliance regularly.",
    },

    {
        question: "How does Prism detect GST mismatches?",
        answer:
            "Prism compares invoices, purchase registers, GSTR-1, GSTR-2B and related GST records using intelligent reconciliation to identify discrepancies instantly.",
    },

    {
        question: "Can Prism help recover Input Tax Credit (ITC)?",
        answer:
            "Yes. Prism identifies blocked or missing ITC opportunities and highlights reconciliation issues that may prevent eligible tax credit claims.",
    },

    {
        question: "Is my GST data secure?",
        answer:
            "Security is a core design principle. All uploaded GST records are processed securely, and enterprise deployments can include additional access controls and audit logging.",
    },

    {
        question: "Will Prism support payments and subscriptions?",
        answer:
            "Yes. Prism is designed with subscription-ready architecture, allowing users to upgrade plans and unlock premium AI-powered capabilities in future releases.",
    },
];