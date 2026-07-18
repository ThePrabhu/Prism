import {
    ExternalLink,
    Bot,
    ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ITCActionMenu() {
    const navigate = useNavigate();

    function openResolution() {
        navigate("/dashboard/resolution");
    }

    function openAI() {
        navigate("/dashboard/copilot");
    }

    function openGSTPortal() {
        window.open(
            "https://www.gst.gov.in/",
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <div
            className="
                flex
                items-center
                justify-center
                gap-2
            "
        >
            {/* Resolution */}
            <button
                onClick={openResolution}
                title="Open Resolution Center"
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-zinc-200
                    transition
                    hover:border-emerald-500
                    hover:bg-emerald-50
                "
            >
                <ShieldAlert
                    size={18}
                    className="text-emerald-600"
                />
            </button>

            {/* Prism AI */}
            <button
                onClick={openAI}
                title="Ask Prism AI"
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-zinc-200
                    transition
                    hover:border-emerald-500
                    hover:bg-emerald-50
                "
            >
                <Bot
                    size={18}
                    className="text-emerald-600"
                />
            </button>

            {/* GST Portal */}
            <button
                onClick={openGSTPortal}
                title="Open GST Portal"
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-zinc-200
                    transition
                    hover:border-emerald-500
                    hover:bg-emerald-50
                "
            >
                <ExternalLink
                    size={18}
                    className="text-emerald-600"
                />
            </button>
        </div>
    );
}