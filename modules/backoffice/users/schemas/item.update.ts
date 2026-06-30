import { z } from "zod/v3";
import { UserInternalRol, UserStatus } from "../models/user";

export const UpdateUserSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(100).nullish(),
  username: z.string().trim().max(60, "No debe superar los 60 caracteres").nullish(),
  email: z.string().trim().email().nullish(),
  status: z.nativeEnum(UserStatus).nullish(),
  internalRol: z.nativeEnum(UserInternalRol).nullish(),
});

export type RequestUpdateUser = z.infer<typeof UpdateUserSchema>;
