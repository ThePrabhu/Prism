export default function Footer() {
    return (
        <footer className="border-t border-emerald-950/8 bg-white px-8 py-14 lg:px-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-['Sora'] text-2xl font-black tracking-[-0.03em] text-zinc-950">
                        Prism
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600">
                        Explainable GST intelligence for finance teams that want faster reconciliation, clearer decisions, and less manual risk.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-zinc-600">
                    <a href="#problem">Problem</a>
                    <a href="#features">Features</a>
                    <a href="#usecases">Use Cases</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#faq">FAQ</a>
                </div>
            </div>
        </footer>
    );
}