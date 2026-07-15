import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroMouseGlow from "./HeroMouseGlow";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero() {
    return (
        <section
            id="hero"
            className="
                relative
                flex
                min-h-screen
                isolate
                items-center
                justify-center
                overflow-hidden
                bg-[#F8FBF8]
            "
        >
            {/* Background */}
            <HeroBackground />

            {/* Mouse Glow */}
            <HeroMouseGlow />

            {/* Main Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-full
                    w-full
                    max-w-6xl
                    flex-col
                    items-center
                    justify-center
                    px-8
                    pt-32
                    pb-24
                    lg:px-12
                "
            >
                <HeroContent />
            </div>

            {/* Scroll Indicator */}
            <HeroScrollIndicator />
        </section>
    );
}
