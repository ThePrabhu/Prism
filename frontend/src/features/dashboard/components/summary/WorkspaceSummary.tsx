import SummaryHeader from "./SummaryHeader";
import SummaryTable from "./SummaryTable";
import { useDashboardStore } from "../../store/dashboardStore";



export default function WorkspaceSummary() {
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
                mt-12
                rounded-[34px]
                border
                border-zinc-200
                bg-white
                p-8
                shadow-[0_18px_45px_rgba(15,23,42,.05)]
            "
        >
            <SummaryHeader />

            <SummaryTable />
        </section>
    );
}