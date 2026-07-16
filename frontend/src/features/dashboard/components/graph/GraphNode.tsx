import {
    Building2,
    Database,
    FileText,
    Landmark,
    AlertTriangle,
} from "lucide-react";

interface Props {
    title: string;
    subtitle: string;
    type:
        | "vendor"
        | "invoice"
        | "graph"
        | "itc"
        | "alert";
}

const icons = {
    vendor: Building2,
    invoice: FileText,
    graph: Database,
    itc: Landmark,
    alert: AlertTriangle,
};

export default function GraphNode({
    title,
    subtitle,
    type,
}: Props) {
    const Icon = icons[type];

    return (
        <div
            className="
                min-w-[190px]
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-4
                shadow-md
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-xl
                cursor-pointer
            "
        >
            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                    "
                >
                    <Icon
                        size={20}
                        className="text-emerald-700"
                    />
                </div>

                <div>

                    <h4 className="font-semibold">
                        {title}
                    </h4>

                    <p className="text-xs text-zinc-500">
                        {subtitle}
                    </p>

                </div>

            </div>
        </div>
    );
}