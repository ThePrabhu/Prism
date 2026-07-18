import UploadCard from "./UploadCard";
import UploadActions from "./UploadActions";
import { uploadService } from "../../services/upload.service";

import { useDashboardStore } from "../../store/dashboardStore";

export default function UploadQueue() {
    const files = useDashboardStore(
        (state) => state.selectedFiles
    );

    const workspaces = useDashboardStore(
        (state) => state.workspaces
    );

    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    const addFilesToWorkspace = useDashboardStore(
        (state) => state.addFilesToWorkspace
    );

    const setWorkspaceMode = useDashboardStore(
        (state) => state.setWorkspaceMode
    );

    const setProcessingStage = useDashboardStore(
        (state) => state.setProcessingStage
    );

    const setUploadProgress = useDashboardStore(
        (state) => state.setUploadProgress
    );

    const activeWorkspace = workspaces.find(
        (workspace) =>
            workspace.id === activeWorkspaceId
    );

    function removeFile(id: string) {
        useDashboardStore
            .getState()
            .setSelectedFiles(
                files.filter(
                    (file) => file.id !== id
                )
            );
    }

    function addMoreFiles() {
        document
            .querySelector<HTMLInputElement>(
                'input[type="file"]'
            )
            ?.click();
    }

    async function processFiles() {
    if (!files.length) return;

    if (!activeWorkspace) return;

    try {
        // Save files into workspace
        addFilesToWorkspace(
            activeWorkspace.id,
            files
        );

        setWorkspaceMode("processing");
        setProcessingStage("uploading");
        setUploadProgress(10);

        // Upload to backend
        const response = await uploadService.uploadFiles(
            activeWorkspace.id,
            files
                .map((f) => f.file)
                .filter(Boolean) as File[]
        );

        console.log("Upload Response:", response);

        setProcessingStage("ocr");
        setUploadProgress(35);

        setProcessingStage("graph");
        setUploadProgress(60);

        setProcessingStage("analysis");
        setUploadProgress(90);

        setProcessingStage("completed");
        setUploadProgress(100);

        setWorkspaceMode("completed");
    } catch (error) {
        console.error(error);

        alert("Upload failed.");

        setWorkspaceMode("upload");
    }
}

    if (!files.length) return null;

    return (
        <section
            className="
                rounded-2xl
                bg-white
                p-5
                shadow-[0_10px_40px_rgba(0,0,0,.06)]
            "
        >
            <div className="mb-4">
                <h3 className="text-lg font-semibold">
                    Files Ready
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                    {files.length} file(s) ready for processing.
                </p>
            </div>

            <div className="space-y-3">
                {files.map((file) => (
                    <UploadCard
                        key={file.id}
                        file={file}
                        onRemove={removeFile}
                    />
                ))}
            </div>

            <UploadActions
                onAddMore={addMoreFiles}
                onProcess={processFiles}
            />
        </section>
    );
}