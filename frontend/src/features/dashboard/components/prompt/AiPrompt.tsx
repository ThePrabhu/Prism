import { useState, type KeyboardEvent } from "react";
import { ArrowUp, Bot } from "lucide-react";

import { useDashboardStore } from "../../store/dashboardStore";

export default function AiPrompt() {
    const [prompt, setPrompt] = useState("");

    const addMessage = useDashboardStore(
        (state) => state.addMessage
    );

    const activeWorkspaceId = useDashboardStore(
        (state) => state.activeWorkspaceId
    );

    function submitPrompt() {
        if (!prompt.trim()) return;

        addMessage({
            id: crypto.randomUUID(),
            workspaceId: activeWorkspaceId ?? "global",
            role: "user",
            message: prompt,
            createdAt: new Date().toISOString(),
        });

        console.log("AI Prompt:", prompt);

        setPrompt("");
    }

    function handleKeyDown(
        event: KeyboardEvent<HTMLTextAreaElement>
    ) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitPrompt();
        }
    }

    return (
        <div
            className="
                group
                rounded-[32px]
                border
                border-zinc-200
                bg-white/90
                shadow-[0_10px_40px_rgba(0,0,0,.05)]
                backdrop-blur-xl
                transition-all
                duration-300
                focus-within:border-emerald-300
                focus-within:shadow-[0_18px_60px_rgba(16,185,129,.10)]
            "
        >
            <div className="flex items-start gap-5 p-2">

                <div
                    className="
                        mt-1
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-50
                        text-black-600
                    "
                >
                    
                    <Bot size={20} />
                </div>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask Prism anything about GST compliance..."
                    className="
                        min-h-[34px]
                        flex-1
                        resize-none
                        bg-transparent
                        text-[17px]
                        leading-8
                        text-zinc-900
                        outline-none
                        placeholder:text-zinc-400
                    "
                />

                <button
                    type="button"
                    onClick={submitPrompt}
                    disabled={!prompt.trim()}
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-500
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-emerald-600
                        disabled:cursor-not-allowed
                        disabled:bg-zinc-200
                        disabled:text-zinc-400
                    "
                >
                    <ArrowUp size={20} />
                </button>

            </div>

        </div>
    );
}
