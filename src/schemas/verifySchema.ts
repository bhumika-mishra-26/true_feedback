import {z } from 'zod';

export const verifySchema = z.object({
    email: z.string().email({message: "Please use a valid email address"}),
    code: z.string().length(6, {message: "Verification code must be 6 characters long"})
})