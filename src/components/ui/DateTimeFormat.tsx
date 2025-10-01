// src/components/ui/DateTimeFormat.tsx
import React from "react";

export function formatDateTime(dateString?: string) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourStr = String(hours).padStart(2, "0");
    return `${day} ${month} ${year} ${hourStr}:${minutes} ${ampm}`;
}

export const DateTimeFormat: React.FC<{ value?: string; className?: string }> = ({ value, className }) => (
    <span className={className}>{formatDateTime(value)}</span>
);
