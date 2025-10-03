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
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                {/* SidebarTrigger removed: not exported from sidebar. Add a sidebar open/close button here if needed. */}
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4 bg-slate-100" />
                <Breadcrumb />
                <div className="flex-1" />
                <button
                    className="ml-auto bg-slate-100 dark:bg-slate-800 rounded-full p-2 shadow hover:ring-2 hover:ring-blue-300 transition"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </button>
            </div>
        </header>
    );
}

export default SiteHeader;
