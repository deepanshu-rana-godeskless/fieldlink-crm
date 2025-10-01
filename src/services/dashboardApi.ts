// Fetch paginated logged-in FA data
interface FetchLoggedInFAParams {
    page?: number;
    token?: string;
    search_text?: string;
}

export async function fetchLoggedInFA({ page = 1, token, search_text = "" }: FetchLoggedInFAParams = {}) {
    const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem("authToken") : "");
    const res = await fetch(`https://circledev.godeskless.com/api/admin/login/users/?page=${page}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            body: JSON.stringify({ search_text }),
            credentials: "include"
        }
    );
    if (!res.ok) throw new Error("Failed to fetch logged in FA data");
    return res.json();
}

// Dashboard analytics API service
export async function fetchDashboardAnalytics({ from_date = "", to_date = "", token } = {}) {
    // Get token from param or localStorage
    const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem("access_token") : "");
    const res = await fetch("https://circledev.godeskless.com/api/admin/analytics/dashboard/count/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ from_date, to_date }),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard analytics");
    return res.json();
}
