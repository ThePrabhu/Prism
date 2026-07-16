import { useDashboardStore } from "../store/dashboardStore";
import type { Workspace } from "../types/dashboard.types";

export function useWorkspace() {
    const workspaces = useDashboardStore(
        (state) => state.workspaces
    );

    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    const createWorkspace = useDashboardStore(
        (state) => state.createWorkspace
    );

    const selectWorkspace = useDashboardStore(
        (state) => state.selectWorkspace
    );

    const renameWorkspace = useDashboardStore(
        (state) => state.renameWorkspace
    );

    const deleteWorkspace = useDashboardStore(
        (state) => state.deleteWorkspace
    );

    const setWorkspaceMode = useDashboardStore(
        (state) => state.setWorkspaceMode
    );

    const setSelectedFiles = useDashboardStore(
        (state) => state.setSelectedFiles
    );

    const activeWorkspace =
        workspaces.find(
            (workspace) =>
                workspace.id === activeWorkspaceId
        ) ?? null;

    /* ==========================================================
       Dashboard State
    ========================================================== */

    const hasWorkspace = activeWorkspace !== null;

    const hasFiles =
        (activeWorkspace?.files?.length ?? 0) > 0;

    const stage =
        activeWorkspace?.processing?.stage ??
        "idle";

    const isProcessing =
        stage !== "idle" &&
        stage !== "completed";

    const isCompleted =
        stage === "completed";

    /* ==========================================================
       Create Workspace
    ========================================================== */

    function createNewWorkspace(data: {
        name: string;
        description?: string;
    }) {
        const workspace: Workspace = {
            id: crypto.randomUUID(),

            name:
                data.name.trim() ||
                "Untitled Workspace",

            description:
                data.description ?? "",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),

            status: "draft",

            totalFiles: 0,

            totalInvoices: 0,

            totalAlerts: 0,

            claimableItc: 0,

            processing: {
                stage: "idle",
                progress: 0,
            },

            graph: {
                nodes: 0,
                edges: 0,
            },

            summary: {
                uploadedFiles: 0,
                invoices: 0,
                vendors: 0,
                buyers: 0,
                claimableITC: 0,
                mismatches: 0,
            },

            files: [],

            chat: [],
        };

        createWorkspace(workspace);

        /*
        Reset Dashboard
        */

        setSelectedFiles([]);

        setWorkspaceMode("idle");

        return workspace;
    }

    return {
        workspaces,

        activeWorkspace,

        hasWorkspace,

        hasFiles,

        isProcessing,

        isCompleted,

        createWorkspace,

        createNewWorkspace,

        selectWorkspace,

        renameWorkspace,

        deleteWorkspace,
    };
}