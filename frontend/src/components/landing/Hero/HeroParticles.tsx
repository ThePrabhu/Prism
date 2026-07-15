import { motion } from "framer-motion";

const particles = [
  { size: 5, left: 8, delay: 0, duration: 18 },
  { size: 7, left: 18, delay: 2, duration: 16 },
  { size: 4, left: 27, delay: 1, duration: 20 },
  { size: 6, left: 36, delay: 3, duration: 15 },
  { size: 5, left: 45, delay: 4, duration: 19 },
  { size: 8, left: 54, delay: 1.5, duration: 17 },
  { size: 5, left: 63, delay: 0.5, duration: 21 },
  { size: 7, left: 72, delay: 2.5, duration: 18 },
  { size: 4, left: 81, delay: 3.5, duration: 16 },
  { size: 6, left: 90, delay: 1, duration: 22 },
];

export default function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{
            y: 120,
            opacity: 0,
          }}
          animate={{
            y: -900,
            opacity: [0, 0.35, 0.15, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear" as const,
          }}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
          }}
          className="
            absolute
            bottom-[-100px]
            rounded-full
            bg-gradient-to-br
            from-emerald-300
            to-lime-200
            blur-[1px]
          "
        />
      ))}
    </div>
  );
}