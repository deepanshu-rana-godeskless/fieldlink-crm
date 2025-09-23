"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export function Breadcrumb() {
    const { t } = useLocale();
    const pathname = usePathname() || "";
    const segments = pathname.split("/").filter(Boolean);
    const crumbs = segments.map((seg, idx) => {
        // Use translation key for segment, fallback to prettified segment
        const key = `breadcrumb.${seg}`;
        const label = t(key) !== key ? t(key) : seg.charAt(0).toUpperCase() + seg.slice(1);
        const href = "/" + segments.slice(0, idx + 1).join("/");
        return { label, href };
    });

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
                {crumbs.map((item, idx) => (
                    <li key={item.href} className="flex items-center">
                        {idx < crumbs.length - 1 ? (
                            <Link href={item.href} className="hover:underline text-gray-700 font-medium">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-400 font-semibold">{item.label}</span>
                        )}
                        {idx < crumbs.length - 1 && (
                            <span className="mx-2 text-gray-300">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
