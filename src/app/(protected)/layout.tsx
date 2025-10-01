import { Dock, DockIcon } from "@/components/ui/dock";
import { Home, Inbox, Calendar, Settings, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FieldLink CRM",
    description: "FSM CRM Dashboard",
};

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const ThemeProvider = require("@/components/ui/theme-provider").ThemeProvider;
    const LocaleProvider = require("@/context/locale-context").LocaleProvider;


    const dockNav = [
        { href: "/dashboard", icon: Home, label: "Dashboard" },
        { href: "/tickets", icon: Inbox, label: "Tickets" },
        { href: "/visits", icon: Calendar, label: "Visits" },
        { href: "/calendar", icon: Calendar, label: "Calendar" },
        { href: "/admin", icon: Settings, label: "Admin" },
        { href: "/faq", icon: HelpCircle, label: "FAQ" },
    ];

    function MagicDock() {
        return (
            <TooltipProvider>
                <Dock
                    direction="middle"
                    iconMagnification={60}
                    iconDistance={120}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2"
                >
                    {/* Navigation icons with tooltips */}
                    {dockNav.map((item) => (
                        <DockIcon key={item.label}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        aria-label={item.label}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <item.icon className="size-5" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="top" align="center">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                    {/* Separator between nav and actions */}
                    <Separator orientation="vertical" className="h-12 mx-2" />
                    {/* Theme toggle with tooltip */}
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>
                                    <ModeToggle />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                                <p>Theme</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        );
    }

    return (
        <LocaleProvider>
            <ThemeProvider>
                <MagicDock />
                <div className="flex h-screen w-screen">
                    <div className="flex flex-col flex-1 h-full">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-8 bg-background rounded-b-2xl shadow-sm">
                            {children}
                        </main>
                    </div>
                </div>
            </ThemeProvider>
        </LocaleProvider>
    );
}
