import GraphHeader from "./GraphHeader";
import EntityFilterBar from "./EntityFilterBar";
// import SourceFilterBar from "./SourceFilterBar";
import GraphCanvas from "./GraphCanvas";
import { useDashboardStore } from "../../store/dashboardStore";


export default function GraphWorkspace() {
        const workspaces = useDashboardStore(
        (state) => state.workspaces
    );

    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    const activeWorkspace = workspaces.find(
        (workspace) =>
            workspace.id === activeWorkspaceId
    );
    if (!activeWorkspace) {
    return null;
    }
    return (
        <section
            className="
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-6
                shadow-sm
            "
        >
            <GraphHeader />

            <div className="mt-6">
                <EntityFilterBar />
            </div>

             <div className="mt-8">
                <GraphCanvas />
            </div>

        </section>
    );
}