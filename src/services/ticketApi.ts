import { getAccessToken } from "@/lib/auth";

export interface TicketApiParams {
    page?: number;
    fr_id?: string;
    search_text?: string;
    status?: string;
    timezone?: string;
}

export interface Ticket {
    id: number;
    name: string;
    description: string;
    ticket_status: string;
    ticket_priority: string;
    reported_date: string;
    source: string;
    ticket_type: string;
    requester_name: string;
    requester_email: string;
    location_address?: {
        location_name?: string;
        city?: string;
        state?: string;
        pincode?: string;
        country?: string;
    };
}

export interface TicketApiResponse {
    next: string | null;
    previous: string | null;
    count: number;
    total_pages: number;
    results: Ticket[];
}

export async function fetchTickets(params: TicketApiParams): Promise<TicketApiResponse> {
    const accessToken = getAccessToken();
    const timezone = params.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const page = params.page || 1;
    const body = {
        fr_id: params.fr_id || "",
        search_text: params.search_text || "",
        status: params.status || "",
        timezone,
    };

    const res = await fetch(`https://deskteamdev.godeskless.com/api/admin/all_ticket/?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch tickets");
    }
    const data = await res.json();
    return data.data[0];
}
