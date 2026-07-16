import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../app/layouts/AuthLayout";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthFooter from "../components/AuthFooter";

import { useAuth } from "../hooks/useAuth";

import {
    loginSchema,
    type LoginForm,
} from "../validation/auth.schema";

export default function Login() {
    const navigate = useNavigate();

    const {
        login,
        user,
    } = useAuth();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (user) {
            navigate("/dashboard", {
                replace: true,
            });
        }
    }, [user, navigate]);

    async function onSubmit(data: LoginForm) {
        try {
            setServerError("");

            await login({
                email: data.email,
                password: data.password,
            });

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError(
                    "Unable to sign in. Please try again."
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
                        Welcome Back
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
                        Sign in to continue to your Prism workspace.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    autoComplete="off"
                >

                    <AuthInput
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <PasswordInput
                        label="Password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <div className="flex items-center justify-between pt-4">

                        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600">

                            <input
                                type="checkbox"
                                className="
                                    h-4
                                    w-4
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
                                font-medium
                                text-emerald-600
                                transition
                                hover:text-emerald-700
                            "
                        >
                            Forgot password?
                        </Link>

                    </div>

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

                                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            mt-6
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-lg
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
                            ? "Signing In..."
                            : "Sign In"}
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