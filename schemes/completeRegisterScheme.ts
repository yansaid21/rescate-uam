import { z } from 'zod';

export const CompleteRegisterScheme = z.object({
    rhgb: z.string({
            required_error: 'Campo requerido',
        }),
    phone_number: z.string({
            required_error: 'Campo requerido',
        })
        .max(20, { message: "No más de 20 caracteres" })
        .regex(/^\d+$/, { message: "Solo números" }),
    social_security: z.string({
            required_error: 'Campo requerido',
        })
        .max(100, { message: "No más de 100 caracteres" })
        .regex(/^[A-Za-z\s]+$/, { message: "Debe contener letras" }),
    code: z.string({
            required_error: 'Campo requerido',
        })
        .max(100, { message: "No más de 100 caracteres" })
        .regex(/^(?!.*\s)(?!.*ñ).*/, { message: "No admite espacios ni la letra ñ" }),
    photo_path: z.string({
            required_error: 'Campo requerido',
        })
});
