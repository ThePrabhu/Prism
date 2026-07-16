import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../app/layouts/AuthLayout";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthFooter from "../components/AuthFooter";

import { useAuth } from "../hooks/useAuth";

import {
    registerSchema,
    type RegisterForm,
} from "../validation/auth.schema";

export default function Register() {

    const navigate = useNavigate();

    const {
        register: registerUser,
    } = useAuth();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterForm) {

        try {

            setServerError("");

            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });

            navigate("/login", {
                replace: true,
            });

        } catch (error) {

            if (error instanceof Error) {
                setServerError(error.message);
            } else {

                setServerError(
                    "Unable to create your account."
                );

            }

        }

    }

    return (

        <AuthLayout>

            <div className="w-full max-w-[560px]">

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
                        Create your Prism workspace
                        and start managing GST
                        reconciliation with AI.
                    </p>

                </div>

                <form

                    onSubmit={handleSubmit(onSubmit)}

                    className="space-y-5"

                    autoComplete="off"

                >

                    <AuthInput
                        label="Full Name"
                        placeholder="John Doe"
                        autoComplete="name"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                    />

                    <AuthInput
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <PasswordInput
                        label="Password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
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
                                focus:ring-emerald-500
                            "
                        />

                        <span>
                            I agree to the{" "}

                            <Link
                                to="/terms"
                                className="
                                    font-medium
                                    text-emerald-600
                                    hover:text-emerald-700
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
                                    hover:text-emerald-700
                                "
                            >
                                Privacy Policy
                            </Link>

                        </span>

                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            mt-2
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-lg
                            bg-zinc-950
                            px-6
                            text-[15px]
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
                            ? "Creating Account..."
                            : "Create Account"}
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