import { User } from "../types/user";

export async function registerUser(
  name: string,
  last_name: string,
  email: string,
  password: string,
  id_card: number,
  /* rhgb: string,
  social_security: string,
  phone_number: string, */
  institution_id: number,
  code: string
) {
  const uri = `http://192.168.43.164:8000/api/users`;


  const requestBody = {
    name,
    last_name,
    email,
    password,
    id_card,
    /* rhgb,
    social_security,
    phone_number, */
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
      body: JSON.stringify(requestBody), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      let errorMessage = errorData.message || "Ocurrió un error durante el registro";
      
      if (errorData.errors) {
        const errorDetails = Object.values(errorData.errors).flat().join(", ");
        errorMessage += `: ${errorDetails}`;
      }

      throw new Error(errorMessage);
    }

    const json = await response.json();
    console.log(json);

    const { data } = json;
    return data;

  } catch (error:any) {
    console.error("Error during registration:", error);
    return Promise.reject(error.message);
  }
}
