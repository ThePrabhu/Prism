import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface UseCaseItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

export default function UseCaseItem({
    icon: Icon,
    title,
    description,
    index,
}: UseCaseItemProps) {
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
                amount: 0.2,
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
            }}
            whileHover={{
                x: 4,
            }}
            className="
                group
                relative
                border-t
                border-zinc-200
                px-8
                py-12
                transition-all
                duration-300
                hover:bg-emerald-50/30
            "
        >
            {/* Accent Line */}

            <div
                className="
                    absolute
                    left-8
                    top-12
                    h-8
                    w-[3px]
                    bg-emerald-500
                    transition-all
                    duration-300
                    group-hover:h-12
                "
            />

            <div className="pl-6">

                {/* Icon */}

                <Icon
                    size={18}
                    strokeWidth={2.2}
                    className="
                        mb-5
                        text-zinc-400
                        transition-colors
                        duration-300
                        group-hover:text-emerald-600
                    "
                />

                {/* Title */}

                <h3
                    className="
                        text-3xl
                        font-semibold
                        tracking-tight
                        text-zinc-900
                        transition-colors
                        duration-300
                        group-hover:text-emerald-700
                    "
                >
                    {title}
                </h3>

                {/* Description */}

                <p
                    className="
                        mt-5
                        max-w-md
                        text-lg
                        leading-8
                        text-zinc-600
                    "
                >
                    {description}
                </p>

            </div>
        </motion.article>
    );
}