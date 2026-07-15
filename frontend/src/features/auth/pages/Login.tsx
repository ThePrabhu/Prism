import { Link } from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthFooter from "../components/AuthFooter";

export default function Login() {
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
                            text-zinc-950
                        "
                    >
                        Welcome Back
                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-xl
                            leading-9
                            text-zinc-600
                        "
                    >
                        Sign in to continue to your Prism workspace.
                    </p>
                </div>

                <form
                    className="space-y-10"
                    autoComplete="off"
                >
                    <AuthInput
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                    />

                    <div className="flex items-center justify-between pt-4">
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600">
                            <input
                                type="checkbox"
                                className="
                                    h-4
                                    w-4
                                    pt-3
                                    rounded
                                    border-zinc-300
                                    text-emerald-600
                                    focus:ring-emerald-500
                                "
                            />
                            Remember me
                        </label>

                        <Link
                            to="/forgot-password"
                            className="
                                text-sm
                                pt-3
                                pb-3
                                font-medium
                                text-emerald-600
                                transition-colors
                                hover:text-emerald-700
                            "
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="
                            mt-5
                            flex
                            h-16
                            w-full
                            items-center
                            justify-center
                            rounded-full
                            bg-zinc-950
                            px-5
                            text-[15px]
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-zinc-800
                            hover:shadow-[0_18px_40px_rgba(0,0,0,.18)]
                        "
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-12 border-t border-zinc-200 pt-8">
                    <AuthFooter
                        question="Don't have an account?"
                        action="Create Account"
                        to="/register"
                    />
                </div>
            </div>
        </AuthLayout>
    );
}