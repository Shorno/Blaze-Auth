import {z} from "zod";

export const signupSchema = z.object({
    email: z.string().nonempty({message: "Email is required"}).email({message: "Email address must be valid"}),
    username: z.string({required_error: "Username is required"})
        .nonempty({message: "Username is required"})
        .min(3, {message: "Username must be at least 3 characters long"})
        .regex(/^[a-zA-Z0-9]+$/, {message: "Username must contain only alphanumeric characters"}),
    password: z.string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one number"})
        .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"}),
    confirmPassword: z.string()
        .nonempty({message: "Please confirm your password"})
        .min(8, {message: "Password must be at least 8 characters long"})
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().nonempty({message: "Email is required"}).email({message: "Email address must be valid"}),
    password: z.string().nonempty({message: "Password is required"})
});
