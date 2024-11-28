import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../utils/constants';

export async function createIncident(id_institution: number, id_risk: number, token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/risk_situations/${id_risk}/incidents`;
    
    const requestBody = {};

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
        console.error("Error post incident:", error);
        throw error;
    }
}

export async function updateIncident(id_institution: number, id_risk: number, description: string, token: string, id_incident: number) {
    const uri = `https://${SERVER_IP}/api/institutions/${id_institution}/risk_situations/${id_risk}/incidents/${id_incident}`;
    
    const requestBody = {
        description,
    };
    
    try {
        const response = await fetch(uri, {
            method: "PUT",
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
        console.error("Error put incident:", error);
        throw error;
    }
}

export async function getIncidents(token: string) {
    const uri = `https://${SERVER_IP}/api/institutions/1/incidents`;

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
        console.error("Error fetching incidents info:", error);
    }
}
