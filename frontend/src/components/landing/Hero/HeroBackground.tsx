import { motion } from "framer-motion";

export default function HeroBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

            {/* Base */}

            <div className="absolute inset-0 bg-[#FAFCFB]" />

            {/* Soft Radial Glow */}

            <div
                className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,rgba(209,250,229,0.9)_0%,rgba(236,253,245,0.42)_38%,transparent_70%)]
                "
            />

            {/* Technical Grid */}

            <div
                className="
                absolute
                inset-0
                opacity-[0.18]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(20, 83, 45, 0.34) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(20, 83, 45, 0.18) 1px, transparent 1px)
                    `,
                    backgroundSize: "72px 72px",
                }}
            />

            <div
                className="
                absolute
                inset-0
                opacity-[0.12]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(20, 83, 45, 0.42) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(20, 83, 45, 0.24) 1px, transparent 1px)
                    `,
                    backgroundSize: "288px 288px",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_46%,rgba(250,252,251,0.72)_100%)]" />

            {/* Large Circle */}

            <div
                className="
                absolute
                left-1/2
                top-1/2
                h-[1300px]
                w-[1300px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-emerald-400/18
                "
            />

            <div
                className="
                absolute
                left-1/2
                top-1/2
                h-[950px]
                w-[950px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-emerald-400/10
                "
            />

            <div
                className="
                absolute
                left-1/2
                top-1/2
                h-[650px]
                w-[650px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-emerald-400/10
                "
            />

            {/* Animated Curve 1 */}

            <motion.svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M-100 350 C350 250 600 600 1000 420 C1450 220 1800 430 2100 280"
                    fill="none"
                    stroke="#77D4A2"
                    strokeWidth="2"
                    strokeOpacity=".22"
                    animate={{
                        pathLength: [0, 1],
                        opacity: [.05, .18, .05],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                    }}
                />
            </motion.svg>

            {/* Animated Curve 2 */}

            <motion.svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M-50 700 C450 500 900 850 1450 650 C1650 580 1800 620 2050 500"
                    fill="none"
                    stroke="#95E5B5"
                    strokeWidth="2"
                    strokeOpacity=".15"
                    animate={{
                        pathLength: [1, 0],
                        opacity: [.04, .14, .04],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                    }}
                />
            </motion.svg>

            {/* Floating Glow */}

            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [.16, .28, .16],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                absolute
                left-1/2
                top-1/2
                h-[750px]
                w-[750px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-emerald-300/45
                blur-[190px]
    
                "
            />

            {/* Noise */}

            <div
                className="
                absolute
                inset-0
                opacity-[0.015]
                "
                style={{
                    backgroundImage:
                        "radial-gradient(circle,#000 1px,transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />
        </div>
    );
}
