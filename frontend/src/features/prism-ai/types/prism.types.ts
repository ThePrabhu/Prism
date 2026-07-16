export type Sender = "user" | "assistant";

export interface ChatAction {
    id: string;

    label: string;

    type:
        | "resolution"
        | "email"
        | "gst"
        | "itc";
}

export interface ChatMessage {
    id: string;

    sender: Sender;

    content: string;

    createdAt: string;

    actions?: ChatAction[];
}

export interface PrismConversation {
    workspaceId: string | null;

    messages: ChatMessage[];
}

export interface PrismContext {
    workspaceId: string | null;

    workspaceName: string;

    connected: boolean;
}