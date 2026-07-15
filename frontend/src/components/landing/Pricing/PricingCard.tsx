import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
    title: string;
    monthly: string;
    yearly: string;
    description: string;
    button: string;
    features: string[];
    popular?: boolean;
}

export default function PricingCard({
    title,
    monthly,
    yearly,
    description,
    button,
    features,
    popular,
}: PricingCardProps) {
    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className={`
                relative
                flex
                min-h-[700px]
                flex-col
                rounded-none
                border
                bg-white
                p-10
                transition-all
                duration-300

                ${
                    popular
                        ? "border-emerald-500 shadow-xl"
                        : "border-zinc-200"
                }
            `}
        >
            {popular && (
                <span
                    className="
                        absolute
                        right-8
                        top-8
                        rounded-none
                        bg-emerald-500
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white
                    "
                >
                    Popular
                </span>
            )}

            <div>

                <h3
                    className="
                        text-3xl
                        font-semibold
                        text-zinc-900
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-5
                        text-zinc-600
                        leading-8
                    "
                >
                    {description}
                </p>

                <div className="mt-10">

                    <div className="flex items-end gap-2">

                        <span
                            className="
                                text-6xl
                                font-bold
                                tracking-tight
                                text-zinc-900
                            "
                        >
                            {monthly}
                        </span>

                        {monthly !== "Free" &&
                            monthly !== "Contact Sales" && (
                                <span
                                    className="
                                        pb-2
                                        text-zinc-500
                                    "
                                >
                                    /month
                                </span>
                            )}

                    </div>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-zinc-500
                        "
                    >
                        {yearly}
                    </p>

                </div>

            </div>

            <ul
                className="
                    mt-12
                    space-y-5
                    flex-1
                "
            >
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >
                        <Check
                            size={18}
                            className="text-emerald-600"
                        />

                        <span
                            className="
                                text-zinc-700
                            "
                        >
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                className={`
                    mt-12
                    w-full
                    rounded-none
                    py-4
                    text-sm
                    font-semibold
                    transition-all

                    ${
                        popular
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "border border-zinc-300 bg-white hover:border-zinc-900"
                    }
                `}
            >
                {button}
            </button>

        </motion.article>
    );
}