"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer circle
  const circleX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const circleY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, .cursor-pointer") as HTMLElement;
      
      if (interactiveEl) {
        setIsHovering(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* The Dot (Inner) - Hidden when we have cursor text */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-emerald-500 rounded-full"
        animate={{
          opacity: cursorText ? 0 : 1
        }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* The Circle (Outer) - Expands for text */}
      <motion.div
        className="fixed flex items-center justify-center border border-emerald-500/30 rounded-full overflow-hidden whitespace-nowrap backdrop-blur-lg"
        animate={{
          width: cursorText ? "auto" : (isHovering ? 48 : 32),
          height: cursorText ? 32 : (isHovering ? 48 : 32),
          padding: cursorText ? "0 16px" : "0",
          backgroundColor: isHovering 
            ? (cursorText ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)") 
            : "rgba(16, 185, 129, 0)",
          borderColor: isHovering 
            ? (cursorText ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.6)") 
            : "rgba(16, 185, 129, 0.2)",
          borderRadius: cursorText ? "100px" : "50%",
        }}
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 drop-shadow-sm"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
