import { FileCheck2 } from "lucide-react";

export default function SummaryHeader() {
    return (
        <div className="flex items-center justify-between">

            <div>

                <div className="flex items-center gap-3">

                    <FileCheck2
                        size={22}
                        className="text-emerald-600"
                    />

                    <h2 className="text-3xl font-bold text-zinc-950">
                        Workspace Summary
                    </h2>

                </div>

                <p className="mt-2 text-zinc-500">
                    Current reconciliation status for this GST workspace.
                </p>

            </div>

            <button
                className="
                    rounded-xl
                    border
                    border-zinc-200
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-zinc-700
                    transition
                    hover:cursor-pointer
                    hover:border-emerald-300
                    hover:bg-emerald-50
                    hover:text-emerald-700
                "
            >
                View Detailed Report
            </button>

        </div>
    );
}