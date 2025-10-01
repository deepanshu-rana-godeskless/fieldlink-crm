
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Home, Inbox, Calendar, Settings, HelpCircle, LogOut, User } from "lucide-react";
import Image from "next/image";

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
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-4">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </div>
                <div>
                    <SidebarLink
                        link={{
                            label: "GoDeskless",
                            href: "/account",
                            icon: (
                                <Image src="/icons/gd.svg" className="h-7 w-7 shrink-0 rounded-full" width={28} height={28} alt="GD Logo" />
                            ),
                        }}
                    />
                </div>
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
