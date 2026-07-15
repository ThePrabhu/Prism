import { Link } from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthFooter from "../components/AuthFooter";

export default function Register() {
    return (
        <AuthLayout>
            <div className="w-full max-w-[560px]">

                {/* Header */}

                <div className="mb-10">

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
                            mt-4
                            text-4xl
                            lg:text-5xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-zinc-950
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-xl
                            text-[1.05rem]
                            leading-relaxed
                            text-zinc-500
                        "
                    >
                        Create your Prism workspace and start
                        managing GST reconciliation with AI.
                    </p>

                </div>

                {/* Form */}

                <form
                    autoComplete="off"
                    className="space-y-5"
                >

                    <AuthInput
                        label="Full Name"
                        placeholder="John Doe"
                    />

                    <AuthInput
                        type="email"
                        label="Email Address"
                        placeholder="you@company.com"
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Create a strong password"
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                    />

                    <label
                        className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            leading-7
                            text-zinc-600
                        "
                    >
                        <input
                            type="checkbox"
                            className="
                                mt-1
                                h-4
                                w-4
                                rounded
                                border-zinc-300
                                text-emerald-600
                            "
                        />

                        <span>
                            I agree to the{" "}
                            <Link
                                to="/terms"
                                className="
                                    font-medium
                                    text-emerald-600
                                "
                            >
                                Terms of Service
                            </Link>
                            {" "}and{" "}
                            <Link
                                to="/privacy"
                                className="
                                    font-medium
                                    text-emerald-600
                                "
                            >
                                Privacy Policy
                            </Link>.
                        </span>

                    </label>

                    <button
                        type="submit"
                        className="
                            mt-2
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-lg
                            bg-zinc-950
                            text-[15px]
                            font-semibold
                            text-white
                            transition
                            duration-300
                            hover:bg-zinc-800
                        "
                    >
                        Create Account
                    </button>

                </form>

                <div className="mt-12 border-t border-zinc-200 pt-8">

                    <AuthFooter
                        question="Already have an account?"
                        action="Sign In"
                        to="/login"
                    />

                </div>

            </div>
        </AuthLayout>
    );
}