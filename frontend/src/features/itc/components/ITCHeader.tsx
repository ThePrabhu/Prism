import {
    ReceiptIndianRupee,
    CalendarDays,
    FolderOpen,
} from "lucide-react";

import type { Workspace } from "../../dashboard/types/dashboard.types";

interface ITCHeaderProps {
    workspace: Workspace;
}

export default function ITCHeader({
    workspace,
}: ITCHeaderProps) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-7
                shadow-sm
            "
        >
            <div
                className="
                    flex
                    items-start
                    justify-between
                "
            >
                {/* Left */}

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-emerald-50
                            "
                        >
                            <ReceiptIndianRupee
                                className="text-emerald-600"
                                size={22}
                            />
                        </div>

                        <div>

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    text-zinc-900
                                "
                            >
                                ITC Center
                            </h1>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                Recoverable Input Tax Credit
                                for the selected workspace.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <button
                    onClick={() =>
                        window.open(
                            "https://www.gst.gov.in/",
                            "_blank"
                        )
                    }
                    className="
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-emerald-700
                    "
                >
                    Open GST Portal
                </button>

            </div>

            {/* Workspace */}

            <div
                className="
                    mt-7
                    grid
                    grid-cols-3
                    gap-5
                "
            >

                <div
                    className="
                        rounded-2xl
                        border
                        border-zinc-200
                        p-4
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-zinc-500
                        "
                    >
                        <FolderOpen size={16} />

                        <span
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Workspace
                        </span>

                    </div>

                    <p
                        className="
                            text-base
                            font-semibold
                            text-zinc-900
                        "
                    >
                        {workspace.name}
                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-zinc-200
                        p-4
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-zinc-500
                        "
                    >
                        <CalendarDays size={16} />

                        <span
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Last Updated
                        </span>

                    </div>

                    <p
                        className="
                            text-base
                            font-semibold
                            text-zinc-900
                        "
                    >
                        {new Date(
                            workspace.updatedAt
                        ).toLocaleDateString()}
                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-zinc-200
                        p-4
                    "
                >
                    <div
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-zinc-500
                        "
                    >
                        <ReceiptIndianRupee
                            size={16}
                        />

                        <span
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Claimable ITC
                        </span>

                    </div>

                    <p
                        className="
                            text-base
                            font-semibold
                            text-emerald-600
                        "
                    >
                        ₹
                        {workspace.claimableItc.toLocaleString()}
                    </p>

                </div>

            </div>
        </section>
    );
}