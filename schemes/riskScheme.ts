import { z } from 'zod';

export const RiskScheme = z.object({
    name: z.string({
            required_error: 'Campo requerido',
        })
        .max(100, { message: "No más de 100 caracteres" })
        .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, { message: "Debe contener letras" }),
    description: z.string({
        required_error: 'Campo requerido',
    })
    .max(1000, { message: "No más de 1000 caracteres" })
    .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, { message: "No acepta caracteres especiales" }),
});
