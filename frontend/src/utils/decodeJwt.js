// archivo para decodificar el token de jwt y obtener los datos del usuario

export default function decodeJwt(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return { header, payload };
  }