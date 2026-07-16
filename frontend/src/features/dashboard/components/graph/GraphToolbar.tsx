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

export default function GraphToolbar() {
    return (
        <div className="mt-8">

            <p
                className="
                    mb-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-zinc-500
                "
            >
                Entity Filters
            </p>

            <div className="flex flex-wrap gap-3">

                {entities.map((entity) => (

                    <button
                        key={entity}
                        className="
                            rounded-xl
                            border
                            border-emerald-300
                            bg-emerald-50
                            px-5
                            py-3
                            text-lg
                            font-semibold
                            text-emerald-800
                            transition-all
                            hover:cursor-pointer
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