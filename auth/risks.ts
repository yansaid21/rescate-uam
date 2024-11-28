
export async function getRiskSituation( token: string, id_institution: number) {
  const uri = `http://192.168.43.164:8000/api/institutions/${id_institution}/risk_situations`;

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
      return json; // Devolver la información del riesgo
  
      } catch (error) {
      console.error("Error fetching user info:", error);
  }
}