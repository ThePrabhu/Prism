import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
    Workspace,
    WorkspaceMode,
    WorkspaceFile,
    WorkspaceChatMessage,
    ProcessingStage,
    ProcessingStep,
} from "../types/dashboard.types";

export type DashboardSection =
    | "home"
    | "resolution"
    | "itc"
    | "copilot"
    | "settings";

/* ==========================================================
   INITIAL PROCESSING STEPS
========================================================== */

const initialProcessingSteps: ProcessingStep[] = [
    {
        id: "upload",
        label: "Uploading",
        description: "Uploading GST files",
        completed: false,
        active: false,
    },
    {
        id: "ocr",
        label: "OCR",
        description: "Reading uploaded files",
        completed: false,
        active: false,
    },
    {
        id: "parser",
        label: "Parser",
        description: "Extracting invoice data",
        completed: false,
        active: false,
    },
    {
        id: "graph",
        label: "Knowledge Graph",
        description: "Building Neo4j graph",
        completed: false,
        active: false,
    },
    {
        id: "matching",
        label: "Matching",
        description: "Reconciling invoices",
        completed: false,
        active: false,
    },
    {
        id: "analysis",
        label: "AI Analysis",
        description: "Generating compliance report",
        completed: false,
        active: false,
    },
];

export interface DashboardSummary {
    total_invoices: number;
    mismatches: number;
    claimable_itc: number;
}

export interface GraphNode {
    id: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
    [key: string]: unknown;
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    [key: string]: unknown;
}

export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export interface UploadResult {
    dashboard: DashboardSummary;
    graph: GraphData;
    itc: unknown;
    resolution: unknown;
}

export interface DashboardStore {

    /* =========================
       UI
    ========================= */

    sidebarCollapsed: boolean;

    activeSection: DashboardSection;

    workspaceMode: WorkspaceMode;

    toggleSidebar: () => void;

    setSidebarCollapsed: (collapsed: boolean) => void;

    setActiveSection: (
        section: DashboardSection
    ) => void;

    setWorkspaceMode: (
        mode: WorkspaceMode
    ) => void;

    /* =========================
       WORKSPACES
    ========================= */

    workspaces: Workspace[];

    activeWorkspaceId: string | null;

    createWorkspace: (
        workspace: Workspace
    ) => void;

    selectWorkspace: (
        id: string
    ) => void;

    renameWorkspace: (
        id: string,
        name: string
    ) => void;

    deleteWorkspace: (
        id: string
    ) => void;

    addFilesToWorkspace: (
        workspaceId: string,
        files: WorkspaceFile[]
    ) => void;

    removeFileFromWorkspace: (
        workspaceId: string,
        fileId: string
    ) => void;

    setWorkspaceStatus: (
        workspaceId: string,
        status: Workspace["status"]
    ) => void;

    /* =========================
       FILES
    ========================= */

    selectedFiles: WorkspaceFile[];

    setSelectedFiles: (
        files: WorkspaceFile[]
    ) => void;

    uploadProgress: number;

    setUploadProgress: (
        progress: number
    ) => void;

    uploadResult: UploadResult | null;

    setUploadResult: (
        result: UploadResult
    ) => void;

    /* =========================
       PROCESSING
    ========================= */

    processingStage: ProcessingStage;

    processingSteps: ProcessingStep[];

    setProcessingStage: (
        stage: ProcessingStage
    ) => void;

    setProcessingSteps: (
        steps: ProcessingStep[]
    ) => void;

    /* =========================
       CHAT
    ========================= */

    messages: WorkspaceChatMessage[];

