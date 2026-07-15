import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HeroMouseGlow() {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, {
        stiffness: 45,
        damping: 20,
    });

    const y = useSpring(mouseY, {
        stiffness: 45,
        damping: 20,
    });

useEffect(() => {

    const move = (e: MouseEvent) => {
        mouseX.set(e.clientX - 250);
        mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    return () => {
        window.removeEventListener("mousemove", move);
    };

}, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x,
                y,
            }}
            className="
                pointer-events-none
                fixed
                top-0
                left-0
                z-0
                h-[500px]
                w-[500px]
                rounded-full
                bg-emerald-300/10
                blur-[140px]
            "
        />
    );
}