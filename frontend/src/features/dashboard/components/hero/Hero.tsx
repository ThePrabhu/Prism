import PrismLogo from "../../../../assets/prism.png";

export default function Hero() {
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    return (
        <section
            className="
                relative
                flex
                w-full
                flex-col
                items-center
                overflow-hidden
                pt-0
                pb-1
            "
        >
            {/* Background Glow */}

            <div
                className="
                    absolute
                    inset-0
                    -z-10
                    flex
                    items-start
                    justify-center
                    overflow-hidden
                "
            >
                <div
                    className="
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-emerald-400/10
                        blur-[120px]
                    "
                />

                <div
                    className="
                        absolute
                        top-0
                        h-[700px]
                        w-[700px]
                        rounded-full
                        border
                        border-emerald-100
                    "
                />

                <div
                    className="
                        absolute
                        top-10
                        h-[560px]
                        w-[560px]
                        rounded-full
                        border
                        border-zinc-100
                    "
                />

                <div
                    className="
                        absolute
                        top-24
                        h-[420px]
                        w-[420px]
                        rounded-full
                        border
                        border-zinc-100
                    "
                />
            </div>

            {/* Logo */}

            <img
                src={PrismLogo}
                alt="Prism"
                className="
                    h-24
                    w-24
                    object-contain
                    drop-shadow-xl
                    select-none
                "
                draggable={false}
            />

            {/* Greeting */}

            <h2
                className="
                    mt-2
                    text-4xl
                    font-bold
                    tracking-[-0.05em]
                    text-zinc-950
                "
            >
                {greeting}, Prabhu
            </h2>

            {/* Subtitle */}

            <p
                className="
                    mt-2
                    max-w-2xl
                    text-center
                    text-lg
                    leading-7
                    text-zinc-500
                "
            >
                Upload returns or ask Prism AI to begin your compliance
                workspace.
            </p>
        </section>
    );
}
