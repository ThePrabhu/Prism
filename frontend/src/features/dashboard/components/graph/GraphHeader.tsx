import { Network, Info } from "lucide-react";

export default function GraphHeader() {
    return (
        <div className="flex items-start justify-between">

            <div>

                <div className="flex items-center gap-3">

                    <Network
                        size={22}
                        className="text-emerald-600"
                    />

                    <h2 className="text-3xl font-bold text-zinc-950">
                        GST Knowledge Graph
                    </h2>

                </div>

                <p className="mt-2 text-zinc-500">
                    Visual relationships across uploaded GST entities.
                </p>

            </div>

            <button
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-zinc-200
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition
                    hover:cursor-pointer
                    hover:border-emerald-300
                    hover:bg-emerald-50
                "
            >
                <Info size={16}/>
                Legend
            </button>

        </div>
    );
}