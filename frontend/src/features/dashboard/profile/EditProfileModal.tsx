import { useState } from "react";
import { X } from "lucide-react";

interface EditProfileModalProps {
    open: boolean;
    currentName: string;
    onClose(): void;
    onSave(name: string): void;
}

export default function EditProfileModal({
    open,
    currentName,
    onClose,
    onSave,
}: EditProfileModalProps) {
const [name, setName] = useState("");

if (open && name !== currentName) {
    // Only initialize once when opening
    setTimeout(() => {
        setName(currentName);
    }, 0);
}

    if (!open) return null;

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
                    max-w-md
                    rounded-3xl
                    bg-white
                    p-7
                    shadow-2xl
                "
            >
                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold">
                            Edit Display Name
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Your name updates across the entire
                            workspace.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-zinc-100"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="mt-6">

                    <label className="text-sm font-medium">
                        Display Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-zinc-300
                            px-4
                            py-3
                            outline-none
                            focus:border-emerald-500
                        "
                    />

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            px-5
                            py-2.5
                            hover:bg-zinc-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            onSave(name.trim());
                            onClose();
                        }}
                        className="
                            rounded-xl
                            bg-emerald-600
                            px-6
                            py-2.5
                            font-medium
                            text-white
                            hover:bg-emerald-700
                        "
                    >
                        Save
                    </button>

                </div>

            </div>
        </div>
    );
}