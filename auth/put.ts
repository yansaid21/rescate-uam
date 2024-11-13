// api/userService.ts
import { SERVER_IP } from '../utils/constants';
import * as mime from 'react-native-mime-types'; 

export async function updateUserInfo(id_user: number, token: string, userData: any) {
    const uri = `http://${SERVER_IP}:8000/api/users/${id_user}`;
    console.log("Log de userData: ",userData);
    
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
                "Accept": "application/json", 
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
        throw error; 
    }
}

export async function updateUserInfoWithoutEmail(id_user: number, token: string, userData: any) {
    const uri = `http://${SERVER_IP}:8000/api/users/${id_user}`;

    console.log("Log de userData: ",userData);
    
    const formData = new FormData();
    formData.append('_method', 'PUT');  // Laravel necesita esto para tratar el POST como un PUT
    formData.append('name', userData.name);
    formData.append('last_name', userData.last_name);  
    formData.append('id_card', userData.id_card);

    try {
        console.log("Userid Put: ",id_user);
        
        const response = await fetch(uri, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
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
        throw error; 
    }
}

export async function updateUserInfoComplete(id_user: number, token: string, userData: any) {
    const uri = `https://${SERVER_IP}/api/users/${id_user}`;
    console.log("Log de userData: ", userData);

    const formData = new FormData();
    formData.append('_method', 'PUT');  
    formData.append('rhgb', userData.rhgb);
    formData.append('social_security', userData.social_security);
    formData.append('phone_number', userData.phone_number.toString());
    formData.append('code', userData.code);
    formData.append('institution_id', 1);

    // Manejar el campo photo_path, solo si no es null
    if (userData.photo_path) {
        const fileUri = userData.photo_path;
        const fileType = mime.lookup(fileUri) || 'application/octet-stream'; // Detectar tipo MIME o usar un genérico
        const fileName = fileUri.split('/').pop();  // Obtener el nombre del archivo desde la ruta

        formData.append('photo', {
            uri: fileUri,
            name: fileName,  // Nombre del archivo
            type: fileType,  // Tipo de archivo detectado
        });
    }

    try {
        console.log("Userid Put: ", id_user);

        const response = await fetch(uri, {
            method: "POST",  // Laravel espera POST con _method='PUT'
            headers: {
                "Accept": "application/json",  // No usamos "Content-Type": "application/json" porque estamos enviando FormData
                "Authorization": `Bearer ${token}`,  // Autenticación
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
        throw error;
    }
}
