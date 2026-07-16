import type { PrismGraphData } from "./graph.types";

export const graphData: PrismGraphData = {
    nodes: [
        {
            id: "vendor",
            position: { x: 0, y: 120 },
            data: { label: "Vendor" },
            type: "default",
        },

        {
            id: "invoice",
            position: { x: 270, y: 0 },
            data: { label: "Invoices" },
            type: "default",
        },

        {
            id: "knowledge",
            position: { x: 560, y: 120 },
            data: { label: "Knowledge Graph" },
            type: "default",
        },

        {
            id: "buyer",
            position: { x: 270, y: 240 },
            data: { label: "Buyer" },
            type: "default",
        },

        {
            id: "itc",
            position: { x: 860, y: 120 },
            data: { label: "ITC" },
            type: "default",
        },

        {
            id: "alert",
            position: { x: 1120, y: 120 },
            data: { label: "Resolution" },
            type: "default",
        },
    ],

    edges: [
        {
            id: "1",
            source: "vendor",
            target: "invoice",
            animated: true,
        },

        {
            id: "2",
            source: "invoice",
            target: "knowledge",
            animated: true,
        },

        {
            id: "3",
            source: "buyer",
            target: "knowledge",
            animated: true,
        },

        {
            id: "4",
            source: "knowledge",
            target: "itc",
            animated: true,
        },

        {
            id: "5",
            source: "itc",
            target: "alert",
            animated: true,
        },
    ],
};