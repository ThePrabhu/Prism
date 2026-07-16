import "@xyflow/react/dist/style.css";

import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";

import { graphData } from "./graphData";

export default function GraphCanvas() {
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
                nodes={graphData.nodes}
                edges={graphData.edges}
            >
                <MiniMap />

                <Controls />

                <Background gap={18} />
            </ReactFlow>
        </div>
    );
}