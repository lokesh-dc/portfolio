"use client";

import { useState, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { motion } from "framer-motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useChat();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div className="flex-1 flex overflow-hidden relative">
      <motion.div
        animate={{ 
          paddingRight: isSidebarOpen && isDesktop ? "420px" : "0px" 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex-1 flex flex-col overflow-y-auto w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
