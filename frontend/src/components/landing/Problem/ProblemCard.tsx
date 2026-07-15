import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ProblemCardProps {
    index: number;
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function ProblemCard({
    index,
    icon: Icon,
    title,
    description,
}: ProblemCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="
                group
                relative
                flex
                w-full
                min-h-[300px]
                flex-col
                items-center
                justify-center
                bg-white
                border
                border-[#DFE4DD]
                rounded-none
                px-8
                py-12
                text-center
                shadow-sm
                transition-shadow
                hover:shadow-md
                lg:px-10
                lg:py-14
            "
        >
            {/* signature accent — draws in on hover */}
            <span
                className="
                    absolute
                    left-1/2
                    top-0
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    bg-emerald-500
                    transition-all
                    duration-300
                    group-hover:w-16
                "
            />

            <div className="flex items-center justify-center gap-3">
                <span
                    className="
                        text-xs
                        font-semibold
                        tracking-[0.32em]
                        text-zinc-400
                    "
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                <Icon
                    size={22}
                    strokeWidth={2}
                    className="
                        text-zinc-900
                        transition-colors
                        duration-300
                        group-hover:text-emerald-600
                    "
                />
            </div>

            <h3
                className="
                    mt-6
                    text-[1.85rem]
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
                    mx-auto
                    mt-4
                    max-w-[34rem]
                    text-lg
                    leading-8
                    text-zinc-600
                "
            >
                {description}
            </p>
        </motion.article>
    );
}