    addMessage: (
        message: WorkspaceChatMessage
    ) => void;
}

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set) => ({

            /* UI */

            sidebarCollapsed: false,

            activeSection: "home",

            workspaceMode: "idle",

            toggleSidebar: () =>
                set((state) => ({
                    sidebarCollapsed:
                        !state.sidebarCollapsed,
                })),

            setSidebarCollapsed: (
                collapsed
            ) =>
                set({
                    sidebarCollapsed:
                        collapsed,
                }),

            setActiveSection: (
                section
            ) =>
                set({
                    activeSection:
                        section,
                }),

            setWorkspaceMode: (
                mode
            ) =>
                set({
                    workspaceMode:
                        mode,
                }),

            /* Workspace */

            workspaces: [],

            activeWorkspaceId: null,

        createWorkspace: (workspace) =>
            set((state) => ({
                workspaces: [
                    workspace,
                    ...state.workspaces,
                ],

                activeWorkspaceId: workspace.id,

                // Reset dashboard for new workspace
                workspaceMode: "idle",

                selectedFiles: [],

                uploadProgress: 0,

                processingStage: "idle",

                processingSteps: initialProcessingSteps,

                messages: [],
            })),

            selectWorkspace: (
                id
            ) =>
                set({
                    activeWorkspaceId:
                        id,
                }),

            renameWorkspace: (
                id,
                name
            ) =>
                set((state) => ({
                    workspaces:
                        state.workspaces.map(
                            (workspace) =>
                                workspace.id === id
                                    ? {
                                          ...workspace,
                                          name,
                                      }
                                    : workspace
                        ),
                })),

            deleteWorkspace: (
                id
            ) =>
                set((state) => ({
                    workspaces:
                        state.workspaces.filter(
                            (workspace) =>
                                workspace.id !== id
                        ),

                    activeWorkspaceId:
                        state.activeWorkspaceId === id
                            ? null
                            : state.activeWorkspaceId,
                })),

            addFilesToWorkspace: (
                workspaceId,
                files
            ) =>
                set((state) => ({
                    workspaces:
                        state.workspaces.map(
                            (workspace) => {
                                if (workspace.id !== workspaceId) {
                                    return workspace;
                                }

                                const workspaceFiles =
                                    workspace.files ?? [];

                                const updatedFiles = [
                                    ...workspaceFiles,
                                    ...files,
                                ];

                                return {
                                    ...workspace,
                                    files: updatedFiles,
                                    totalFiles:
                                        updatedFiles.length,
                                };
                            }
                        ),
                })),

            removeFileFromWorkspace: (
                workspaceId,
                fileId
            ) =>
                set((state) => ({
                    workspaces:
                        state.workspaces.map(
                            (workspace) => {
                                if (workspace.id !== workspaceId) {
                                    return workspace;
                                }

                                const files = (
                                    workspace.files ?? []
                                ).filter(
                                    (file) =>
                                        file.id !== fileId
                                );

                                return {
                                    ...workspace,
                                    files,
                                    totalFiles:
                                        files.length,
                                };
                            }
                        ),
                })),

            setWorkspaceStatus: (
                workspaceId,
                status
            ) =>
                set((state) => ({
                    workspaces:
                        state.workspaces.map(
                            (workspace) =>
                                workspace.id === workspaceId
                                    ? {
                                          ...workspace,
                                          status,
                                      }
                                    : workspace
                        ),
                })),

            /* Upload */

            selectedFiles: [],

            setSelectedFiles: (
                files
            ) =>
                set({
                    selectedFiles:
                        files,
                }),

            uploadProgress: 0,

            setUploadProgress: (
                progress
            ) =>
                set({
                    uploadProgress:
                        progress,
                }),

            uploadResult: null,

            setUploadResult: (result) =>
                set({
                    uploadResult: result,
                }),

            /* Processing */

            processingStage: "idle",

            processingSteps:
                initialProcessingSteps,

            setProcessingStage: (
                stage
            ) =>
                set({
                    processingStage:
                        stage,
                }),

            setProcessingSteps: (
                steps
            ) =>
                set({
                    processingSteps:
                        steps,
                }),

            /* Chat */

            messages: [],

            addMessage: (
                message
            ) =>
                set((state) => ({
                    messages: [
                        ...state.messages,
                        message,
                    ],
                })),
        }),
        {
            name: "prism-dashboard",

            storage:
                createJSONStorage(
                    () => localStorage
                ),

            partialize: (
                state
            ) => ({
                sidebarCollapsed:
                    state.sidebarCollapsed,

                activeSection:
                    state.activeSection,

                workspaceMode:
                    state.workspaceMode,

                workspaces:
                    state.workspaces,

                activeWorkspaceId:
                    state.activeWorkspaceId,

                uploadResult:
                    state.uploadResult,
            }),
        }
    )
);

export const getActiveWorkspace = (
    state: DashboardStore
) =>
    state.workspaces.find(
        (workspace) =>
            workspace.id ===
            state.activeWorkspaceId
    );