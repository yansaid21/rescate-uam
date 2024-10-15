import { z } from 'zod';

export const LoginScheme = z.object({
    email: z.string()
        .email({ message: "Correo inválido" })
        .min(1, { message: "Campo requerido" })
        .max(100, { message: "No mas de 100 caracteres" })
        .refine((email) => email.endsWith('@autonoma.edu.co'), {
            message: "El correo debe pertenecer al dominio autonoma.edu.co",
        }),
    password: z.string()
        .min(8, { message: "Campo requerido" })
        .max(100, { message: "No mas de 100 caracteres" }) 
})
