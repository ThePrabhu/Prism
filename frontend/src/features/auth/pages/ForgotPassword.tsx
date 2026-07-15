// import { Link } from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import AuthInput from "../components/AuthInput";
import AuthFooter from "../components/AuthFooter";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <div className="w-full max-w-[560px]">

                <div className="mb-16">

                    <span
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-emerald-600
                        "
                    >
                        PRISM WORKSPACE
                    </span>

                    <h1
                        className="
                            mt-5
                            text-6xl
                            font-bold
                            leading-[0.95]
                            tracking-[-0.06em]
                            text-zinc-950"
                        >
                        Forgot Password
                    </h1>

                    <p
                        className="
                            mt-6
                            text-xl
                            leading-9
                            text-zinc-600
                        "
                    >
                        Enter your email address and we'll send you a secure
                        password reset link.
                    </p>

                </div>

                <form className="space-y-10">

                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="you@company.com"
                    />

                    <button
                        type="submit"
                        className="
                            flex
                            h-16
                            w-full
                            items-center
                            justify-center
                            rounded-full
                            bg-zinc-950
                            text-lg
                            font-semibold
                            text-white
                            transition
                            hover:bg-zinc-800
                        "
                    >
                        Send Reset Link
                    </button>

                </form>

                <div className="mt-12 border-t border-zinc-200 pt-8">

                    <AuthFooter
                        question="Remember your password?"
                        action="Back to Sign In"
                        to="/login"
                    />

                </div>

            </div>
        </AuthLayout>
    );
}