const sources = [
    "GSTR-1",
    "GSTR-2B",
    "GSTR-3B",
    "Invoices",
    "Purchase Register",
    "Sales Register",
    "E-Way Bill",
];

export default function SourceFilterBar() {
    return (
        <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Source Files
            </p>

            <div className="flex flex-wrap gap-3">

                {sources.map((source) => (

                    <button
                        key={source}
                        className="
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-zinc-700
                            transition
                            hover:border-emerald-300
                            hover:text-emerald-700
                            hover:bg-emerald-50
                        "
                    >
                        {source}
                    </button>

                ))}

            </div>

        </div>
    );
}