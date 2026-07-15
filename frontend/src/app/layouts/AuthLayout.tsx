import type { ReactNode } from "react";

import AuthHero from "../../features/auth/components/AuthHero";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-[#FCFCFB]">

            <div
                className="
                    grid
                    min-h-screen
                    lg:grid-cols-[45%_55%]
                "
            >

                {/* Left */}

                <section
                    className="
                        hidden
                        border-r
                        border-emerald-100
                        bg-gradient-to-br
                        from-[#F9FCFA]
                        via-white
                        to-[#F2FBF5]
                        lg:flex
                    "
                >
                    <AuthHero />
                </section>

                {/* Right */}

                <section
                    className="
                        flex
                        items-center
                        justify-center
                        px-10

                        lg:px-24
                    "
                >
                    <div className="w-full max-w-xl">

                        {children}

                    </div>

                </section>

            </div>

        </main>
    );
}