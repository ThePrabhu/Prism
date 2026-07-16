import { usePrismAI } from "../hooks/usePrismAI";

import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

export default function PrismAI() {
    const {
        context,
        messages,
        sendMessage,
    } = usePrismAI();

    return (
        <main
            className="
                mx-auto
                flex
                w-full
                max-w-7xl
                flex-col
                gap-6
                px-8
                py-8
            "
        >
            <ChatHeader
                workspaceName={
                    context.workspaceName
                }
                connected={
                    context.connected
                }
            />

            <ChatMessages
                messages={messages}
            />

            <ChatInput
                onSend={sendMessage}
            />
        </main>
    );
}