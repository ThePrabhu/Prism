import { Routes, Route } from "react-router-dom";

import LandingPage from "../../pages/Landing/LandingPage";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import ForgotPassword from "../../features/auth/pages/ForgotPassword";
import ResetPassword from "../../features/auth/pages/ResetPassword";

import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import DashboardHome from "../../features/dashboard/pages/DashboardHome";

import ResolutionCenter from "../../features/resolution/pages/ResolutionCenter";

import ITCCenter from "../../features/itc/pages/ITCCenter";

import PrismAI from "../../features/prism-ai/pages/PrismAI";


export default function AppRouter() {
    return (
        <Routes>

            {/* Public */}

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />

            {/* Protected */}

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/dashboard/resolution" element={<ResolutionCenter />} />
                    <Route path="/dashboard/tax" element={<ITCCenter />} />
                    <Route path="/dashboard/copilot" element={<PrismAI />} />
                </Route>
            </Route>
        </Routes>
    );
}
