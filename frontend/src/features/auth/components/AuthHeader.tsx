import { motion } from "framer-motion";

interface AuthHeaderProps {
    badge?: string;
    title: string;
    subtitle: string;
}

export default function AuthHeader({
    badge = "Prism Workspace",
    title,
    subtitle,
}: AuthHeaderProps) {
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
                duration: 0.45,
            }}
            className="mb-8"
        >
            <span
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                    text-emerald-600
                "
            >
                {badge}
            </span>

            <h1
                className="
                    mt-4
                    text-4xl
                    font-semibold
                    tracking-[-0.05em]
                    text-zinc-950
                "
            >
                {title}
            </h1>

            <p
                className="
                    mt-4
                    max-w-md
                    text-lg
                    leading-8
                    text-zinc-600
                "
            >
                {subtitle}
            </p>
        </motion.div>
    );
}