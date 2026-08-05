import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Website Migration",
    items: ["Next.js Rebuild", "SEO & Core Web Vitals", "CMS-Driven Pages"],
  },
  {
    title: "Frontend Development",
    items: ["UI Development", "Responsive Layouts", "Web Performance"],
  },
  {
    title: "AI & Conversions",
    items: ["Conversational AI", "LLM Tooling", "A/B Testing"],
  },
  {
    title: "Product Consulting",
    items: ["Architecture Direction", "Web Strategy", "Technical Guidance"],
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 md:px-10 py-16 md:py-24 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-baseline justify-between gap-6 mb-10 md:mb-14">
        <h2 className="font-sans text-3xl tracking-[-0.02em] text-stone-900 dark:text-white">
          Services
        </h2>
        <Link
          href="/experience"
          className="group flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          See all experience
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, i) => (
          <Link
            key={service.title}
            href="/experience"
            className="group relative overflow-hidden rounded-2xl bg-stone-50 dark:bg-white/[0.04] p-8 md:p-10 border border-transparent hover:border-stone-200 dark:hover:border-white/10 transition-colors"
            data-cursor-text="View experience"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm tracking-[0.2em] text-stone-400 dark:text-stone-500">
                0{i + 1}
              </span>
              <ArrowUpRight className="h-5 w-5 text-stone-900 dark:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h3 className="mt-8 font-sans text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
              {service.title}
            </h3>
            <ul className="mt-5 space-y-2">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="text-[15px] font-normal tracking-[-0.01em] text-stone-600 dark:text-stone-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
