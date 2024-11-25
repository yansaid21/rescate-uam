import { SERVER_IP } from '../utils/constants';

export async function getInstitutionInfo(token: string) {
    const uri = `http://${SERVER_IP}/api/institutions/1`;

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
