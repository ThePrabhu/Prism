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
            initial={{
                opacity: 0,
                y: 30,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                duration: 0.55,
            }}
            whileHover={{
                y: -4,
            }}
            className={`
                group
                relative
                w-full
                overflow-hidden
                bg-white/90
                shadow-[0_24px_70px_rgba(15,23,42,0.07)]
                transition-all
                duration-300
                hover:shadow-[0_30px_90px_rgba(15,23,42,0.1)]

                ${
                    size === "large"
                        ? "lg:col-span-2 min-h-[480px]"
                        : "min-h-[420px]"
                }
            `}
            style={{
                clipPath:
                    "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
        >
            <span className="absolute right-0 top-0 h-6 w-6 bg-emerald-50 shadow-[-1px_1px_0_rgba(16,185,129,0.14)]" />

            {/* Background */}

            <div
                className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            >
                <div
                    className="
                        absolute
                        right-[-120px]
                        top-[-120px]
                        h-[320px]
                        w-[320px]
                        rounded-full
                        bg-emerald-100/60
                        blur-3xl
                    "
                />
            </div>

            <div
                className="
                    relative
                    flex
                    h-full
                    flex-col
                    justify-between
                    p-8
                    lg:p-10
                "
            >
                {/* Heading */}

                <div className="mx-auto w-full max-w-3xl text-center">

                    <h3
                        className="
                            text-[34px]
                            font-semibold
                            leading-tight
                            tracking-[-0.04em]
                            text-zinc-950
                        "
                    >
                        {title}
                    </h3>

                    <p
                        className="
                            mt-5
                            mx-auto
                            max-w-xl
                            text-lg
                            leading-8
                            text-zinc-600
                        "
                    >
                        {description}
                    </p>

                </div>

                {/* Product Preview */}

                <div
                    className="
                        mt-10
                        flex
                        min-h-[190px]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                    "
                >
                    {visual}
                </div>

            </div>
        </motion.article>
    );
}
