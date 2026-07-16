class ProcessingService {

    async getProgress(
        workspaceId: string
    ) {
        console.log(workspaceId);

        return {
            stage: "uploading",

            progress: 0,
        };
    }

    async startProcessing(
        workspaceId: string
    ) {
        console.log(workspaceId);
    }

    async stopProcessing(
        workspaceId: string
    ) {
        console.log(workspaceId);
    }
}

export const processingService =
    new ProcessingService();