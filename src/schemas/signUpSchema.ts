import {z} from 'zod';

 export const usernameValidation =z.string()
    .min(2, "Username is required")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
export const signUpSchema=z.object({
    username: usernameValidation,
    email: z.string().email({message: "Please use a valid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"})

})


