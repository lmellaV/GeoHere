const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: { id: string; username: string };
  message?: string;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    rut: string;
    password: string;
  };
  message?: string;
}

export interface CheckinResponse {
  success: boolean;
  message: string;
  location?: string;
}

export const register = async (
  name: string,
  rut: string,
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, rut }),
  });
  return response.json();
};

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getLocations = async (): Promise<{
  success: boolean;
  locations: Location[];
}> => {
  const response = await fetch(`${API_URL}/api/locations`);
  return response.json();
};

export const checkin = async (
  userId: string,
  locationId: string,
  latitude: number,
  longitude: number,
  action: "checkin" | "checkout",
): Promise<CheckinResponse> => {
  const response = await fetch(`${API_URL}/api/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      locationId,
      userLatitude: latitude,
      userLongitude: longitude,
      action,
    }),
  });
  return response.json();
};
