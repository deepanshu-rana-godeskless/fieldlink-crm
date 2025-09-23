
"use client";
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
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocale } from "@/context/locale-context";
import { Settings, HelpCircle, LogOut, Home, Inbox, Calendar, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Tickets", url: "/tickets", icon: Inbox },
    { title: "Visits", url: "/visits", icon: Calendar },
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Admin", url: "/admin", icon: Settings },
    { title: "FAQ", url: "/faq", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state } = require("@/components/ui/sidebar").useSidebar();
    const { lang, setLang, t, languages } = useLocale();
    const [open, setOpen] = React.useState(false);
    return (
        <Sidebar collapsible="icon" className="bg-gradient-to-b from-slate-50 to-white border-r border-slate-200">
            <div className="flex flex-col items-center py-2 bg-white border-b border-slate-100">
                {state === "collapsed" ? (
                    <Image
                        src="/white-label/gd_small.png"
                        alt="Collapsed Logo"
                        width={42}
                        height={42}
                    />
                ) : (
                    <Image
                        src="/white-label/gd.png"
                        alt="Company Logo"
                        width={180}
                        height={180}
                    />
                )}
            </div>
            <SidebarContent className="bg-slate-50">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-slate-500">{t("sidebar.navigation") || "Navigation"}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="hover:bg-slate-100"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="w-5 h-5 mr-2 text-slate-400" />
                                            <span className="text-slate-700">{t(`sidebar.${item.title.toLowerCase()}`)}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-white border-t border-slate-100">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/settings">
                                <Settings className="w-5 h-5 mr-2 text-slate-400" />
                                <span className="text-slate-700">{t("sidebar.settings")}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex items-center gap-2 cursor-pointer select-none">
                                    {t("sidebar.language")}
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={4} className="min-w-36">
                                {languages.map(l => (
                                    <DropdownMenuItem
                                        key={l.code}
                                        onClick={() => setLang(l.code)}
                                        className={`flex items-center gap-2 ${lang === l.code ? 'font-semibold text-slate-700' : 'text-slate-500'}`}
                                    >
                                        <span className="flex-1">{l.label}</span>
                                        {lang === l.code && <Check className="w-4 h-4 text-green-500 ml-2" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/logout">
                                <LogOut className="w-5 h-5 mr-2 text-slate-400" />
                                <span className="text-slate-700">{t("sidebar.logout")}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}