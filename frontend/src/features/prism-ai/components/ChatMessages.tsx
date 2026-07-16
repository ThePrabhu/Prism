import MessageBubble from "./MessageBubble";

import type { ChatMessage } from "../types/prism.types";

interface ChatMessagesProps {
    messages: ChatMessage[];
}

export default function ChatMessages({
    messages,
}: ChatMessagesProps) {
    return (
        <section
            className="
                flex
                h-[520px]
                flex-col
                gap-6
                overflow-y-auto
                rounded-3xl
                border
                border-zinc-200
                bg-zinc-50
                p-6
            "
        >
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </section>
    );
}