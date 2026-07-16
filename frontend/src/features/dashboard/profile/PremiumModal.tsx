import {
    Crown,
    CheckCircle2,
    X,
} from "lucide-react";

interface PremiumModalProps {
    open: boolean;
    onClose(): void;
    onUpgrade(): void;
}

export default function PremiumModal({
    open,
    onClose,
    onUpgrade,
}: PremiumModalProps) {
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
                    max-w-lg
                    rounded-3xl
                    bg-white
                    p-8
                    shadow-2xl
                "
            >
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-yellow-100
                            "
                        >
                            <Crown
                                size={24}
                                className="text-yellow-600"
                            />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold">
                                Prism Premium
                            </h2>

                            <p className="text-sm text-zinc-500">
                                Unlock the complete experience.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-zinc-100"
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="mt-8 space-y-4">

                    {[
                        "Unlimited AI conversations",
                        "Unlimited workspaces",
                        "Priority GST processing",
                        "Advanced analytics",
                        "Future team collaboration",
                    ].map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-3"
                        >
                            <CheckCircle2
                                size={18}
                                className="text-emerald-600"
                            />

                            <span>{feature}</span>

                        </div>
                    ))}

                </div>

                <div
                    className="
                        mt-8
                        rounded-2xl
                        bg-zinc-50
                        p-5
                    "
                >
                    <div className="text-sm text-zinc-500">
                        Starting From
                    </div>

                    <div className="mt-1 text-4xl font-bold">
                        ₹199
                        <span className="text-lg font-medium text-zinc-500">
                            /month
                        </span>
                    </div>
                </div>

                <button
                    onClick={onUpgrade}
                    className="
                        mt-8
                        w-full
                        rounded-2xl
                        bg-emerald-600
                        py-4
                        font-semibold
                        text-white
                        transition
                        hover:bg-emerald-700
                    "
                >
                    Upgrade to Premium
                </button>

            </div>
        </div>
    );
}