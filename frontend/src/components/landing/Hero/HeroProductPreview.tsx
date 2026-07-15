import { motion } from "framer-motion";
import {
    AlertTriangle,
    BrainCircuit,
    FileSpreadsheet,
    Network,
    ShieldCheck,
} from "lucide-react";

export default function HeroProductPreview() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: .94,
                y: 30,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: .8,
                delay: .25,
            }}
            className="
            relative
            h-full
            w-full
            min-h-[560px]
            "
        >
            {/* Upload */}

            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                }}
                className="
                absolute
                left-8
                top-8
                z-20
                rounded-3xl
                border
                border-white/40
                bg-white/75
                p-5
                shadow-xl
                backdrop-blur-2xl
                "
            >

                <div className="flex items-center gap-3">

                    <FileSpreadsheet className="text-green-600"/>

                    <div>

                        <h4 className="font-semibold">

                            GSTR Upload

                        </h4>

                        <p className="text-xs text-zinc-500">

                            GSTR-1 • 2B • 3B

                        </p>

                    </div>

                </div>

            </motion.div>

            {/* Graph */}

            <motion.div
                animate={{
                    y:[0,8,0]
                }}
                transition={{
                    repeat:Infinity,
                    duration:6
                }}
                className="
                absolute
                right-8
                top-28
                rounded-3xl
                border
                border-white/40
                bg-white/80
                p-6
                backdrop-blur-2xl
                shadow-xl
                "
            >

                <Network
                    className="mx-auto text-green-600"
                    size={36}
                />

                <h3 className="mt-3 font-semibold">

                    Knowledge Graph

                </h3>

            </motion.div>

            {/* AI */}

            <motion.div
                animate={{
                    x:[0,10,0]
                }}
                transition={{
                    repeat:Infinity,
                    duration:7
                }}
                className="
                absolute
                bottom-20
                left-12
                rounded-3xl
                border
                border-white/40
                bg-white/75
                p-5
                backdrop-blur-2xl
                shadow-xl
                "
            >

                <BrainCircuit
                    className="text-green-600"
                    size={34}
                />

                <h4 className="mt-3 font-semibold">

                    AI Copilot

                </h4>

                <p className="mt-1 text-xs text-zinc-500">

                    Explain every mismatch.

                </p>

            </motion.div>

            {/* Risk */}

            <motion.div
                animate={{
                    y:[0,-8,0]
                }}
                transition={{
                    repeat:Infinity,
                    duration:5
                }}
                className="
                absolute
                bottom-12
                right-10
                rounded-3xl
                border
                border-white/40
                bg-white/80
                p-5
                backdrop-blur-2xl
                shadow-xl
                "
            >

                <AlertTriangle
                    className="text-orange-500"
                    size={34}
                />

                <h4 className="mt-3 font-semibold">

                    18 Alerts

                </h4>

                <p className="text-xs text-zinc-500">

                    Ready to resolve

                </p>

            </motion.div>

            {/* Compliance */}

            <motion.div
                animate={{
                    rotate:[0,3,0]
                }}
                transition={{
                    repeat:Infinity,
                    duration:8
                }}
                className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                rounded-[32px]
                border
                border-white/40
                bg-white/90
                px-14
                py-10
                shadow-2xl
                backdrop-blur-3xl
                "
            >

                <ShieldCheck
                    className="mx-auto text-green-600"
                    size={54}
                />

                <h2 className="mt-5 text-center text-6xl font-bold">

                    96%

                </h2>

                <p className="mt-2 text-center text-zinc-500">

                    Compliance Score

                </p>

            </motion.div>

        </motion.div>
    );
}