"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Home, Inbox, Calendar, Settings, HelpCircle, LogOut, User } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const links = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Tickets", href: "/tickets", icon: <Inbox className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Visits", href: "/visits", icon: <Calendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Calendar", href: "/calendar", icon: <Calendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Admin", href: "/admin", icon: <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "FAQ", href: "/faq", icon: <HelpCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Account", href: "/account", icon: <User className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Logout", href: "/login", icon: <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
];

export function AppSidebar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("user");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setUser({
                        name: parsed.name || "",
                        email: parsed.email || "",
                        avatar: parsed.avatar || "/assets/Deepanshu.jpg"
                    });
                } catch {
                    setUser({ name: "", email: "", avatar: "/assets/Deepanshu.jpg" });
                }
            } else {
                setUser({ name: "", email: "", avatar: "/assets/Deepanshu.jpg" });
            }
        }
    }, []);
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-16 flex flex-col gap-4">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </div>
                {/* Sidebar Footer Dropdown: only render after user is loaded */}
                {user && (
                    <div className="w-full pb-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 rounded-lg py-2 hover:bg-muted cursor-pointer">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name ? user.name[0] : ""}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-medium text-sm truncate">{user.name}</span>
                                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto text-muted-foreground"><path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64">
                                <DropdownMenuLabel className="flex items-center gap-3 py-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name ? user.name[0] : ""}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-medium text-sm truncate">{user.name}</span>
                                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
                                <DropdownMenuItem>Account</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Notifications</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </SidebarBody>
        </Sidebar>
    );
}

export const Logo = () => {
    return (
        <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
            <Image src="/icons/gd.svg" alt="GD Logo" width={24} height={24} className="shrink-0" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-pre text-black dark:text-white">
                GoDeskless
            </motion.span>
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
            <Image src="/icons/gd.svg" alt="GD Logo" width={24} height={24} className="shrink-0" />
        </a>
    );
};
