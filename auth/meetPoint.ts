import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../utils/constants';

export async function createMeetPoint(id_institution: number, name: string, id_zone: number, description: string, token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/meet_points`;
    console.log('body en create ', id_zone);
    
    const requestBody = {
        name,
        zones: [id_zone],
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
        console.error("Error post meet point:", error);
        throw error;
    }
}

export async function getMeetPoints(id_institution: number, token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/meet_points`;

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
        console.error("Error fetching user info:", error);
    }
}
