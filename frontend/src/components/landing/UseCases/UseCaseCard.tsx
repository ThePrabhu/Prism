import type { LucideIcon } from "lucide-react";

type UseCaseCardProps = {
    title: string;
    audience: string;
    description: string;
    icon: LucideIcon;
};

export default function UseCaseCard({
    title,
    audience,
    description,
    icon: Icon,
}: UseCaseCardProps) {
    return (
        <article className="rounded-none border border-[#DFE4DD] bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-none bg-emerald-900 text-white">
                <Icon className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-900/65">
                {audience}
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-zinc-950">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
                {description}
            </p>
        </article>
    );
}