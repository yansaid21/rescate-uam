import { SERVER_IP } from '../utils/constants';

export async function getInstitutionInfo(token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/1`;

    try {
        const response = await fetch(uri, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`, // Asegúrate de enviar el token de autenticación
            },
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const json = await response.json();
        return json; // Devolver la información del usuario
    
        } catch (error) {
        console.error("Error fetching institution info:", error);
    }
}

export async function putInstitutionInfo(token: string, name: string, description: string) {
    const uri = `https://${SERVER_IP}/api/institutions/1`;

    try {
        const response = await fetch(uri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`, // Enviar el token de autenticación
            },
            body: JSON.stringify({
                name, // Campo de nombre a actualizar
                description // Campo de descripción a actualizar
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        return json; // Devolver la información actualizada de la institución
    } catch (error) {
        console.error("Error updating institution info:", error);
        throw error; // Re-lanzar el error para manejarlo fuera de esta función
    }
}

