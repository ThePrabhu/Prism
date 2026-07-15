import AuthLayout from "../../../app/layouts/AuthLayout";

import PasswordInput from "../components/PasswordInput";
import AuthFooter from "../components/AuthFooter";

export default function ResetPassword() {
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
                        Reset Password
                    </h1>

                    <p
                        className="
                            mt-6
                            text-xl
                            leading-9
                            text-zinc-600
                        "
                    >
                        Create a new password for your Prism account.
                    </p>

                </div>

                <form className="space-y-10">

                    <PasswordInput
                        label="New Password"
                        placeholder="Enter your new password"
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
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
                        Update Password
                    </button>

                </form>

                <div className="mt-12 border-t border-zinc-200 pt-8">

                    <AuthFooter
                        question="Want to return?"
                        action="Back to Login"
                        to="/login"
                    />

                </div>

            </div>

        </AuthLayout>
    );
}