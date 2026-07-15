import { motion } from "framer-motion";

import PricingCard from "./PricingCard";
import { pricingData } from "./pricingData";

export default function Pricing() {
    return (
        <section id="pricing" className="px-8 py-24 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-900/70">
                        Pricing
                    </p>
                    <h2 className="mt-4 font-['Sora'] text-4xl font-black tracking-[-0.035em] text-zinc-950 sm:text-5xl">
                        Start with the model that fits your team.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-zinc-600">
                        Keep the commercial model simple at launch and tailor the rollout to the complexity of your finance operations.
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {pricingData.map((item) => (
                        <PricingCard key={item.name} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}