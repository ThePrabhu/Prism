// src/features/resolution/components/AskAIPanel.tsx

import { useState } from "react";
import {
    Bot,
    Send,
    Sparkles,
    User,
} from "lucide-react";

import type { ResolutionCase } from "../types/resolution.types";

interface AskAIPanelProps {
    resolutionCase: ResolutionCase;
}

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    message: string;
}

export default function AskAIPanel({
    resolutionCase,
}: AskAIPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            message: `I'm Prism AI.

I already analyzed this case.

Issue:
${resolutionCase.title}

Vendor:
${resolutionCase.vendorName}

Blocked ITC:
₹${resolutionCase.blockedAmount.toLocaleString()}

Ask me anything about this issue.`,
        },
    ]);

    const [input, setInput] = useState("");

    function sendMessage() {
        if (!input.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            message: input,
        };

        const aiMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            message:
                "Backend not connected yet. Once Gemini/OpenAI is integrated, I will answer using the current workspace, invoice, GST data, Neo4j graph, reconciliation engine and this specific resolution case.",
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
            aiMessage,
        ]);

        setInput("");
    }

    return (
        <section
            className="
                flex
                h-[650px]
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
                bg-white
            "
        >
            {/* Header */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-zinc-200
                    px-6
                    py-5
                "
            >
                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-50
                    "
                >
                    <Bot
                        size={20}
                        className="text-emerald-600"
                    />
                </div>

                <div>
                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-zinc-900
                        "
                    >
                        Ask Prism AI
                    </h3>

                    <p
                        className="
                            text-sm
                            text-zinc-500
                        "
                    >
                        Workspace-aware AI conversation
                    </p>
                </div>
            </div>

            {/* Chat */}

            <div
                className="
                    flex-1
                    space-y-5
                    overflow-y-auto
                    p-6
                "
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`
                                max-w-[80%]
                                rounded-3xl
                                px-5
                                py-4
                                ${
                                    message.role === "assistant"
                                        ? "bg-zinc-100"
                                        : "bg-emerald-600 text-white"
                                }
                            `}
                        >
                            <div className="mb-3 flex items-center gap-2">

                                {message.role === "assistant" ? (
                                    <Bot size={16} />
                                ) : (
                                    <User size={16} />
                                )}

                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                    "
                                >
                                    {message.role === "assistant"
                                        ? "Prism AI"
                                        : "You"}
                                </span>

                            </div>

                            <p
                                className="
                                    whitespace-pre-line
                                    text-sm
                                    leading-7
                                "
                            >
                                {message.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}

            <div
                className="
                    border-t
                    border-zinc-200
                    p-5
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <input
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Ask about this GST issue..."
                        className="
                            flex-1
                            rounded-2xl
                            border
                            border-zinc-200
                            px-5
                            py-4
                            outline-none
                            transition
                            focus:border-emerald-500
                        "
                    />

                    <button
                        onClick={sendMessage}
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-emerald-600
                            text-white
                            transition
                            hover:bg-emerald-700
                        "
                    >
                        <Send size={18} />
                    </button>
                </div>

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-zinc-500
                    "
                >
                    <Sparkles
                        size={14}
                        className="text-emerald-600"
                    />

                    Future backend: Gemini/OpenAI will receive only
                    the selected workspace + current resolution case
                    instead of the entire database.
                </div>
            </div>
        </section>
    );
}