import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  UserId: string;
  Email: string;
  Role: string;
  exp: number;
  iss: string;
  aud: string;
}

export function getPhotographerIdFromToken(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: CustomJwtPayload = jwtDecode(token);
    return parseInt(decoded.UserId, 10);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
