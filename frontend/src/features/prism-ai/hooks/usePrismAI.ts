import { useMemo, useState } from "react";

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

import type {
    ChatMessage,
    PrismContext,
} from "../types/prism.types";

export function usePrismAI() {
    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    const workspaces = useDashboardStore(
        (state) => state.workspaces
    );

    const activeWorkspace = useMemo(
        () =>
            workspaces.find(
                (workspace) =>
                    workspace.id === activeWorkspaceId
            ) ?? null,
        [workspaces, activeWorkspaceId]
    );

    const [messages, setMessages] =
        useState<ChatMessage[]>([
            {
                id: crypto.randomUUID(),

                sender: "assistant",

                createdAt:
                    new Date().toISOString(),

                content: activeWorkspace
                    ? `Hello 👋



${activeWorkspace.name}

I can help you understand GST mismatches, ITC recovery, vendor risks, invoice analysis and compliance questions for this workspace.`
                    : `Hello 👋

I'm Prism AI Financial Analyst.

No workspace is currently selected.

You can still ask me GST, Finance, Accounting and Tax related questions.`,
            },
        ]);

    const context: PrismContext = {
        workspaceId:
            activeWorkspace?.id ?? null,

        workspaceName:
            activeWorkspace?.name ??
            "General Assistant",

        connected:
            !!activeWorkspace,
    };

    function sendMessage(
        prompt: string
    ) {
        if (!prompt.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),

            sender: "user",

            content: prompt,

            createdAt:
                new Date().toISOString(),
        };

        setMessages((previous) => [
            ...previous,
            userMessage,
        ]);

        /*
        Backend Integration

        POST /api/copilot/chat

        {
            workspaceId:
                context.workspaceId,

            message:
                prompt
        }

        Response

        setMessages([
            assistantResponse
        ])

        */
    }

    function addAssistantMessage(
        message: ChatMessage
    ) {
        setMessages((previous) => [
            ...previous,
            message,
        ]);
    }

    return {

        context,

        messages,

        sendMessage,

        addAssistantMessage,

    };
}