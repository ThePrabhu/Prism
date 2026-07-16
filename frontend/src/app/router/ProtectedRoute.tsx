import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

export default function ProtectedRoute() {
    const {
        user,
        loading,
    } = useAuth();

    const location = useLocation();

    // Session still loading

    if (loading) {
        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-white
                "
            >
                <div
                    className="
                        h-12
                        w-12
                        animate-spin
                        rounded-full
                        border-4
                        border-emerald-500
                        border-t-transparent
                    "
                />
            </div>
        );
    }

    // User not authenticated

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    // User authenticated

    return <Outlet />;
}