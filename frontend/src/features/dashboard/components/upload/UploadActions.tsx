import { Plus, Play } from "lucide-react";

interface Props {
    onAddMore: () => void;
    onProcess: () => void;
}

export default function UploadActions({
    onAddMore,
    onProcess,
}: Props) {
    return (
        <div className="mt-5 flex justify-end gap-3">

            <button
                onClick={onAddMore}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-zinc-200
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    transition
                    hover:bg-zinc-100
                "
            >
                <Plus size={18} />

                Add More
            </button>

            <button
                onClick={onProcess}
                className="
                    flex
                    items-center
                    gap-2
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
                <Play size={18} />

                Process Files
            </button>

        </div>
    );
}