"use client";
import { useLocale } from "@/context/locale-context";

export default function Reports() {
    const { t } = useLocale();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t("reports.title")}</h1>
            <p>{t("reports.description")}</p>
        </div>
    );
}
