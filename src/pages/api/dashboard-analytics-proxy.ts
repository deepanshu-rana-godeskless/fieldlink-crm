// Simple Next.js API proxy for dashboard analytics
// Place this file in /src/pages/api/dashboard-analytics-proxy.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { from_date = '', to_date = '' } = req.body || {};
    const token = req.headers.authorization || req.body.token || '';

    try {
        const apiRes = await fetch('https://deskteamdev.godeskless.com/api/admin/analytics/dashboard/count/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: token } : {}),
            },
            body: JSON.stringify({ from_date, to_date }),
            // No credentials needed, server-to-server
        });
        const data = await apiRes.json();
        res.status(apiRes.status).json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message || 'Proxy error' });
    }
}
