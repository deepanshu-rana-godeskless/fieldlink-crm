"use client";
import { useLocale } from "@/context/locale-context";

export default function Visits() {
    const { t } = useLocale();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t("visits.title")}</h1>
            <p>{t("visits.description")}</p>
        </div>
    );
}
