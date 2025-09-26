// // app/layout.tsx
// import "./globals.css";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "sonner";
// import { ThemeProvider } from "@/components/theme-provider";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { LocaleProvider } from "@/context/locale-context";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "FieldLink CRM",
//   description: "FSM CRM Dashboard",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
//         <LocaleProvider>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//             <SidebarProvider>
//               {children}
//               <Toaster position="top-right" richColors />
//             </SidebarProvider>
//           </ThemeProvider>
//         </LocaleProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const ThemeProvider = require("@/components/ui/theme-provider").ThemeProvider;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}