
import z from 'zod'

export const registerUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8, 'password must be at least 8 character long')
})