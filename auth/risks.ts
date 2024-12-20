import { SERVER_IP } from '../utils/constants';

export async function getRiskSituation( token: string, id_institution: number) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/risk_situations`;

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
        return json; // Devolver la información del riesgo
    
        } catch (error) {
        console.error("Error fetching user info:", error);
    }
}

export async function createRisk(id_institution: number, name: string, description: string, token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/risk_situations`;
    
    const requestBody = {
        name,
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
        console.error("Error post risk situation:", error);
        throw error;
    }
}
