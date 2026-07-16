import {
    CheckCircle2,
    CircleDashed,
    FileText,
    Image,
    Table2,
} from "lucide-react";

const supportedFiles = [
    {
        name: "GSTR-1",
        hint: "Sales return",
        required: true,
        ready: true,
        icon: Table2,
    },
    {
        name: "GSTR-2B",
        hint: "Input tax credit",
        required: true,
        ready: true,
        icon: Table2,
    },
    {
        name: "GSTR-3B",
        hint: "Summary return",
        required: true,
        ready: false,
        icon: Table2,
    },
    {
        name: "Invoices",
        hint: "Purchase & sales",
        required: true,
        ready: true,
        icon: FileText,
    },
    {
        name: "Purchase Register",
        hint: "Vendor records",
        required: false,
        ready: false,
        icon: FileText,
    },
    {
        name: "Images",
        hint: "OCR supported",
        required: false,
        ready: true,
        icon: Image,
    },
];

export default function SupportedFiles() {
    return (
        <section className="rounded-[28px] border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                        Supported Inputs
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
                        Documents Prism can process
                    </h3>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Ready for GST
                </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {supportedFiles.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.name}
                            className="
                                flex
                                items-start
                                gap-4
                                rounded-2xl
                                border
                                border-zinc-200
                                bg-white
                                p-4
                                transition
                                hover:border-emerald-200
                                hover:bg-emerald-50/30
                            "
                        >
                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${
                                        item.ready
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-zinc-100 text-zinc-400"
                                    }
                                `}
                            >
                                <Icon size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="truncate text-sm font-semibold text-zinc-950">
                                        {item.name}
                                    </p>

                                    {item.ready ? (
                                        <CheckCircle2
                                            size={15}
                                            className="text-emerald-600"
                                        />
                                    ) : (
                                        <CircleDashed
                                            size={15}
                                            className="text-zinc-400"
                                        />
                                    )}
                                </div>

                                <p className="mt-1 text-xs text-zinc-500">
                                    {item.hint}
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    <span
                                        className={`
                                            rounded-full
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            ${
                                                item.required
                                                    ? "bg-zinc-950 text-white"
                                                    : "bg-zinc-100 text-zinc-500"
                                            }
                                        `}
                                    >
                                        {item.required ? "Required" : "Optional"}
                                    </span>

                                    <span
                                        className={`
                                            rounded-full
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            ${
                                                item.ready
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-zinc-100 text-zinc-500"
                                            }
                                        `}
                                    >
                                        {item.ready ? "Detected" : "Missing"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}