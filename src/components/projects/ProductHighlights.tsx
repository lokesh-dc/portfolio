"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ProductHighlight {
	id: string;
	title: string;
	description: string;
	image: string;
	gif?: string;
	benefit: string;
	technicalNote: string;
}

interface ProductHighlightsProps {
	items: ProductHighlight[];
}

function HighlightCard({
	item,
	isActive,
}: {
	item: ProductHighlight;
	isActive: boolean;
}) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			data-highlight-card
			className={`snap-start rounded-2xl border p-6 md:p-8 transition-all duration-700 ease-out min-h-[50vh] md:min-h-0 ${
				isActive
					? "bg-white/80 dark:bg-stone-900/30 backdrop-blur-xl border-emerald-300 dark:border-emerald-500/30 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/5"
					: "bg-white/40 dark:bg-stone-900/10 backdrop-blur-sm border-stone-200 dark:border-stone-800/50 opacity-60"
			}`}>
			<div className="space-y-4">
				<h3 className="text-xl font-bold text-stone-900 dark:text-white">
					{item.title}
				</h3>
				<p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
					{item.description}
				</p>

				<div className="px-4 py-3 rounded-lg bg-stone-100 dark:bg-emerald-500/10 border border-stone-200 dark:border-emerald-500/20">
					<p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
						{item.benefit}
					</p>
				</div>

				<button
					onClick={() => setExpanded(!expanded)}
					className="flex items-center gap-2 text-xs font-medium text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
					<ChevronDown
						size={14}
						className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
					/>
					How it works
				</button>

				{expanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden">
						<p className="text-sm text-stone-500 dark:text-stone-500 font-light leading-relaxed border-t border-stone-200 dark:border-stone-800 pt-4">
							{item.technicalNote}
						</p>
					</motion.div>
				)}
			</div>
		</div>
	);
}

export function ProductHighlights({ items }: ProductHighlightsProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const activeItem = items[activeIndex];
	const scrollRef = useRef<HTMLDivElement>(null);
	const hasScrolled = useRef(false);
	const activeIndexRef = useRef(0);

	useEffect(() => {
		activeIndexRef.current = activeIndex;
	}, [activeIndex]);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const index = Array.from(
							container.querySelectorAll("[data-highlight-card]"),
						).indexOf(entry.target);
						if (index !== -1) setActiveIndex(index);
					}
				}
			},
			{
				root: container,
				rootMargin: "-10% 0px -60% 0px",
				threshold: 0,
			},
		);

		container.querySelectorAll("[data-highlight-card]").forEach((card) => {
			observer.observe(card);
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const onWheel = (e: WheelEvent) => {
			const rect = container.getBoundingClientRect();
			const visibleTop = Math.max(rect.top, 0);
			const visibleBottom = Math.min(rect.bottom, window.innerHeight);
			const visibleHeight = Math.max(0, visibleBottom - visibleTop);
			const visibleRatio = visibleHeight / rect.height;
			if (visibleRatio < 0.9) return;

			const idx = activeIndexRef.current;
			if (idx === 0 && e.deltaY < 0) return;
			if (idx === items.length - 1 && e.deltaY > 0) return;

			e.preventDefault();
			if (!hasScrolled.current) hasScrolled.current = true;
			console.log({ del: e.deltaY });
			container.scrollBy({ top: e.deltaY * 0.5, behavior: "smooth" });
		};

		window.addEventListener("wheel", onWheel, { passive: false });
		return () => window.removeEventListener("wheel", onWheel);
	}, [items.length]);

	return (
		<section className="w-full max-w-6xl mx-auto px-4">
			<SectionHeading
				label="Features"
				title="Product Highlights"
				subtitle="Every feature is built for the gym environment — one hand, between sets, low signal."
			/>

			<div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
				<div
					ref={scrollRef}
					className="flex-1 space-y-6 md:space-y-8 md:max-h-[45vh] md:overflow-y-auto md:pr-4 pt-4 pb-40 snap-y snap-mandatory hide-scrollbar">
					{items.map((item, i) => (
						<HighlightCard
							key={item.id}
							item={item}
							isActive={i === activeIndex}
						/>
					))}
				</div>

				<div className="hidden md:block md:w-[45%] lg:w-[40%]">
					<div className="sticky top-28">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeItem.id}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -40 }}
								transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
								className="relative aspect-[4/3] rounded-2xl overflow-hidden">
								<Image
									src={activeItem.image}
									alt={activeItem.title}
									fill
									className="object-cover"
									priority
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
