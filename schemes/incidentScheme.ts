import { z } from 'zod';

export const IncidentScheme = z.object({
    description: z.string({
        required_error: 'Campo requerido',
    })
    .max(1000, { message: "No más de 1000 caracteres" })
    .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, { message: "No acepta caracteres especiales" }),
});
