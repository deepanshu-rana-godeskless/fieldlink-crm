"use client";
import { useLocale } from "@/context/locale-context";
import { BottomRightSheetPopup } from "@/components/BottomRightSheetPopup";

export default function Tickets() {
    const { t } = useLocale();
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-4">{t("tickets.title")}</h1>
                <p>{t("tickets.description")}</p>
            </div>
        </>
    );
}
