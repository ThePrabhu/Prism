import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({
    question,
    answer,
}: FAQItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            layout
            className="
                border-b
                border-zinc-200
            "
        >
            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    py-8
                    text-left
                "
            >
                <h3
                    className="
                        text-2xl
                        font-semibold
                        text-zinc-900
                    "
                >
                    {question}
                </h3>

                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                    }}
                >
                    <ChevronDown />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="overflow-hidden"
            >
                <p
                    className="
                        max-w-4xl
                        pb-8
                        text-lg
                        leading-8
                        text-zinc-600
                    "
                >
                    {answer}
                </p>
            </motion.div>
        </motion.div>
    );
}