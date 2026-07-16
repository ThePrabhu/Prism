import {
    forwardRef,
    useState,
    type InputHTMLAttributes,
} from "react";

import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const PasswordInput = forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(
    ({ label, error, className = "", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="space-y-2">
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

                <div className="relative">

                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        className={`
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-zinc-300
                            bg-white
                            px-5
                            pr-14
                            text-base
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-zinc-400
                            focus:border-emerald-500
                            focus:ring-4
                            focus:ring-emerald-100
                            ${className}
                        `}
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            text-zinc-500
                            transition-colors
                            hover:text-zinc-900
                        "
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>

                </div>

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;