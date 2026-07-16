// src/features/resolution/components/ResolutionEmpty.tsx

import { AlertCircle, UploadCloud } from "lucide-react";

interface ResolutionEmptyProps {
    hasWorkspace: boolean;
}

export default function ResolutionEmpty({
    hasWorkspace,
}: ResolutionEmptyProps) {
    if (!hasWorkspace) {
        return (
            <section
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-dashed
                    border-zinc-300
                    bg-white
                    px-8
                    py-20
                    text-center
                "
            >
                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-50
                    "
                >
                    <UploadCloud
                        size={30}
                        className="text-emerald-600"
                    />
                </div>

                <h2
                    className="
                        mt-6
                        text-2xl
                        font-semibold
                        text-zinc-900
                    "
                >
                    No Workspace Selected
                </h2>

                <p
                    className="
                        mt-3
                        max-w-lg
                        text-sm
                        leading-7
                        text-zinc-500
                    "
                >
                    Create a new workspace or select an existing one
                    from the sidebar. Once GST files are uploaded,
                    Prism will automatically detect mismatches,
                    blocked ITC, vendor issues and generate AI
                    resolution cases.
                </p>
            </section>
        );
    }

    return (
        <section
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-zinc-300
                bg-white
                px-8
                py-20
                text-center
            "
        >
            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-50
                "
            >
                <AlertCircle
                    size={30}
                    className="text-orange-500"
                />
            </div>

            <h2
                className="
                    mt-6
                    text-2xl
                    font-semibold
                    text-zinc-900
                "
            >
                No Resolution Cases
            </h2>

            <p
                className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-7
                    text-zinc-500
                "
            >
                Great news! Prism didn't find any reconciliation
                issues in this workspace. After new GST files are
                uploaded or existing data changes, AI-generated
                resolution cases will appear here automatically.
            </p>
        </section>
    );
}