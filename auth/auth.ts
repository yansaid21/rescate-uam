import { User } from "../types/user"
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(email: string, password: string, device_name: string) {
  const uri = "http://192.168.1.10:8000/api/auth/login";

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

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error("El usuario no está registrado. Por favor, regístrate.");
      } else if (response.status === 401) {
        throw new Error("La contraseña es incorrecta. Inténtalo de nuevo.");
      } else {
        throw new Error(errorData.message || "Error al iniciar sesión. Inténtalo más tarde.");
      }
    }

    const json = await response.json();
    await AsyncStorage.setItem('id', json.user.id.toString());
    await AsyncStorage.setItem('token', json.token);
    
    return json;

  } catch (error) {
    console.error("Error during login:", error);
    throw  error;
  }
}
