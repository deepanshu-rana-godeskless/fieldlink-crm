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
    const res = await fetch("https://deskteamdev.godeskless.com/api/admin/login/v2/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "ACCOUNTADMIN_APP" }),
    });

    if (!res.ok) throw new Error("Network error");

    const data: LoginResponse = await res.json();
    if (!data.status) {
        throw new Error(data.error?.msg || "Login failed");
    }
    return data;
}
