import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({
    children,
}: AuthCardProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.98,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className="
                rounded-[32px]
                border
                border-zinc-200
                bg-white/95
                p-8
                shadow-[0_25px_80px_rgba(15,23,42,0.06)]
                backdrop-blur-xl

                sm:p-10
                lg:p-12
            "
        >
            {children}
        </motion.div>
    );
}