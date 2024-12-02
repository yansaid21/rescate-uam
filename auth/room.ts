import { SERVER_IP } from '../utils/constants';

export async function getRoomsInfo(id_institution: number, token: string, id_zone: number) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/zones/${id_zone}/rooms`;

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
        console.error("Error fetching room info:", error);
    }
}

export async function createRoom(id_institution: number, id_zone: number, level_id: number, name: string, code: string, description: string,token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/zones/${id_zone}/rooms`;
    
    const requestBody = {
        name,
        code,
        zones: [id_zone],
        level_id: level_id,
        description,
    };

    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });
    
        if (!response.ok) {
            const errorData = await response.json(); 
            console.error("Detalles del error:", errorData); 
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    
        const json = await response.json();
        return json;
    
        } catch (error) {
        console.error("Error post room:", error);
        throw error;
    }
}
