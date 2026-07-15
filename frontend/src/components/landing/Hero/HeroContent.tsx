// src/components/landing/Hero/HeroContent.tsx

import { motion } from "framer-motion";

import HeroBadge from "./HeroBadge";
import HeroTyping from "./HeroTyping";
import HeroCTA from "./HeroCTA";

export default function HeroContent() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <HeroBadge />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.15,
                    duration: 0.8,
                }}
                className="
                    mt-6
                    font-['Sora']
                    font-black
                    tracking-[-0.035em]
                    leading-[0.98]
                    text-zinc-950
                    text-6xl
                    sm:text-7xl
                    lg:text-[4.75rem]
                "
            >
                GST

                <span
                    className="
                    block
                        text-black
                    "
                >
                    Intelligence
                </span>

                Simplified.
            </motion.h1>

            {/* Secondary Heading */}


            {/* Typing Animation */}
            <div className="mt-7">
                <HeroTyping />
            </div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 0.55,
                    duration: 0.8,
                }}
                className="
                    mt-5
                    max-w-4xl
                    text-lg
                    leading-8
                    text-zinc-600
                    lg:text-xl
                "
            >
                Prism helps finance teams visualize GST relationships,
                detect reconciliation mismatches, recover eligible ITC,
                and automate compliance through explainable AI.
            </motion.p>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.75,
                    duration: 0.8,
                }}
                className="mt-7"
            >
                <HeroCTA />
            </motion.div>

        </div>
    );
}
