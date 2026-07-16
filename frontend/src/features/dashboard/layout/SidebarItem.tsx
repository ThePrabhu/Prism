import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    to: string;
    icon: LucideIcon;
    label: string;
    collapsed: boolean;
}

export default function SidebarItem({
    to,
    icon: Icon,
    label,
    collapsed,
}: SidebarItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                group
                relative
                flex
                h-10
                items-center
                ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
                rounded-lg
                transition-all
                duration-200
                ${
                    isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }
                `
            }
        >
            <Icon
                size={19}
                strokeWidth={2}
                className="shrink-0"
            />

            <span
                className={`
                    overflow-hidden
                    whitespace-nowrap
                    text-[14px]
                    font-medium
                    transition-all
                    duration-300
                    ${
                        collapsed
                            ? "w-0 opacity-0"
                            : "w-[160px] opacity-100"
                    }
                `}
            >
                {label}
            </span>

            {collapsed && (
                <span
                    className="
                        pointer-events-none
                        absolute
                        left-14
                        z-50
                        rounded-md
                        bg-zinc-900
                        px-2
                        py-1
                        text-xs
                        font-medium
                        text-white
                        opacity-0
                        shadow-lg
                        transition
                        duration-200
                        group-hover:opacity-100
                    "
                >
                    {label}
                </span>
            )}
        </NavLink>
    );
}