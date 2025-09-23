"use client";
import { useLocale } from "@/context/locale-context";

export default function FAQ() {
    const { t } = useLocale();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{t("faq.title")}</h1>
            <p>{t("faq.description")}</p>
        </div>
    );
}
