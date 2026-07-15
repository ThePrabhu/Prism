import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
}

export default function PrimaryButton({
    children,
    loading = false,
    fullWidth = true,
    className = "",
    disabled,
    ...props
}: PrimaryButtonProps) {
    return (
        <motion.button
            whileHover={{
                scale: disabled || loading ? 1 : 1.01,
                y: disabled || loading ? 0 : -2,
            }}
            whileTap={{
                scale: disabled || loading ? 1 : 0.98,
            }}
            transition={{
                duration: 0.2,
            }}
            disabled={disabled || loading}
            className={`
                group
                relative
                flex
                h-14
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-emerald-600
                via-green-600
                to-lime-500
                px-6
                text-[15px]
                font-semibold
                text-white
                shadow-[0_18px_40px_rgba(16,185,129,.20)]
                transition-all
                duration-300

                hover:shadow-[0_22px_50px_rgba(16,185,129,.30)]

                disabled:cursor-not-allowed
                disabled:opacity-70

                ${
                    fullWidth
                        ? "w-full"
                        : "w-auto"
                }

                ${className}
            `}
            {...props}
        >
            {/* Shine Effect */}

            <span
                className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                "
            />

            {/* Content */}

            <span
                className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-3
                "
            >
                {loading && (
                    <Loader2
                        size={18}
                        className="animate-spin"
                    />
                )}

                {children}
            </span>
        </motion.button>
    );
}