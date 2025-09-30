// services/authService.ts
import api, { storage } from "./api";

export interface LoginPayload {
  username: string;
  password: string;
  source?: string;
}

export interface LoginResponse {
  status: boolean;
  data: any[];
  error: { msg?: string; error_code?: number };
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/api/admin/login/v2/",
    { ...payload, source: "ACCOUNTADMIN_APP" }
  );

  if (!data.status) {
    throw new Error(data.error?.msg || "Login failed");
  }

  // ✅ Store token in centralized storage
  const token = data?.data?.[0]?.access_token;
  if (token) storage.setToken(token);

  return data;
}
