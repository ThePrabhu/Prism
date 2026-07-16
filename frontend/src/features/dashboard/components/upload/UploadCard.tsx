import {
    FileImage,
    FileSpreadsheet,
    FileText,
    Trash2,
} from "lucide-react";

import type {
    WorkspaceFile,
} from "../../types/dashboard.types";

interface Props {
    file: WorkspaceFile;

    onRemove: (
        id: string
    ) => void;
}

export default function UploadCard({
    file,
    onRemove,
}: Props) {
    function icon() {
        if (
            file.mimeType.includes(
                "image"
            )
        ) {
            return <FileImage size={18} />;
        }

        if (
            file.extension === "csv" ||
            file.extension === "xlsx" ||
            file.extension === "xls"
        ) {
            return (
                <FileSpreadsheet
                    size={18}
                />
            );
        }

        return <FileText size={18} />;
    }

    return (
        <div
            className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-zinc-200
                bg-white
                px-4
                py-3
            "
        >
            <div className="flex gap-3">

                {icon()}

                <div>

                    <p className="font-medium">
                        {file.name}
                    </p>

                    <p
                        className="
                            text-xs
                            text-zinc-500
                        "
                    >
                        {(
                            file.size /
                            1024 /
                            1024
                        ).toFixed(2)}
                        MB
                    </p>

                </div>

            </div>

            <button
                onClick={() =>
                    onRemove(file.id)
                }
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}