import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#FAFBFC]">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Topbar />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        bg-[#FAFBFC]
                        px-8
                        py-8
                    "
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
