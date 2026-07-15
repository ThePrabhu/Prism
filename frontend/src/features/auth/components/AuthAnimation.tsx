import { motion } from "framer-motion";

import prismLogo from "../../../assets/prism.png";

const DASHES = 144;

const rings = [
    120,
    180,
    245,
    315,
];

export default function AuthAnimation() {
    return (
        <div className="relative flex h-[720px] w-[880px] items-center justify-center">

            {/* Background Glow */}

            <div
                className="
                    absolute
                    h-[720px]
                    w-[720px]
                    rounded-full
                    bg-emerald-100/70
                    blur-[130px]
                "
            />

            {/* Soft Rings */}

            {rings.map((size) => (

                <div
                    key={size}
                    className="
                        absolute
                        rounded-full
                        border
                        border-emerald-100/70
                    "
                    style={{
                        width: size,
                        height: size,
                    }}
                />

            ))}

            {/* Rotating Dash Field */}

            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-0"
            >
                {Array.from({ length: DASHES }).map((_, index) => {

                    const angle = (360 / DASHES) * index;

                    return (
                        <div
                            key={index}
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                origin-bottom
                            "
                            style={{
                                transform: `
                                    rotate(${angle}deg)
                                    translateY(-315px)
                                `,
                            }}
                        >

                            <motion.div
                                animate={{
                                    opacity: [0.35, 1, 0.35],
                                    scaleY: [1, 1.15, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: index * 0.015,
                                }}
                                className="
                                    h-9
                                    w-[2.5px]
                                    rounded-full
                                    bg-zinc-900
                                "
                            />

                        </div>
                    );

                })}
            </motion.div>

            {/* Logo Glow */}

            {/* <div
                className="
                    absolute
                    h-[170px]
                    w-[170px]
                    rounded-full
                    bg-emerald-100
                    blur-3xl
                "
            /> */}

            {/* Logo Circle */}

            <div
            
                className="
                    relative
                    z-20
                    flex
                    h-48
                    w-48
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-[0_40px_100px_rgba(16,185,129,.16)]
                "
            >
                <img
                    src={prismLogo}
                    alt="Prism"
                    className="h-30 w-30 object-contain"
                />
            </div>

        </div>
    );
}