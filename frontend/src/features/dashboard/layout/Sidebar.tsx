import { useState } from "react";
import {
    PanelLeftClose,
    Bell,
    ReceiptIndianRupee,
    Bot,
} from "lucide-react";

import NewWorkspaceButton from "../components/shared/NewWorkspaceButton";

import ProfileDropdown from "../profile/ProfileDropdown";
import EditProfileModal from "../profile/EditProfileModal";
import PremiumModal from "../profile/PremiumModal";

import SidebarItem from "./SidebarItem";
import SidebarHistory from "./SidebarHistory";

import PrismLogo from "../../../assets/prism.png";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const [profileName, setProfileName] =
        useState("Prabhu");

    const [editOpen, setEditOpen] =
        useState(false);

    const [premiumOpen, setPremiumOpen] =
        useState(false);

    return (
        <aside
            className={`
                flex
                h-screen
                flex-col
                border-r
                border-zinc-200/70
                bg-white
                transition-all
                duration-300
                ${
                    collapsed
                        ? "w-[68px]"
                        : "w-[280px]"
                }
            `}
        >
            {/* ======================================================
                HEADER
            ====================================================== */}

            <div
                className="
                    flex
                    h-[64px]
                    shrink-0
                    items-center
                    px-3
                "
            >
                <button
                    onClick={() =>
                        setCollapsed(
                            !collapsed
                        )
                    }
                    className="
                        group
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        transition
                        hover:bg-zinc-100
                    "
                >
                    <div className="relative h-7 w-7">

                        <img
                            src={PrismLogo}
                            alt="Prism"
                            className="
                                absolute
                                inset-0
                                h-7
                                w-7
                                object-contain
                                transition-opacity
                                duration-200
                                group-hover:opacity-0
                            "
                        />

                        <PanelLeftClose
                            size={18}
                            className={`
                                absolute
                                inset-0
                                m-auto
                                opacity-0
                                transition-all
                                duration-200
                                group-hover:opacity-100
                                ${
                                    collapsed
                                        ? "rotate-180"
                                        : ""
                                }
                            `}
                        />

                    </div>

                </button>

            </div>

            {/* ======================================================
                NAVIGATION
            ====================================================== */}

            <div className="shrink-0 px-2">

                <NewWorkspaceButton
                    collapsed={collapsed}
                />

                <SidebarItem
                    to="/dashboard/resolution"
                    icon={Bell}
                    label="Alerts"
                    collapsed={collapsed}
                />

                <SidebarItem
                    to="/dashboard/tax"
                    icon={
                        ReceiptIndianRupee
                    }
                    label="Tax Center"
                    collapsed={collapsed}
                />

                <SidebarItem
                    to="/dashboard/copilot"
                    icon={Bot}
                    label="Prism AI"
                    collapsed={collapsed}
                />

            </div>

            <div
                className="
                    mx-3
                    my-3
                    shrink-0
                    border-t
                    border-zinc-200
                "
            />

            {/* ======================================================
                HISTORY
            ====================================================== */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-2
                    scrollbar-thin
                    scrollbar-thumb-zinc-300
                    scrollbar-track-transparent
                "
            >
                <SidebarHistory
                    collapsed={
                        collapsed
                    }
                />
            </div>

            {/* ======================================================
                PROFILE MODALS
                (Footer will be added next)
            ====================================================== */}

            <div className="shrink-0 border-t border-zinc-200 p-2">

    <ProfileDropdown
                    name={profileName}
                    email="Personal Workspace"
                    premium={false}
                    onEditName={() => setEditOpen(true)}
                    onUpgrade={() => setPremiumOpen(true)}
                    onLogout={() => {
                        window.location.href = "/";
                    } } collapsed={false}    />

</div>

<EditProfileModal
    open={editOpen}
    currentName={profileName}
    onClose={() => setEditOpen(false)}
    onSave={(newName) => {
        setProfileName(newName);
    }}
/>

<PremiumModal
    open={premiumOpen}
    onClose={() => setPremiumOpen(false)}
    onUpgrade={() => {
        alert("Stripe integration later");
    }}
/>
            <EditProfileModal
                open={editOpen}
                currentName={
                    profileName
                }
                onClose={() =>
                    setEditOpen(false)
                }
                onSave={(
                    newName
                ) => {
                    setProfileName(
                        newName
                    );
                }}
            />

            <PremiumModal
                open={premiumOpen}
                onClose={() =>
                    setPremiumOpen(
                        false
                    )
                }
                onUpgrade={() => {
                    alert(
                        "Stripe integration later."
                    );
                }}
            />

        </aside>
    );
}