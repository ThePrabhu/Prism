import { useRef, useState, useEffect } from "react";
import {
    User,
    Crown,
    LogOut,
    ChevronUp,
    Pencil,
} from "lucide-react";

interface ProfileDropdownProps {
    collapsed: boolean;

    name: string;

    email?: string;

    premium?: boolean;

    onEditName(): void;

    onUpgrade(): void;

    onLogout(): void;
}

export default function ProfileDropdown({
    collapsed,
    name,
    email = "Personal Workspace",
    premium = false,
    onEditName,
    onUpgrade,
    onLogout,
}: ProfileDropdownProps) {
    const [open, setOpen] = useState(false);

    const dropdownRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(
            event: MouseEvent
        ) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        }

        window.addEventListener(
            "click",
            handleClick
        );

        return () =>
            window.removeEventListener(
                "click",
                handleClick
            );
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            <button
                onClick={() =>
                    setOpen((prev) => !prev)
                }
                className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    p-2
                    transition
                    hover:bg-zinc-100
                "
            >
                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-100
                    "
                >
                    <User
                        size={20}
                        className="text-emerald-700"
                    />
                </div>

                <div className="flex-1 text-left">

                    <p
                        className="
                            truncate
                            text-sm
                            font-semibold
                        "
                    >
                        {name}
                    </p>

                    <p
                        className="
                            truncate
                            text-xs
                            text-zinc-500
                        "
                    >
                        {email}
                    </p>

                </div>

                <ChevronUp
                    size={18}
                    className={`
                        transition-transform
                        duration-200
                        ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </button>

            {open && (
                <div
                    className="
                        absolute
                        bottom-16
                        left-0
                        w-72
                        overflow-hidden
                        rounded-2xl
                        border
                        border-zinc-200
                        bg-white
                        shadow-2xl
                        z-50
                    "
                >
                    <div
                        className="
                            border-b
                            border-zinc-200
                            p-5
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-emerald-100
                                "
                            >
                                <User
                                    className="text-emerald-700"
                                    size={22}
                                />
                            </div>

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    {name}
                                </h3>

                                <p
                                    className="
                                        text-xs
                                        text-zinc-500
                                    "
                                >
                                    {email}
                                </p>

                                {premium && (
                                    <span
                                        className="
                                            mt-1
                                            inline-flex
                                            rounded-full
                                            bg-yellow-100
                                            px-2
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            text-yellow-700
                                        "
                                    >
                                        PREMIUM
                                    </span>
                                )}

                            </div>

                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onEditName();
                        }}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            transition
                            hover:bg-zinc-50
                        "
                    >
                        <Pencil size={18} />

                        Edit Display Name
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onUpgrade();
                        }}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            transition
                            hover:bg-zinc-50
                        "
                    >
                        <Crown
                            size={18}
                            className="text-yellow-500"
                        />

                        Upgrade to Premium
                    </button>

                    <div className="border-t border-zinc-200" />

                    <button
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            text-red-600
                            transition
                            hover:bg-red-50
                        "
                    >
                        <LogOut size={18} />

                        Logout
                    </button>

                </div>
            )}
        </div>
    );
}