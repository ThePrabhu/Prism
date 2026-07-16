import { supabase } from "../../../services/supabase/client";

import type {
    LoginCredentials,
    RegisterCredentials,
    ForgotPasswordPayload,
    ResetPasswordPayload,
} from "../types/auth.types";

class AuthService {
    async login({
        email,
        password,
    }: LoginCredentials) {
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {
            throw error;
        }

        return data;
    }

    async register({
        email,
        password,
        fullName,
        companyName,
        role,
    }: RegisterCredentials) {
        const { data, error } =
            await supabase.auth.signUp({
                email,
                password,

                options: {
                    data: {
                        fullName,
                        companyName,
                        role,
                    },
                },
            });

        if (error) {
            throw error;
        }

        return data;
    }

    async logout() {
        const { error } =
            await supabase.auth.signOut();

        if (error) {
            throw error;
        }
    }

    async forgotPassword({
        email,
    }: ForgotPasswordPayload) {
        const { error } =
            await supabase.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo:
                        `${window.location.origin}/reset-password`,
                }
            );

        if (error) {
            throw error;
        }
    }

    async resetPassword({
        password,
    }: ResetPasswordPayload) {
        const { data, error } =
            await supabase.auth.updateUser({
                password,
            });

        if (error) {
            throw error;
        }

        return data;
    }

    async getCurrentUser() {
        const { data, error } =
            await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        return data.user;
    }

    async getCurrentSession() {
        const { data, error } =
            await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        return data.session;
    }
}

export const authService = new AuthService();