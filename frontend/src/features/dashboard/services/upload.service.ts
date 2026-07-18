import { apiClient } from "../api/client";

class UploadService {
    async uploadFiles(
        workspaceId: string,
        files: File[]
    ) {
        const form = new FormData();

        form.append(
            "workspace_id",
            workspaceId
        );

        files.forEach((file) => {
            form.append("files", file);
        });

        return apiClient.post(
            "/upload",
            form
        );
    }
}

export const uploadService =
    new UploadService();