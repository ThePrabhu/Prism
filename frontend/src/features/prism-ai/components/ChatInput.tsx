import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

interface ChatInputProps {
    onSend(message: string): void;
}

export default function ChatInput({
    onSend,
}: ChatInputProps) {
    const [message, setMessage] =
        useState("");

    function handleSend() {
        if (!message.trim()) return;

        onSend(message);

        setMessage("");
    }

    return (
        <section
            className="
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-5
                shadow-sm
            "
        >
            <div className="flex items-end gap-4">

                <button
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-zinc-200
                        transition
                        hover:bg-zinc-100
                    "
                >
                    <Paperclip size={18} />
                </button>

                <textarea
                    rows={2}
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Ask anything about GST, Finance or this workspace..."
                    className="
                        flex-1
                        resize-none
                        rounded-2xl
                        border
                        border-zinc-200
                        p-4
                        outline-none
                        focus:border-emerald-500
                    "
                />

                <button
                    onClick={handleSend}
                    className="
                        flex
                        h-12
                        w-12
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
        </section>
    );
}