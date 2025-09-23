"use client";
import { useLocale } from "@/context/locale-context";

export default function Admin() {
    const { t } = useLocale();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t("admin.title")}</h1>
            <p>{t("admin.description")}</p>
        </div>
    );
}
