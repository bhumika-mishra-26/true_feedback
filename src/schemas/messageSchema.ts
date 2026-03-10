import {z} from 'zod';
export const messageSchema = z.object({
   content: z.string().min(10, {message: "Message content cannot be empty"})
   .max(300, {message: "Message content must be less than 300 characters"})

})
