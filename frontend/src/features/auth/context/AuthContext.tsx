import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    type AuthChangeEvent,
    type Session,
} from "@supabase/supabase-js";

import { supabase } from "../../../services/supabase/client";

import { authService } from "../services/authService";
import { AuthContext } from "./auth.context";

import type {
    AuthContextType,
    AuthSession,
    AuthUser,
    LoginCredentials,
    RegisterCredentials,
    ForgotPasswordPayload,
    ResetPasswordPayload,
} from "../types/auth.types";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [session, setSession] =
        useState<AuthSession | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        let isMounted = true;

        async function initialize() {
            try {
                const currentSession =
                    await authService.getCurrentSession();

                if (!isMounted) return;

                setSession(currentSession);
                setUser(currentSession?.user ?? null);
            } catch (error) {
                console.error(
                    "Auth initialization failed:",
                    error
                );

                if (!isMounted) return;

                setSession(null);
                setUser(null);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        initialize();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (
                _event: AuthChangeEvent,
                session: Session | null
            ) => {
                if (!isMounted) return;

                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    async function login(
        credentials: LoginCredentials
    ) {
        await authService.login(credentials);
    }

    async function register(
        credentials: RegisterCredentials
    ) {
        await authService.register(credentials);
    }

    async function logout() {
        await authService.logout();
    }

    async function forgotPassword(
        payload: ForgotPasswordPayload
    ) {
        await authService.forgotPassword(payload);
    }

    async function resetPassword(
        payload: ResetPasswordPayload
    ) {
        await authService.resetPassword(payload);
    }

    const value = useMemo<AuthContextType>(
        () => ({
            user,
            session,
            loading,

            login,
            register,
            logout,

            forgotPassword,
            resetPassword,
        }),
        [
            user,
            session,
            loading,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}