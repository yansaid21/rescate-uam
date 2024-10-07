import { User } from "../types/user"
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(email: string, password: string, device_name: string) {
  const uri = "http://192.168.20.21:8000/api/auth/login";

  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        device_name
      }),
    });

    // Verifica si la respuesta fue exitosa
    console.log();
    
    if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
    }


    const json = await response.json();
    await AsyncStorage.setItem('id', json.user.id.toString());
    await AsyncStorage.setItem('token', json.token);
    
    return json;

  } catch (error) {
    console.error("Error during login:", error);
  }
}
