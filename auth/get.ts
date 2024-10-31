// api/userService.ts
import { SERVER_IP } from '../utils/constants';

export async function getUserInfo(token: string) {
    const uri = `http://${SERVER_IP}:8000/api/institutions/1/users`;

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

export async function getAllUsers() {
    const uri = `http://${SERVER_IP}:8000/api/institutions/1/users`;

    try {
        console.log("obteniendo a todos los usuarios");
        
        const response = await fetch(uri, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            },
        });
    
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios.");
        }
    
        const json = await response.json();
        return json.data; 
    } catch (error: any) {
        console.error("Error al obtener los usuarios:", error.message);
        throw error;
    }
}

