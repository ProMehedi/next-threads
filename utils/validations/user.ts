import * as z from 'zod'

export const userSchema = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(2).max(30),
  username: z.string().min(2).max(30),
  bio: z.string().max(160),
})
