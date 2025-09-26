"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
    const { theme, setTheme } = useTheme();
    const { Breadcrumb } = require("@/components/ui/Breadcrumb");
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                {/* <SidebarTrigger className="-ml-1" /> */}
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4 bg-slate-100" />
                <Breadcrumb />
            </div>
        </header>
    );
}

export default SiteHeader;
