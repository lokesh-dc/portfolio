"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/projects/SectionHeader";

interface GalleryItem {
  url: string;
  alt: string;
  type: "screenshot" | "mockup" | "animation";
  device?: "phone" | "desktop" | "tablet";
}

interface ProjectGalleryProps {
  num: string;
  label: string;
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  exclude?: string[];
}

export default function ProjectGallery({
  num,
  label,
  title,
  subtitle,
  items,
  exclude = [],
}: ProjectGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const seen = new Set(exclude);
  const gallery = items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(
    () =>
      setSelected((cur) =>
        cur === null ? null : (cur - 1 + gallery.length) % gallery.length
      ),
    [gallery.length]
  );
  const next = useCallback(
    () => setSelected((cur) => (cur === null ? null : (cur + 1) % gallery.length)),
    [gallery.length]
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, prev, next]);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-28">
      <SectionHeader num={num} label={label} title={title} />
      {subtitle && (
        <p className="mb-8 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
          {subtitle}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {gallery.map((item, i) => (
          <motion.button
            type="button"
            key={`${item.url}-${i}`}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            aria-label={`Open ${item.alt}`}
            className={`group relative block w-full overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              item.device === "desktop" ? "md:col-span-2" : ""
            }`}
          >
            <div
              className={`relative w-full ${
                item.device === "desktop"
                  ? "aspect-[16/9]"
                  : "mx-auto max-w-[380px] aspect-[4/5]"
              }`}
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-stone-950/0 transition-colors duration-500 group-hover:bg-stone-950/20" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-4 md:p-5">
              <p className="text-xs md:text-sm text-white/90 font-light drop-shadow">
                {item.alt}
              </p>
              <span className="shrink-0 rounded-full bg-white/10 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Expand
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full bg-white/10 p-2.5 text-white/90 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/90 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            className="relative h-full max-h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[selected].url}
              alt={gallery[selected].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/90 hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
            <span className="font-sans tabular-nums">
              {selected + 1} / {gallery.length}
            </span>
            <span className="font-light">{gallery[selected].alt}</span>
          </div>
        </div>
      )}
    </section>
  );
}
