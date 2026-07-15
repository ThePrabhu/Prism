import { motion } from "framer-motion";

import FeatureGrid from "./FeatureGrid";

export default function Features() {
    return (
        <section
            id="features"
            className="
                relative
                w-full
                overflow-hidden
                bg-white
                py-28
                lg:py-32
            "
        >
            {/* Background Grid */}

            <div className="absolute inset-0">

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right,#111827 1px,transparent 1px),
                            linear-gradient(to bottom,#111827 1px,transparent 1px)
                        `,
                        backgroundSize: "90px 90px",
                    }}
                />

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[900px]
                        w-[900px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-emerald-100/30
                        blur-[180px]
                    "
                />

            </div>

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-7xl
                    px-6
                    lg:px-10
                "
            >

                {/* Heading */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
                        mx-auto
                        max-w-5xl
                        text-center
                    "
                >

                    <span
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-emerald-600
                        "
                    >
                        FEATURES
                    </span>

                    <h2
                        className="
                            mt-5
                            text-5xl
                            font-bold
                            leading-[1.02]
                            tracking-tight
                            text-zinc-950
                            lg:text-7xl
                        "
                    >
                        Everything your
                        <br />
                        finance team needs.
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-4xl
                            text-xl
                            leading-9
                            text-zinc-600
                        "
                    >
                        Prism combines AI-powered reconciliation,
                        vendor intelligence, compliance monitoring,
                        knowledge graphs and reporting into one
                        intelligent GST workspace.
                    </p>

                </motion.div>

                {/* Grid */}

                <FeatureGrid />

            </div>

        </section>
    );
}
