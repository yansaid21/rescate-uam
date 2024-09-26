import { User } from "../types/user"

export async function registerUser(name:string,lastname:string,email: string, password: string,id_card:number,rhgb:string,social_security:string,phone_number:string,is_active:boolean,role_id:number) {
  const uri = "http://localhost:8000/api/users";

  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        email,
        password,
        id_card,
        rhgb,
        social_security,
        phone_number,
        is_active,
        role_id
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
