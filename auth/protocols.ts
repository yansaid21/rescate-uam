import { SERVER_IP } from '../utils/constants';

export async function getProtocolsInfo(id_institution: number, token: string, id_risk_situation: number) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/risk_situations/${id_risk_situation}/protocols`;
    console.log('uri ', uri);

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
            const errorData = await response.json(); 
            console.error("Detalles del error:", errorData); 
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    
        const json = await response.json();
        return json; // Devolver la información del usuario
    
        } catch (error) {
        console.error("Error fetching protocol info:", error);
    }
}
