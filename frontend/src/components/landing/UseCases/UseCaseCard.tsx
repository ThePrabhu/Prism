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
        <article className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,248,243,0.92))] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-white">
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