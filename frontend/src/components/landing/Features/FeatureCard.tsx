import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
    title: string;
    description: string;
    visual: ReactNode;
    size?: "large" | "medium";
}

export default function FeatureCard({
    title,
    description,
    visual,
    size = "medium",
}: FeatureCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
            className={`
                group
                relative
                w-full
                overflow-hidden
                bg-white
                border
                border-[#DFE4DD]
                rounded-none
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md

                ${size === "large" ? "lg:col-span-2 min-h-[480px]" : "min-h-[420px]"}
            `}
        >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-50/50 blur-3xl" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                <div className="mx-auto w-full max-w-3xl text-center">
                    <h3 className="text-[34px] font-semibold leading-tight tracking-[-0.04em] text-zinc-950">
                        {title}
                    </h3>
                    <p className="mt-5 mx-auto max-w-xl text-lg leading-8 text-zinc-600">
                        {description}
                    </p>
                </div>
                <div className="mt-10 flex min-h-[190px] w-full items-center justify-center overflow-hidden">
                    {visual}
                </div>
            </div>
        </motion.article>
    );
}
