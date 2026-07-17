"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface GalleryItem {
  url: string;
  alt: string;
  type: "screenshot" | "mockup" | "animation";
  device?: "phone" | "desktop" | "tablet";
}

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 overflow-hidden">
      <SectionHeading
        label="Visual Tour"
        title="Gallery"
        subtitle="Screenshots and mockups from across the app."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`relative rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200 dark:border-stone-800/50 group ${item.device === "phone" ? " mx-auto md:mx-0" : ""
              } ${item.device === "desktop" ? "md:col-span-2" : ""}`}
          >
            <div className={`relative ${item.device === "phone" ? "aspect-[19/19]" : "aspect-[16/10]"}`}>
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-transparent transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/80 dark:from-stone-950/80 to-transparent">
              <p className="text-xs text-stone-700 dark:text-stone-300 font-light">
                {item.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
