import { z } from 'zod';

export const RegisterScheme = z.object({
    email: z.string()
        .email({ message: "Correo inválido" })
        .min(1, { message: "Campo requerido" })
        .max(100, { message: "No más de 100 caracteres" })
        .refine((email) => email.endsWith('@autonoma.edu.co'), {
            message: "El correo debe pertenecer al dominio autonoma.edu.co",
        }),
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(100, { message: "No más de 100 caracteres" }),
        repassword: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(100, { message: "No más de 100 caracteres" }),
    id: z.string()
        .min(1, { message: "Campo requerido" })
        .max(20, { message: "No más de 20 caracteres" }),
    name: z.string()
        .min(1, { message: "Campo requerido" })
        .max(50, { message: "No más de 50 caracteres" }),
    lastname: z.string()
        .min(1, { message: "Campo requerido" })
        .max(50, { message: "No más de 50 caracteres" }),
    termsAccepted: z.boolean().refine(value => value === true, {
        message: "Debe aceptar los términos y condiciones"
    })
}).refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
});


