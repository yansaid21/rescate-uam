import { User } from "../types/user"

export async function loginUser(email: string, password: string, device_name: string) {
  const uri = "http://localhost:8000/api/auth/login";

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
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const json = await response.json();
    console.log(json);

    const { data } = json;
    return data;

  } catch (error) {
    console.error("Error during login:", error);
  }
}
