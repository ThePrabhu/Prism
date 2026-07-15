import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

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

                <div className="relative">

                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        {...props}
                        className={`
                            h-16
                            w-full
                            rounded-2xl
                            border
                            border-zinc-200
                            bg-white
                            px-6
                            pr-14
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

                    {/* Toggle */}

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            rounded-lg
                            p-1.5
                            text-zinc-500
                            transition
                            hover:bg-zinc-100
                            hover:text-zinc-800
                        "
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>

                </div>

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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;