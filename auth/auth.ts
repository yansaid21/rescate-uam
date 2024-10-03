import { User } from "../types/user"

export async function loginUser(email: string, password: string, device_name: string) {
  const uri = "http://192.168.1.9:8000/api/auth/login";

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
    
    return json;

  } catch (error) {
    console.error("Error during login:", error);
  }
}
