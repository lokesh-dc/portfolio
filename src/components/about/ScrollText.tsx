"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const TEXT =
  "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

const WORDS = TEXT.split(" ");

function Letter({
  progress,
  index,
  total,
  reduce,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
  reduce: boolean;
  children: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start, end],
    reduce ? [1, 1] : [0.12, 1]
  );
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export default function ScrollText() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  let letterIndex = 0;
  const totalLetters = TEXT.replace(/ /g, "").length;

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto w-full max-w-295 px-6 md:px-10">
          <p className="font-sans text-[24px] md:text-[30px] lg:text-[40px] font-bold leading-[1.12] tracking-[-0.02em] text-stone-900 dark:text-white">
            {WORDS.map((word, wi) => (
              <span key={wi} className="inline-block">
                {word.split("").map((char, ci) => {
                  const i = letterIndex++;
                  return (
                    <Letter
                      key={ci}
                      progress={scrollYProgress}
                      index={i}
                      total={totalLetters}
                      reduce={!!reduce}
                    >
                      {char}
                    </Letter>
                  );
                })}
                {wi < WORDS.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
