export default function Footer() {
    return (
        <footer className="border-t border-emerald-950/8 bg-white px-8 py-16 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-6 lg:col-span-5">
                        <p className="font-['Sora'] text-2xl font-black tracking-[-0.03em] text-zinc-950">
                            Prism
                        </p>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
                            Explainable GST intelligence for finance teams that want faster reconciliation, clearer decisions, and less manual risk.
                        </p>
                    </div>

                    <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-zinc-900 mb-4 text-sm tracking-wide uppercase">Product</h4>
                            <div className="flex flex-col gap-3 text-sm text-zinc-600 font-medium">
                                <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
                                <a href="#usecases" className="hover:text-emerald-700 transition-colors">Use Cases</a>
                                <a href="#pricing" className="hover:text-emerald-700 transition-colors">Pricing</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 mb-4 text-sm tracking-wide uppercase">Company</h4>
                            <div className="flex flex-col gap-3 text-sm text-zinc-600 font-medium">
                                <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
                                <a href="#customers" className="hover:text-emerald-700 transition-colors">Customers</a>
                                <a href="#faq" className="hover:text-emerald-700 transition-colors">FAQ</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 mb-4 text-sm tracking-wide uppercase">Legal</h4>
                            <div className="flex flex-col gap-3 text-sm text-zinc-600 font-medium">
                                <a href="#privacy" className="hover:text-emerald-700 transition-colors">Privacy Policy</a>
                                <a href="#terms" className="hover:text-emerald-700 transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
                    <p>© {new Date().getFullYear()} Prism. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#twitter" className="hover:text-emerald-700 transition-colors">Twitter</a>
                        <a href="#linkedin" className="hover:text-emerald-700 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}