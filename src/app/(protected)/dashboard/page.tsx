"use client";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export default function Dashboard() {
    const { t } = useLocale();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t("dashboard.title")}</h1>
            <p>{t("dashboard.welcome")}</p>
            <Link href="/dashboard/reports">
                <button className="mt-6 px-4 py-2 bg-foreground text-background rounded hover:bg-gray-800 transition-colors">
                    {t("dashboard.reportsButton")}
                </button>
            </Link>
        </div>
    );
}