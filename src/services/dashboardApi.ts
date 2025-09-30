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
