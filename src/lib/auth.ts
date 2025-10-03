// This is a stub. Replace with your actual logic to get the access token from auth context, cookies, or localStorage.
export function getAccessToken(): string {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token") || "";
    }
    return "";
}
