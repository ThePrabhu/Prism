import "@xyflow/react/dist/style.css";

import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";

import { useDashboardStore } from "../../store/dashboardStore";

export default function GraphCanvas() {
    const uploadResult = useDashboardStore(
        (state) => state.uploadResult
    );

    const graph = uploadResult?.graph;

    if (!graph) {
        return (
            <div
                className="
                    flex
                    h-[650px]
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-zinc-200
                    text-zinc-500
                "
            >
                No graph generated yet.
            </div>
        );
    }

    return (
        <div
            className="
                h-[650px]
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
            "
        >
            <ReactFlow
                fitView
                nodes={graph.nodes ?? []}
                edges={graph.edges ?? []}
            >
                <MiniMap />
                <Controls />
                <Background gap={18} />
            </ReactFlow>
        </div>
    );
}