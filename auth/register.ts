import { User } from "../types/user";

export async function registerUser(
  name: string,
  last_name: string,
  email: string,
  password: string,
  id_card: number,
  rhgb: string,
  social_security: string,
  phone_number: string,
  institution_id: number,
  code: string
) {
  const uri = "http://192.168.1.2:8000/api/users";

  const requestBody = {
    name,
    last_name,
    email,
    password,
    id_card,
    rhgb,
    social_security,
    phone_number,
    institution_id,
    code,
  };

  // Imprimir el body para verificar su contenido
  console.log("Request body:", requestBody);

  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody), // Convertir el objeto en JSON antes de enviarlo
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = `Error: ${response.statusText}`;
      errorMessage += ` - ${errorData.message}`;
      throw new Error(errorMessage);
    }

    const json = await response.json();
    console.log(json);

    const { data } = json;
    return data;

  } catch (error) {
    console.error("Error during registration:", error);
  }
}
