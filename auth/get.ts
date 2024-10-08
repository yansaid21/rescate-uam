// api/userService.ts
export async function getUserInfo(id_user: number, token: string) {
    const uri = `http://192.168.1.2:8000/api/users/${id_user}`;

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
    const uri = "http://192.168.20.21:8000/api/users";

    try {
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

