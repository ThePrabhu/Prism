import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroScrollIndicator() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: 1.2,
                duration: 0.8,
            }}
            className="
                absolute
                bottom-10
                left-1/2
                -translate-x-1/2
                z-20
                flex
                flex-col
                items-center
                gap-2
            "
        >
            <motion.div
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-emerald-200/80
                    bg-white/75
                    backdrop-blur-xl
                    shadow-[0_14px_35px_rgba(15,23,42,.12)]
                "
            >
                <ChevronDown
                    className="text-emerald-600"
                    size={20}
                    strokeWidth={2.5}
                />
            </motion.div>
        </motion.div>
    );
}
