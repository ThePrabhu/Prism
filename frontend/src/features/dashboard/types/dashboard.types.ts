export type WorkspaceMode =
    | "idle"
    | "creating"
    | "upload"
    | "processing"
    | "completed";

export type WorkspaceStatus =
    | "draft"
    | "processing"
    | "completed"
    | "failed";

export interface WorkspaceProcessing {
    stage:
        | "idle"
        | "uploading"
        | "ocr"
        | "graph"
        | "matching"
        | "analysis"
        | "completed";

    progress: number;
}

export interface WorkspaceGraph {
    nodes: number;
    edges: number;
}

export interface WorkspaceSummaryData {
    uploadedFiles: number;

    invoices: number;

    vendors: number;

    buyers: number;

    claimableITC: number;

    mismatches: number;
}

export interface Workspace {
    id: string;

    name: string;

    description?: string;

    createdAt: string;

    updatedAt: string;

    status: WorkspaceStatus;

    totalFiles: number;

    totalInvoices: number;

    totalAlerts: number;

    claimableItc: number;

    processing: WorkspaceProcessing;

    graph: WorkspaceGraph;

    summary: WorkspaceSummaryData;

    files: WorkspaceFile[];

    chat: WorkspaceChatMessage[];
}
/* ==========================================================
   FILES
========================================================== */

export type WorkspaceFileStatus =
    | "queued"
    | "uploading"
    | "uploaded"
    | "processing"
    | "completed"
    | "failed";

export interface WorkspaceFile {
    id: string;

    workspaceId: string;

    name: string;

    size: number;

    mimeType: string;

    extension: string;

    progress: number;

    status: WorkspaceFileStatus;

    uploadedAt?: string;
}

/* ==========================================================
   PROCESSING
========================================================== */

export type ProcessingStage =
    | "idle"
    | "uploading"
    | "ocr"
    | "parsing"
    | "graph"
    | "matching"
    | "analysis"
    | "completed"
    | "failed";

export interface ProcessingStep {
    id: string;

    label: string;

    description: string;

    completed: boolean;

    active: boolean;
}

/* ==========================================================
   AI CHAT
========================================================== */

export interface WorkspaceChatMessage {
    id: string;

    workspaceId: string;

    role: "user" | "assistant";

    message: string;

    createdAt: string;
}

/* ==========================================================
   GRAPH
========================================================== */

export interface GraphStatistics {
    totalNodes: number;

    totalEdges: number;

    vendors: number;

    buyers: number;

    invoices: number;

    mismatches: number;
}

/* ==========================================================
   SUMMARY
========================================================== */

export interface WorkspaceSummary {
    totalInvoices: number;

    matchedInvoices: number;

    unmatchedInvoices: number;

    highRiskInvoices: number;

    totalVendors: number;

    claimableItc: number;
}

/* ==========================================================
   ALERTS
========================================================== */

export type AlertSeverity =
    | "low"
    | "medium"
    | "high";

export interface WorkspaceAlert {
    id: string;

    workspaceId: string;

    title: string;

    description: string;

    severity: AlertSeverity;

    resolved: boolean;
}

