"use client";

import React, { useState } from "react";
import { useChat } from "@/context/ChatContext";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, CallIcon } from "@/components/SocialIcons";
import { aboutData, projectsData, workExperienceData, Project } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
	const { openSidebar } = useChat();
	const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	return (
		<div 
			className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24"
			onMouseMove={handleMouseMove}
		>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
				{/* Left Column: Hero */}
				<div className="lg:col-span-7 space-y-8">
					<h2 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight">
						Hi, I'm {aboutData.name.split(" ")[0]}.<br />
						<span className="text-stone-600 dark:text-stone-400 font-normal">
							{aboutData.title}
						</span>
					</h2>

					<p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl font-light">
						{aboutData.bio}
					</p>

					<div className="flex items-center gap-4 pt-4">
						<a
							href="https://github.com/lokesh-dc"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
							aria-label="GitHub">
							<GithubIcon className="w-5 h-5" />
						</a>
						<a
							href="https://www.linkedin.com/in/choudhary-lokesh"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
							aria-label="LinkedIn">
							<LinkedinIcon className="w-5 h-5" />
						</a>
						<a
							href="mailto:lokesh.cdewanand@gmail.com"
							className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
							aria-label="Email">
							<Mail className="w-5 h-5" />
						</a>
						<a
							href="tel:9172659994"
							className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
							aria-label="Call">
							<CallIcon className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Right Column: Mini Resume */}
				<div className="lg:col-span-5 space-y-16">
					{/* Experience preview */}
					<section>
						<h3 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-6">
							Current Role
						</h3>
						<div className="space-y-4">
							<div className="flex items-baseline justify-between group cursor-pointer">
								<div>
									<p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
										{workExperienceData[0].role}
									</p>
									<p className="text-sm text-stone-500">
										{workExperienceData[0].company}
									</p>
								</div>
								<span className="text-sm text-stone-500 dark:text-stone-400 tabular-nums">
									{workExperienceData[0].duration.split(" - ")[0]} — Present
								</span>
							</div>
						</div>
						<div className="mt-6">
							<Link
								href="/experience"
								className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 transition-colors group">
								View full journey
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</section>

					{/* Selected Projects */}
					<section className="relative">
						<h3 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-6">
							Selected Work
						</h3>
						<div className="space-y-6">
							{projectsData.slice(0, 3).map((project, i) => (
								<Link
									key={project.slug || i}
									href={project.link || "#"}
									className="group block"
									onMouseEnter={() => setHoveredProject(project)}
									onMouseLeave={() => setHoveredProject(null)}
								>
									<p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
										{project.title}
									</p>
									<p className="text-sm text-stone-500 mt-1 line-clamp-2">
										{project.description}
									</p>
								</Link>
							))}
						</div>
						<button
							onClick={openSidebar}
							className="mt-6 flex items-center gap-1 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 transition-colors group">
							Ask AI for more details
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</button>
					</section>
				</div>
			</div>

			{/* Floating Hover Preview */}
			<AnimatePresence>
				{hoveredProject && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
						animate={{ 
							opacity: 1, 
							scale: 1, 
							rotate: 0,
							x: mousePos.x - 144, // Center horizontally (half of w-72 which is 288px)
							y: mousePos.y - 240  // Position fully above the cursor (height is 192px + offset)
						}}
						exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
						transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
						className="fixed top-0 left-0 pointer-events-none z-[100] w-72 h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800"
					>
						<Image
							src={hoveredProject.detailImage}
							alt={hoveredProject.title}
							fill
							className="object-cover"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
