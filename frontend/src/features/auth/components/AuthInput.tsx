import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="space-y-2">
                {/* Label */}

                <label
                    className="
                        block
                        text-sm
                        font-medium
                        text-zinc-700
                    "
                >
                    {label}
                </label>

                {/* Input */}

                <input
                    ref={ref}
                    {...props}
                    className={`
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white
                        px-5
                        text-[15px]
                        text-zinc-900
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-zinc-400
                        hover:border-zinc-300
                        focus:border-emerald-500
                        focus:ring-4
                        focus:ring-emerald-100
                        disabled:cursor-not-allowed
                        disabled:bg-zinc-100
                        ${className}
                    `}
                />

                {/* Error */}

                {error && (
                    <p
                        className="
                            text-sm
                            font-medium
                            text-red-500
                        "
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;