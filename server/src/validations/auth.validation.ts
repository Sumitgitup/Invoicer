import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required"),
    email: z
      .email({ message: "Invalid email address" }), // This is the modern syntax
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  }),
});