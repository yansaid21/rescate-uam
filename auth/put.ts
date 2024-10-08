// api/userService.ts
export async function updateUserInfo(id_user: number, token: string, userData: any) {
    const uri = `http://192.168.1.72:8000/api/users/${id_user}`;

    const formData = new FormData();
    formData.append('_method', 'PUT');  // Laravel necesita esto para tratar el POST como un PUT
    formData.append('email', userData.email);
    formData.append('name', userData.name);
    formData.append('last_name', userData.last_name);  
    formData.append('id_card', userData.id_card);

    try {
        console.log("Userid Put: ",id_user);
        
        const response = await fetch(uri, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", // Para recibir respuestas JSON
                "Authorization": `Bearer ${token}`, 
            },
            body: formData, 
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = `Error: ${response.statusText}`;
            errorMessage += ` - ${errorData.message}`;
            throw new Error(errorMessage);
        }

        const json = await response.json();
        return json; 

    } catch (error) {
        console.error("Error updating user info:", error);
        throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
}