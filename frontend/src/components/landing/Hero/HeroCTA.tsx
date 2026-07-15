// src/components/landing/Hero/HeroCTA.tsx

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
            }}
        >
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="
                    group
                    relative
                    inline-flex
                    h-[60px]
                    w-[270px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-[#10c46a]
                    px-4
                    text-[17px]
                    font-bold
                    tracking-wide
                    text-neutral-950
                    shadow-[0_14px_36px_rgba(16,196,106,0.28)]
                    transition-all
                    duration-300
                    hover:bg-[#0eb360]
                    hover:shadow-[0_18px_44px_rgba(16,196,106,0.4)]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#10c46a]
                    focus:ring-offset-2
                    focus:ring-offset-white
                "
            >
                {/* Fixed Top Glowing Line */}
                <span className="absolute inset-x-0 top-0 h-px bg-[#09e879]/50" />

                {/* Centered Text */}
                <span className="relative z-10 whitespace-nowrap transition-transform duration-300 group-hover:-translate-x-1.5">
                    Join Now
                </span>

                {/* Sleek Expanding Arrow Container (Positioned on the Right Side) */}
                <div
                    className="
                        absolute
                        right-2.5
                        z-20
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white/20
                        border
                        border-white/30
                        backdrop-blur-md
                        text-neutral-950
                        transition-all
                        duration-300
                        ease-out
                        group-hover:w-16
                        group-hover:bg-neutral-950
                        group-hover:text-[#10c46a]
                        group-hover:border-neutral-950
                    "
                >
                    <ArrowRight
                        size={18}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    />
                </div>
            </motion.button>
        </motion.div>
    );
}
