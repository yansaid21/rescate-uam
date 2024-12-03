import { z } from 'zod';

export const RegisterScheme = z.object({
    email: z.string({
            required_error: 'Campo requerido',
        })
        .email({ message: "Correo inválido" })
        .max(100, { message: "No más de 100 caracteres" })
        .refine((email) => email.endsWith('@autonoma.edu.co'), {
            message: "El correo debe pertenecer al dominio autonoma.edu.co",
        }),
    password: z.string({
            required_error: 'Campo requerido',
        })
        .min(8, { message: "Al menos 8 caracteres" })
        .max(100, { message: "No más de 100 caracteres" })
        .regex(/^(?!.*\s)(?!.*ñ).*/, { message: "No admite espacios ni la letra ñ" }),
    repassword: z.string({
            required_error: 'Campo requerido',
        })
        .min(8, { message: "Al menos 8 caracteres" })
        .max(100, { message: "No más de 100 caracteres" }),
    id: z.string({
            required_error: 'Campo requerido',
        })
        .max(10, { message: "No más de 10 caracteres" })
        .regex(/^\d+$/, { message: "Solo números" }),
    name: z.string({
            required_error: 'Campo requerido',
        })
        .max(50, { message: "No más de 50 caracteres" })
        .regex(/^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s]+$/, { message: "Debe contener letras" }),
    lastname: z.string({
            required_error: 'Campo requerido',
        })
        .max(50, { message: "No más de 50 caracteres" })
        .regex(/^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s]+$/, { message: "Debe contener letras" }),
    termsAccepted: z.boolean().refine(value => value === true, {
        message: "Debe aceptar los términos y condiciones"
    })
}).refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"], 
});


