import { useState } from "react";
import { X, FolderPlus } from "lucide-react";

import { useWorkspace } from "../../hooks/useWorkspace";

interface CreateWorkspaceModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateWorkspaceModal({
    open,
    onClose,
}: CreateWorkspaceModalProps) {
    const { createWorkspace } = useWorkspace();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    async function handleCreate() {
        try {
            setLoading(true);

            const now = new Date().toISOString();

            createWorkspace({
                id: crypto.randomUUID(),
                name: name.trim() || "Untitled Workspace",
                description,
                createdAt: now,
                updatedAt: now,
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
            });

            setName("");
            setDescription("");

            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-sm
            "
        >
            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-zinc-200
                    bg-white
                    shadow-2xl
                "
            >
                {/* Header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-zinc-200
                        px-7
                        py-5
                    "
                >
                    <div className="flex items-center gap-3">
                        <FolderPlus
                            size={22}
                            className="text-emerald-600"
                        />

                        <div>
                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-zinc-900
                                "
                            >
                                Create Workspace
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                Every upload belongs to a workspace.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-zinc-100
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}

                <div className="space-y-6 p-7">
                    <div>
                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-zinc-700
                            "
                        >
                            Workspace Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Vendor Audit July 2026"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-zinc-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-emerald-500
                            "
                        />
                    </div>

                    <div>
                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-zinc-700
                            "
                        >
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Optional description..."
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-zinc-200
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-emerald-500
                            "
                        />
                    </div>
                </div>

                {/* Footer */}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-zinc-200
                        px-7
                        py-5
                    "
                >
                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            border-zinc-200
                            px-5
                            py-3
                            text-sm
                            font-medium
                            transition
                              cursor-pointer
                            hover:bg-zinc-100
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="
                            rounded-xl
                            bg-zinc-900
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                              cursor-pointer
                            hover:bg-zinc-800
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? "Creating..."
                            : "Create Workspace"}
                    </button>
                </div>
            </div>
        </div>
    );
}   
