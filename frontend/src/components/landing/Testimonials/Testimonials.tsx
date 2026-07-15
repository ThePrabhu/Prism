import { motion } from "framer-motion";

const testimonialsData = [
    {
        name: "Sarah Jenkins",
        designation: "VP of Finance",
        company: "TechFlow",
        review: "Prism has completely transformed how our team handles reconciliation. The AI copilot saves us hours every week and the accuracy is unparalleled. A must-have for modern finance teams.",
        photo: "https://i.pravatar.cc/150?img=47"
    },
    {
        name: "Michael Chang",
        designation: "Chief Financial Officer",
        company: "Nexus Industries",
        review: "The vendor intelligence features alone paid for the platform in our first month. Clean interface, responsive support, and powerful reporting. We couldn't be happier with our switch to Prism.",
        photo: "https://i.pravatar.cc/150?img=11"
    },
    {
        name: "Elena Rodriguez",
        designation: "Director of Operations",
        company: "Lumina Retail",
        review: "Implementing Prism was seamless. The knowledge graph preview gives us insights we didn't even know we were missing. Highly recommend for any growing enterprise.",
        photo: "https://i.pravatar.cc/150?img=32"
    }
];

export default function Testimonials() {
    return (
        <section id="customers" className="px-8 py-24 lg:px-12 bg-[#F8F8F5]">
            <div className="mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6FAF8D]">
                        Testimonials
                    </p>
                    <h2 className="mt-4 font-['Sora'] text-4xl font-black tracking-[-0.035em] text-[#141414] sm:text-5xl">
                        Loved by finance leaders.
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="p-10 bg-white border border-[#DFE4DD] flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md"
                        >
                            <p className="text-[#616161] leading-relaxed mb-10 text-[15px]">
                                "{testimonial.review}"
                            </p>
                            
                            <div className="flex items-center gap-4 mt-auto">
                                <img 
                                    src={testimonial.photo} 
                                    alt={testimonial.name} 
                                    className="w-14 h-14 rounded-none object-cover grayscale"
                                />
                                <div>
                                    <h4 className="font-['Sora'] font-bold text-[#141414] text-sm">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-[#616161] text-xs mt-1 font-medium">
                                        {testimonial.designation}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
