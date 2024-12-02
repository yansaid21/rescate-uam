import { z } from 'zod';

export const RoomScheme = z.object({
    name: z.string({
        required_error: 'Campo requerido',
    })
    .max(100, { message: "No más de 100 caracteres" })
    .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/, { message: "No acepta caracteres especiales" }),
    code: z.string({
        required_error: 'Campo requerido',
    })
    .max(100, { message: "No más de 50 caracteres" })
    .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/, { message: "No acepta caracteres especiales" }),
    zones: z.string({
        required_error: 'Campo requerido',
    }),
    levels: z.string({
        required_error: 'Campo requerido',
    }),
    description: z.string({
        required_error: 'Campo requerido',
    })
    .max(1000, { message: "No más de 1000 caracteres" })
    .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/, { message: "No acepta caracteres especiales" }),
});
