import { useMemo } from "react";

import { useDashboardStore } from "../store/dashboardStore";
import type { Workspace } from "../types/dashboard.types";

interface SidebarHistoryProps {
    collapsed: boolean;
}

export default function SidebarHistory({
    collapsed,
}: SidebarHistoryProps) {
    const workspaces = useDashboardStore((state) => state.workspaces);
    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );
    const selectWorkspace = useDashboardStore(
        (state) => state.selectWorkspace
    );
    const setActiveSection = useDashboardStore(
        (state) => state.setActiveSection
    );

    const groupedWorkspaces = useMemo(() => {
        return workspaces.reduce<Record<string, Workspace[]>>(
            (acc, workspace) => {
                const month = new Intl.DateTimeFormat(
                    "en-US",
                    {
                        month: "long",
                        year: "numeric",
                    }
                ).format(
                    new Date(workspace.createdAt)
                );

                if (!acc[month]) {
                    acc[month] = [];
                }

                acc[month].push(workspace);
                return acc;
            },
            {}
        );
    }, [workspaces]);

    return (
        <div
            className={`
                flex
                min-h-0
                flex-1
                flex-col
                overflow-hidden
                transition-all
                duration-300
                ${collapsed ? "max-h-0 opacity-0 group-hover:max-h-[42vh] group-hover:opacity-100" : "max-h-[42vh] opacity-100"}
            `}
        >
            <div className="mb-4 px-2">
                <p
                    className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.28em]
                        text-zinc-400
                    "
                >
                    Workspace History
                </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="space-y-6">
                    {Object.entries(groupedWorkspaces).map(
                        ([month, monthWorkspaces]) => (
                            <div key={month}>
                                <p className="mb-2 px-2 text-xs font-medium text-zinc-400">
                                    {month}
                                </p>

                                <div className="space-y-1">
                                    {monthWorkspaces.map((workspace) => {
                                        const isActive =
                                            workspace.id === activeWorkspaceId;

                                        return (
                                            <button
                                                key={workspace.id}
                                                onClick={() => {
                                                    selectWorkspace(
                                                        workspace.id
                                                    );
                                                    setActiveSection("home");
                                                }}
                                                className={`
                                                    flex
                                                    w-full
                                                    items-start
                                                    justify-between
                                                    rounded-2xl
                                                    px-3
                                                    py-3
                                                    text-left
                                                    transition-all
                                                    duration-200
                                                    ${
                                                        isActive
                                                            ? "bg-emerald-50 text-emerald-800"
                                                            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                                                    }
                                                `}
                                            >
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium">
                                                        {workspace.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-zinc-400">
                                                        {workspace.totalFiles} files ·{" "}
                                                       • {workspace.totalAlerts} alerts
                                                    </p>
                                                </div>

                                                <span
                                                    className="
                                                        ml-3
                                                        shrink-0
                                                        rounded-full
                                                        bg-white
                                                        px-2
                                                        py-1
                                                        text-[10px]
                                                        font-semibold
                                                        text-zinc-500
                                                        shadow-sm
                                                    "
                                                >
                                                    {workspace.status.charAt(0).toUpperCase() + workspace.status.slice(1)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
