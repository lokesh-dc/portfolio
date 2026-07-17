import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${lato.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-stone-100">
        <ScrollToTop />
        <div className="mesh-gradient" aria-hidden="true" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <CustomCursor />
            <Header />
            <LayoutWrapper>
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
