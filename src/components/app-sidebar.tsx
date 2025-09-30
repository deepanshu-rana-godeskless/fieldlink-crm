"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocale } from "@/context/locale-context";
import {
    Settings,
    HelpCircle,
    LogOut,
    Home,
    Inbox,
    Calendar,
    ChevronDown,
    Check,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Tickets", url: "/tickets", icon: Inbox },
    { title: "Visits", url: "/visits", icon: Calendar },
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Admin", url: "/admin", icon: Settings },
    { title: "FAQ", url: "/faq", icon: HelpCircle },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { state } = require("@/components/ui/sidebar").useSidebar();
    const { lang, setLang, t, languages } = useLocale();

    return (
        <Sidebar collapsible="icon" className="bg-gradient-to-b from-slate-50 to-white border-r border-slate-200">
            {/* Logo */}
            <div className="flex flex-col items-center py-2 bg-white border-b border-slate-100">
                {state === "collapsed" ? (
                    <Image src="/white-label/gd_small.png" alt="Collapsed Logo" width={32} height={32} />
                ) : (
                    <Image src="/white-label/gd.png" alt="Company Logo" width={110} height={110} />
                )}
            </div>

            {/* Menu */}
            <SidebarContent className="bg-slate-50 flex flex-1">
                <SidebarGroup className="w-full flex flex-1">
                    <SidebarGroupContent className="flex flex-1">
                        <SidebarMenu className="flex flex-1 flex-col justify-evenly w-full">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="w-full">
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="hover:bg-slate-100 flex items-center w-full h-12"
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3 w-full justify-start px-6"
                                        >
                                            <item.icon className="w-5 h-5 text-slate-400" />
                                            <span className="text-slate-700 text-base font-medium">
                                                {t(`sidebar.${item.title.toLowerCase()}`) || item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>



            {/* Footer */}
            <SidebarFooter className="bg-white flex flex-col items-center py-4">
                {state === "collapsed" ? (
                    <Image src="/icons/gd.svg" alt="GD Logo" width={32} height={32} />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors w-full justify-between">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="/icons/gd.svg" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <span className="text-slate-700 font-medium">{t("sidebar.account")}</span>
                                <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8} className="min-w-48 p-2">
                            <div className="px-2 py-1 text-xs text-slate-500 font-semibold">
                                {t("sidebar.language") || "Language"}
                            </div>
                            {languages.map((l) => (
                                <DropdownMenuItem
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${lang === l.code ? "bg-slate-100 font-semibold text-slate-700" : "text-slate-500"}`}
                                >
                                    <span className="flex-1">{l.label}</span>
                                    {lang === l.code && <Check className="w-4 h-4 text-green-500 ml-2" />}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                                onClick={() => router.push("/login")}
                                className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-slate-700 hover:bg-slate-100 mt-2"
                            >
                                <LogOut className="w-5 h-5 text-slate-400" />
                                <span className="flex-1">{t("sidebar.logout") || "Logout"}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
