"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

// Schema de validación
const loginSchema = z.object({
  username: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Validar datos de entrada
    const rawUsername = formData.get("username");
    const rawPassword = formData.get("password");

    if (typeof rawUsername !== "string" || typeof rawPassword !== "string") {
      return "Datos inválidos";
    }

    const validated = loginSchema.safeParse({
      username: rawUsername.trim(),
      password: rawPassword,
    });

    if (!validated.success) {
      return validated.error.errors[0].message;
    }

    // Crear nuevo FormData con datos validados
    const validatedFormData = new FormData();
    validatedFormData.set("username", validated.data.username);
    validatedFormData.set("password", validated.data.password);

    await signIn("credentials", validatedFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas";
        default:
          return "Algo salió mal";
      }
    }
    throw error;
  }
}
