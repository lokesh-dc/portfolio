import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lokesh Choudhary | Portfolio",
  description: "Minimalist portfolio with an AI assistant",
};

import { ChatProvider } from "@/context/ChatContext";
import GlobalSidebar from "@/components/GlobalSidebar";
import Header from "@/components/Header";

import { ThemeProvider } from "@/components/ThemeProvider";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-stone-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <CustomCursor />
            <LayoutWrapper>
              <Header />
              <main className="flex-1 flex flex-col pb-24 md:pb-0">
                {children}
              </main>
            </LayoutWrapper>
            <MobileNav />
            <GlobalSidebar />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
