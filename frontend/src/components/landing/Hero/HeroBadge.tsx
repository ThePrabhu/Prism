import { motion } from "framer-motion";

export default function HeroBadge() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
            whileHover={{
                scale: 1.03,
            }}
            className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/40
                px-5
                py-3
                shadow-lg
                shadow-emerald-100/50
                backdrop-blur-2xl
                transition-all
            "
        >

            <div className="flex flex-col leading-none">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black-900">
                    AI Powered Platform
                </span>
            </div> 
        </motion.div>
    );
}
