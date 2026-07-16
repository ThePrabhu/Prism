// import { Link } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../app/layouts/AuthLayout";

import AuthInput from "../components/AuthInput";
import AuthFooter from "../components/AuthFooter";

import { useAuth } from "../hooks/useAuth";

import {
    forgotPasswordSchema,
    type ForgotPasswordForm,
} from "../validation/auth.schema";

export default function ForgotPassword() {

    const { forgotPassword } = useAuth();

    const [serverError, setServerError] = useState("");

    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(
            forgotPasswordSchema
        ),
    });

    async function onSubmit(
        data: ForgotPasswordForm
    ) {

        try {

            setServerError("");

            await forgotPassword({
                email: data.email,
            });

            setEmailSent(true);

        } catch (error) {

            if (error instanceof Error) {

                setServerError(error.message);

            } else {

                setServerError(
                    "Unable to send reset email."
                );

            }

        }

    }

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
                        Enter your registered email
                        address and we'll send you
                        a password reset link.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-10"
                >

                    <AuthInput
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    {serverError && (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-red-200
                                bg-red-50
                                px-5
                                py-4
                                text-sm
                                text-red-600
                            "
                        >
                            {serverError}
                        </div>

                    )}

                    {emailSent && (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-emerald-200
                                bg-emerald-50
                                px-5
                                py-4
                                text-sm
                                text-emerald-700
                            "
                        >
                            Password reset email sent.
                            Please check your inbox.
                        </div>

                    )}
                                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            flex
                            h-16
                            w-full
                            items-center
                            justify-center
                            rounded-full
                            bg-zinc-950
                            px-6
                            text-base
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-zinc-800
                            hover:shadow-[0_18px_40px_rgba(0,0,0,.18)]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            disabled:hover:bg-zinc-950
                            disabled:hover:shadow-none
                        "
                    >
                        {isSubmitting
                            ? "Sending..."
                            : "Send Reset Link"}
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