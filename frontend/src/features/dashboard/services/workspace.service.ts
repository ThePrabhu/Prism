import { apiClient } from "../api/client";
import type { Workspace } from "../types/dashboard.types";

class WorkspaceService {
    async createWorkspace(
        workspace: Partial<Workspace>
    ) {
        return apiClient.post<Workspace>(
            "/workspaces",
            workspace
        );
    }

    async getWorkspace(id: string) {
        return apiClient.get<Workspace>(
            `/workspaces/${id}`
        );
    }

    async getAllWorkspaces() {
        return apiClient.get<Workspace[]>(
            "/workspaces"
        );
    }

    async renameWorkspace(
        id: string,
        name: string
    ) {
        return apiClient.put(
            `/workspaces/${id}`,
            {
                name,
            }
        );
    }

    async deleteWorkspace(id: string) {
        return apiClient.delete(
            `/workspaces/${id}`
        );
    }
}

export const workspaceService =
    new WorkspaceService();