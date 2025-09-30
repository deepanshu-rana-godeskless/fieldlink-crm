import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
    const BottomRightSheetPopup = require("@/components/BottomRightSheetPopup").BottomRightSheetPopup;
    return (
        <LocaleProvider>
            <ThemeProvider>
                <SidebarProvider>
                    <div className="flex h-screen w-screen">
                        <AppSidebar />
                        <div className="flex flex-col flex-1 h-full min-w-0">
                            <Header className="w-full" />
                            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-b-2xl shadow-sm w-full">
                                {children}
                            </main>
                        </div>
                        <BottomRightSheetPopup />
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        </LocaleProvider>
    );
}
