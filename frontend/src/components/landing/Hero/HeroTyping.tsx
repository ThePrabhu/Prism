import { TypeAnimation } from "react-type-animation";

export default function HeroTyping() {
    return (
        <div className="flex min-h-[52px] max-w-full items-center justify-center px-3">
            <TypeAnimation
                sequence={[
                    "Visualize Every GST Relationship",
                    1800,
                    "Recover Eligible ITC",
                    1800,
                    "Explain Every Mismatch",
                    1800,
                    "Monitor Vendor Compliance",
                    1800,
                    "Resolve Vendor Mismatches Faster",
                    1800,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                cursor
                className="
                    inline-block
                    max-w-full
                    text-center
                    text-2xl
                    leading-tight
                    sm:text-3xl
                    lg:text-[2.35rem]
                    font-semibold
                    tracking-tight
                    text-zinc-900
                "
            />
        </div>
    );
}
