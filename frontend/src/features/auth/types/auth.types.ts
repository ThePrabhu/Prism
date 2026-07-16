import type { User, Session } from "@supabase/supabase-js";

export type AuthUser = User;

export type AuthSession = Session;

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName?: string;
    role?: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    password: string;
    confirmPassword: string;
}

export interface AuthState {
    user: AuthUser | null;
    session: AuthSession | null;
    loading: boolean;
}

export interface AuthResponse {
    success: boolean;
    message: string;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (
        credentials: RegisterCredentials
    ) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (
        payload: ForgotPasswordPayload
    ) => Promise<void>;
    resetPassword: (
        payload: ResetPasswordPayload
    ) => Promise<void>;
}