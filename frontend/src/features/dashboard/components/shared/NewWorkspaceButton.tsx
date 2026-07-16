import { useState } from "react";

import { Plus } from "lucide-react";

import CreateWorkspaceModal from "./CreateWorkspaceModal";

interface Props {
    collapsed: boolean;
}

export default function NewWorkspaceButton({
    collapsed,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`
                    flex
                    w-full
                    items-center
                    rounded-xl
                    transition-all
                    duration-200
                    hover:bg-zinc-100
                    ${
                        collapsed
                            ? "justify-center p-3"
                            : "gap-3 px-3 py-3"
                    }
                `}
            >
                <Plus
                    size={20}
                    className="shrink-0 cursor-pointer"
                />

                {!collapsed && (
                    <span
                        className="
                            text-sm
                            font-medium
                            cursor-pointer
                        "
                    >
                        New Workspace
                    </span>
                )}
            </button>

            <CreateWorkspaceModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            />
        </>
    );
}