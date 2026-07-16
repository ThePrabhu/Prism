import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                   Login                                    */
/* -------------------------------------------------------------------------- */

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required.")
        .email("Enter a valid email."),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters."),
});

/* -------------------------------------------------------------------------- */
/*                                  Register                                  */
/* -------------------------------------------------------------------------- */

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Enter your full name."),

        email: z
            .string()
            .email("Enter a valid email."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

/* -------------------------------------------------------------------------- */
/*                              Forgot Password                               */
/* -------------------------------------------------------------------------- */

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email."),
});

/* -------------------------------------------------------------------------- */
/*                               Reset Password                               */
/* -------------------------------------------------------------------------- */

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type LoginForm =
    z.infer<typeof loginSchema>;

export type RegisterForm =
    z.infer<typeof registerSchema>;

export type ForgotPasswordForm =
    z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordForm =
    z.infer<typeof resetPasswordSchema>;