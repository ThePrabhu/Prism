import { motion } from "framer-motion";

interface FeatureVisualProps {
    type:
        | "reconciliation"
        | "graph"
        | "copilot"
        | "vendors"
        | "alerts"
        | "reports";
}

export default function FeatureVisual({
    type,
}: FeatureVisualProps) {
    switch (type) {
        case "reconciliation":
            return (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-full max-w-md rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <div className="h-3 w-28 rounded-full bg-zinc-300" />
                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Matched
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between rounded-xl bg-white p-4">
                            <span>Invoice #2481</span>
                            <span className="font-semibold text-emerald-600">
                                ✓
                            </span>
                        </div>

                        <div className="flex justify-between rounded-xl bg-white p-4">
                            <span>Invoice #2482</span>
                            <span className="font-semibold text-emerald-600">
                                ✓
                            </span>
                        </div>

                        <div className="flex justify-between rounded-xl bg-white p-4">
                            <span>Invoice #2483</span>
                            <span className="font-semibold text-orange-500">
                                !
                            </span>
                        </div>
                    </div>
                </motion.div>
            );

        case "graph":
            return (
                <div className="relative h-56 w-full max-w-md">
                    <div className="absolute left-8 top-8 h-5 w-5 rounded-full bg-emerald-500" />
                    <div className="absolute right-10 top-12 h-5 w-5 rounded-full bg-zinc-900" />
                    <div className="absolute bottom-12 left-20 h-5 w-5 rounded-full bg-zinc-900" />
                    <div className="absolute bottom-10 right-16 h-5 w-5 rounded-full bg-emerald-500" />

                    <div className="absolute left-12 top-10 h-px w-40 bg-zinc-300" />
                    <div className="absolute left-20 top-22 h-24 w-px bg-zinc-300" />
                    <div className="absolute left-44 top-16 h-28 w-px rotate-45 bg-zinc-300" />
                </div>
            );

        case "copilot":
            return (
                <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6">
                    <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-700">
                        Why is Vendor A mismatching?
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm leading-7 text-zinc-700"
                    >
                        Vendor A has not filed GSTR-1 for March.
                        ₹42,300 ITC is currently blocked.
                    </motion.div>
                </div>
            );

        case "vendors":
            return (
                <div className="w-full max-w-md space-y-3">
                    {["Vendor A", "Vendor B", "Vendor C"].map((vendor) => (
                        <div
                            key={vendor}
                            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4"
                        >
                            <span>{vendor}</span>

                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                Healthy
                            </span>
                        </div>
                    ))}
                </div>
            );

        case "alerts":
            return (
                <div className="w-full max-w-md space-y-3">
                    {[
                        "Missing GSTR-1",
                        "Vendor Risk Increased",
                        "ITC Opportunity",
                    ].map((alert) => (
                        <div
                            key={alert}
                            className="rounded-xl border-l-4 border-emerald-500 bg-zinc-50 p-4"
                        >
                            {alert}
                        </div>
                    ))}
                </div>
            );

        case "reports":
            return (
                <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6">
                    <div className="space-y-4">
                        <div className="h-4 w-full rounded bg-zinc-200" />
                        <div className="h-4 w-4/5 rounded bg-zinc-300" />
                        <div className="h-4 w-3/5 rounded bg-emerald-300" />
                        <div className="mt-8 flex items-end gap-3">
                            <div className="h-20 w-8 rounded bg-emerald-400" />
                            <div className="h-12 w-8 rounded bg-zinc-300" />
                            <div className="h-28 w-8 rounded bg-emerald-500" />
                            <div className="h-16 w-8 rounded bg-zinc-300" />
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
}