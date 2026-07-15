import { motion } from "framer-motion";

import FAQItem from "./FAQItem";
import { faqData } from "./faqData";

export default function FAQ() {
    return (
        <section
            id="faq"
            className="
                bg-white
                py-32
            "
        >
            <div
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="text-center"
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
                        FAQ
                    </span>

                    <h2
                        className="
                            mt-5
                            text-5xl
                            font-bold
                            tracking-tight
                            text-zinc-900
                            lg:text-6xl
                        "
                    >
                        Frequently Asked
                        <br />
                        Questions
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-2xl
                            text-lg
                            leading-8
                            text-zinc-600"
                        >
                        Everything you need to know before using Prism.
                    </p>
                </motion.div>

                <div className="mt-20">
                    {faqData.map((item) => (
                        <FAQItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}