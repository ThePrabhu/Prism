import {
    forwardRef,
    type InputHTMLAttributes,
} from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
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

                <input
                    ref={ref}
                    className={`
                        h-12
                        w-full
                        rounded-xl
                        border
                        px-5
                        text-base
                        outline-none
                        transition-all
                        duration-200
                        bg-white
                        border-zinc-300
                        focus:border-emerald-500
                        focus:ring-4
                        focus:ring-emerald-100
                        placeholder:text-zinc-400
                        ${className}
                    `}
                    {...props}
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;