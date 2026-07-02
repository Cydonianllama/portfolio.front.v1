import { z } from "zod/v3";

export const CreateUserSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(100),

  username: z
    .string()
    .max(60, "No debe superar los 60 caracteres"),

  email: z
    .string()
    .email(),

  password: z
    .string().
    min(5, "Debe tener al menos 5 caracteres"),
});

export type RequestCreateUser = z.infer<typeof CreateUserSchema>;