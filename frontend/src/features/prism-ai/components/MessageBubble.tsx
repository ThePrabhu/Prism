import {
    Bot,
    User,
    ArrowUpRight,
} from "lucide-react";

import type { ChatMessage } from "../types/prism.types";

interface MessageBubbleProps {
    message: ChatMessage;
}

export default function MessageBubble({
    message,
}: MessageBubbleProps) {
    const assistant =
        message.sender === "assistant";

    return (
        <div
            className={`flex ${
                assistant
                    ? "justify-start"
                    : "justify-end"
            }`}
        >
            <div
                className={`
                    max-w-4xl
                    rounded-3xl
                    border
                    p-5
                    shadow-sm
                    ${
                        assistant
                            ? "border-zinc-200 bg-white"
                            : "border-emerald-600 bg-emerald-600 text-white"
                    }
                `}
            >
                <div className="mb-3 flex items-center gap-3">

                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            ${
                                assistant
                                    ? "bg-emerald-50"
                                    : "bg-white/20"
                            }
                        `}
                    >
                        {assistant ? (
                            <Bot
                                size={18}
                                className="text-emerald-600"
                            />
                        ) : (
                            <User size={18} />
                        )}
                    </div>

                    <span className="font-semibold">
                        {assistant
                            ? "Prism AI"
                            : "You"}
                    </span>

                </div>

                <div
                    className="
                        whitespace-pre-line
                        leading-7
                    "
                >
                    {message.content}
                </div>

                {assistant &&
                    message.actions &&
                    message.actions.length > 0 && (

                    <div className="mt-6 flex flex-wrap gap-3">

                        {message.actions.map(
                            (action) => (

                                <button
                                    key={action.id}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-zinc-200
                                        px-4
                                        py-2
                                        text-sm
                                        transition
                                        hover:bg-zinc-100
                                    "
                                >
                                    <ArrowUpRight size={15} />

                                    {action.label}

                                </button>

                            )
                        )}

                    </div>

                )}

            </div>
        </div>
    );
}