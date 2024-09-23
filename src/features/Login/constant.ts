import { z } from "zod";

export const formLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
  remember_me: z.boolean().optional(),
});
