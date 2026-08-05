"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Sparkles,
  Boxes,
  Gauge,
  TrendingUp,
  LayoutGrid,
  CreditCard,
  Bot,
  Mail,
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { GithubIcon, LinkedinIcon, CallIcon } from "@/components/SocialIcons";
import { workExperienceData } from "@/lib/data";

const capabilities = [
  {
    icon: Boxes,
    title: "Next.js & React",
    body: "Server Components, App Router, and modular architecture.",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals",
    body: "PageSpeed from 50 to 90+ through LCP and INP work.",
  },
  {
    icon: TrendingUp,
    title: "SEO at scale",
    body: "Structured data and technical SEO that grew traffic 5x.",
  },
  {
    icon: LayoutGrid,
    title: "CMS architecture",
    body: "35+ campaign variants shipped 60% faster.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    body: "Razorpay checkout that lifted conversions 20%.",
  },
  {
    icon: Bot,
    title: "AI chatbots",
    body: "Conversational flows that book appointments on their own.",
  },
];

const stats = [
  { value: "40%", label: "Load time cut" },
  { value: "5x", label: "Organic traffic" },
  { value: "3M+", label: "Quarterly users" },
  { value: "90+", label: "PageSpeed score" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function DarkSection() {
  const { openSidebar } = useChat();
  const reduce = useReducedMotion();
  const job = workExperienceData[0];

  return (
    <section className="bg-stone-900 dark:bg-stone-800/40 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-[2.5rem] md:text-[3.2rem] font-extrabold tracking-[-0.03em] text-white">
            What I work with
          </h2>
          <p className="mt-4 text-[15px] md:text-base font-medium leading-relaxed text-gray-400">
            The tools and systems behind the numbers.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
              className="group rounded-[24px] bg-white/[0.04] border border-white/[0.08] p-7 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] border border-white/10 transition-colors group-hover:bg-white/10">
                <cap.icon className="h-5 w-5 text-emerald-400" aria-hidden />
              </span>
              <h3 className="mt-5 text-[1.15rem] font-bold text-white">
                {cap.title}
              </h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-gray-400">
                {cap.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mt-20 md:mt-24 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-[2rem] md:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-tight text-white">
            Questions about how I build?
          </h2>
          <p className="mt-4 text-[15px] md:text-base font-medium leading-relaxed text-gray-400">
            Stack, architecture decisions, project deep dives. It answers from
            my actual experience.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openSidebar}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-stone-950 transition-all hover:bg-emerald-400 hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Ask my AI
            </button>
            <a
              href="mailto:lokesh.cdewanand@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/[0.16] hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
          <p className="mt-8 text-sm font-medium text-gray-500">
            Currently{" "}
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-emerald-400 transition-colors"
            >
              {job.role.toLowerCase()} at {job.company}
            </a>
          </p>
        </motion.div>
      </div>

      <footer className="mt-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <p className="text-xl font-bold tracking-tight text-white">LC.</p>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-gray-400">
              Senior Software Engineer building high-performance web
              applications.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/lokesh-dc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-white/10 text-gray-400 transition-colors hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/choudhary-lokesh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full border border-white/10 text-gray-400 transition-colors hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:lokesh.cdewanand@gmail.com"
                aria-label="Email"
                className="p-2.5 rounded-full border border-white/10 text-gray-400 transition-colors hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
              <a
                href="tel:9172659994"
                aria-label="Call"
                className="p-2.5 rounded-full border border-white/10 text-gray-400 transition-colors hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <CallIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Site
            </p>
            <div className="space-y-2.5 text-sm font-medium">
              <Link href="/projects" className="block text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/experience" className="block text-gray-400 hover:text-white transition-colors">
                Experience
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Contact
            </p>
            <div className="space-y-2.5 text-sm font-medium">
              <a
                href="mailto:lokesh.cdewanand@gmail.com"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                lokesh.cdewanand@gmail.com
              </a>
              <a
                href="tel:9172659994"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                +91 91726 59994
              </a>
              <p className="block text-gray-500">Gurgaon, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12px] font-medium text-gray-500">
              © 2026 Lokesh Choudhary
            </p>
            <p className="text-[12px] font-medium text-gray-500">
              Built with Next.js
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
