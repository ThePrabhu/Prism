const entities = [
    "Vendor",
    "Buyer",
    "GSTIN",
    "Invoice",
    "Purchase",
    "ITC",
    "Mismatch",
    "Alert",
];

export default function EntityFilterBar() {
    return (
        <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Entity Filters
            </p>

            <div className="flex flex-wrap gap-3">

                {entities.map((entity) => (

                    <button
                        key={entity}
                        className="
                            rounded-xl
                            border
                            border-emerald-200
                            bg-emerald-50
                            px-4
                            py-2
                            cursor-pointer
                            text-sm
                            font-semibold
                            text-emerald-700
                            transition
                            hover:bg-emerald-100
                        "
                    >
                        {entity}
                    </button>

                ))}

            </div>

        </div>
    );
}