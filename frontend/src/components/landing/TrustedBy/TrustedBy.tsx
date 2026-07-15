import { 
    Hexagon, 
    Triangle, 
    CircleDashed, 
    Square, 
    Cloud,
    Box
} from "lucide-react";

export default function TrustedBy() {
    const logos = [
        { icon: <Hexagon size={32} />, name: "Acme Corp" },
        { icon: <Triangle size={32} />, name: "Globex" },
        { icon: <CircleDashed size={32} />, name: "Soylent" },
        { icon: <Square size={32} />, name: "Initech" },
        { icon: <Cloud size={32} />, name: "Umbrella" },
        { icon: <Box size={32} />, name: "Stark Ind" }
    ];

    return (
        <section className="px-8 py-16 lg:px-12 bg-white">
            <div className="mx-auto max-w-6xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-10">
                    Trusted by innovative teams worldwide
                </p>
                <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-60 grayscale">
                    {logos.map((logo, index) => (
                        <div key={index} className="flex items-center gap-2 text-zinc-700 transition-opacity duration-300 hover:opacity-100 cursor-default">
                            {logo.icon}
                            <span className="font-['Sora'] font-bold text-xl tracking-tight">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
