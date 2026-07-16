import type { WorkspaceFile } from "../types/dashboard.types";

class UploadService {

    async uploadFiles(
        workspaceId: string,
        files: File[]
    ) {
        console.log(
            "Uploading",
            workspaceId,
            files
        );

        return {
            success: true,
        };
    }

    async retryUpload(fileId: string) {
        console.log(fileId);
    }

    async cancelUpload(fileId: string) {
        console.log(fileId);
    }

    async removeFile(fileId: string) {
        console.log(fileId);
    }

    async listWorkspaceFiles(
        workspaceId: string
    ) {
        console.log(workspaceId);

        return [] as WorkspaceFile[];
    }
}

export const uploadService =
    new UploadService();
