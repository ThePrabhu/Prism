import {
    Bot,
    FolderOpen,
    CheckCircle2,
} from "lucide-react";

interface ChatHeaderProps {
    workspaceName: string;
    connected: boolean;
}

export default function ChatHeader({
    workspaceName,
    connected,
}: ChatHeaderProps) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-6
                shadow-sm
            "
        >
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-emerald-50
                        "
                    >
                        <Bot
                            size={28}
                            className="text-emerald-600"
                        />
                    </div>

                    <div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                            "
                        >
                            Prism AI Financial Analyst
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-zinc-500
                            "
                        >
                            Context-aware GST & Financial Assistant
                        </p>

                    </div>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-zinc-200
                        px-5
                        py-3
                    "
                >

                    <div className="flex items-center gap-2">

                        <FolderOpen size={16} />

                        <span className="text-sm">
                            {workspaceName}
                        </span>

                    </div>

                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            gap-2
                            text-emerald-600
                        "
                    >

                        <CheckCircle2 size={16} />

                        <span
                            className="
                                text-xs
                                font-medium
                            "
                        >
                            {connected
                                ? "Workspace Connected"
                                : "General Mode"}
                        </span>

                    </div>

                </div>

            </div>
        </section>
    );
}