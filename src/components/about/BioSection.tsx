"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { aboutData } from "@/lib/data";

export default function BioSection() {
  const reduce = useReducedMotion();
  const first = aboutData.name.split(" ")[0];

  return (
    <section className="flex w-full items-end min-h-[calc(100dvh-7rem)]">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10 pb-4 md:pb-10 flex flex-col md:flex-row gap-12 md:gap-12 md:items-end">
        <div className="w-full md:max-w-[300px] shrink-0 flex flex-col gap-20 md:gap-[260px]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[64px] md:text-[76px] font-semibold leading-none tracking-[-0.02em] text-stone-900 dark:text-white"
          >
            Hey!
          </motion.h1>

          <p className="font-sans text-[20px] md:text-[22px] font-semibold leading-[1.4] tracking-[-0.02em] text-stone-900 dark:text-white">
            I&apos;m {first}, a {aboutData.title.toLowerCase()} based in
            Gurgaon. Formerly a Frontend dev, and now building to the moon.
          </p>
        </div>

        <div className="w-full md:w-[200px] lg:w-[220px] shrink-0 md:self-end">
          <Image
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&h=1100&fit=crop"
            alt="Laptop at a desk mid-work"
            width={900}
            height={1100}
            className="w-full aspect-[4/5] object-cover rounded-2xl grayscale hover:grayscale-0 transition duration-500"
          />
        </div>

        <div className="w-full md:max-w-[360px] flex flex-col gap-5">
          {aboutData.longBio.map((paragraph, i) => (
            <p
              key={i}
              className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.5] tracking-[-0.02em] text-stone-600 dark:text-stone-400"
            >
              {paragraph}
            </p>
          ))}

          <a
            href="mailto:lokesh.cdewanand@gmail.com"
            className="group mt-4 flex w-max items-center gap-3"
            data-cursor-text="Get in touch"
          >
            <span className="font-sans text-[18px] font-normal tracking-[-0.02em] text-stone-900 dark:text-white">
              Get in touch
            </span>
            <span className="relative block h-7 w-7 overflow-hidden rounded-lg border border-stone-900 dark:border-white">
              <span
                aria-hidden
                className="absolute bottom-[-4px] left-[-4px] h-[1px] w-[1px] rounded-full bg-stone-900 dark:bg-white transition-all duration-300 group-hover:h-[35px] group-hover:w-[35px]"
              />
              <ArrowUpRight
                aria-hidden
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-stone-900 dark:text-white transition-all duration-300 group-hover:opacity-0"
              />
              <ArrowUpRight
                aria-hidden
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-50 text-stone-50 dark:text-stone-950 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
