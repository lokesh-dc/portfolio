"use client";

import React from "react";
import { useChat } from "@/context/ChatContext";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Sparkles, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { aboutData, projectsData, workExperienceData } from "@/lib/data";
import { motion } from "framer-motion";

export default function Home() {
	const { openSidebar } = useChat();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	return (
		<motion.div 
			className="flex-1 w-full"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Section 1: Hero (First Fold) */}
			<section className="min-h-[calc(100vh-116px)] flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-10 py-12">
				<div className="max-w-4xl space-y-10">
					<motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 w-fit">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						<span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
							Based in Gurgaon • Available for projects
						</span>
					</motion.div>

					<motion.h2 variants={itemVariants} className="font-sans text-5xl md:text-8xl font-semibold leading-[1.05] tracking-tight">
						Hi, I&apos;m {aboutData.name.split(" ")[0]}.<br />
						<span className="text-stone-500 dark:text-stone-400 font-normal">
							{aboutData.title}
						</span>
					</motion.h2>

					<motion.p variants={itemVariants} className="text-lg md:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl font-light">
						{aboutData.bio}
					</motion.p>

					{/* Impact Metrics */}
					<motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
						<div className="space-y-1">
							<p className="text-4xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">40%</p>
							<p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Load Performance</p>
						</div>
						<div className="space-y-1">
							<p className="text-4xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">5x</p>
							<p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Organic Traffic</p>
						</div>
						<div className="space-y-1">
							<p className="text-4xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">3M+</p>
							<p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Quarterly Users</p>
						</div>
					</motion.div>

					<motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
						<div className="flex items-center gap-4">
							<a
								href="https://github.com/lokesh-dc"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
								aria-label="GitHub">
								<GithubIcon className="w-6 h-6" />
							</a>
							<a
								href="https://www.linkedin.com/in/choudhary-lokesh"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
								aria-label="LinkedIn">
								<LinkedinIcon className="w-6 h-6" />
							</a>
							<a
								href="mailto:lokesh.cdewanand@gmail.com"
								className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
								aria-label="Email">
								<Mail className="w-6 h-6" />
							</a>
							<a
								href="tel:9172659994"
								className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
								aria-label="Call">
								<Phone className="w-6 h-6" />
							</a>
						</div>
						<div className="h-8 w-[1px] bg-stone-200 dark:bg-stone-800 hidden sm:block"></div>
						<button 
							onClick={() => document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' })}
							className="group hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
						>
							Scroll for work
							<ArrowRight className="w-4 h-4 rotate-90 group-hover:translate-y-1 transition-transform" />
						</button>
					</motion.div>
				</div>
			</section>

			{/* Section 2: Selected Work (Second Fold) */}
			<section id="selected-work" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 border-t border-stone-100 dark:border-stone-900">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* Sidebar Experience info */}
					<div className="lg:col-span-4 space-y-16">
						<motion.section 
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="space-y-10"
						>
							<div>
								<h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 mb-8 flex items-center gap-2">
									<span className="w-8 h-[1px] bg-stone-300 dark:bg-stone-800"></span>
									Current Role
								</h3>
								<Link 
									href="/experience" 
									className="group block p-6 rounded-2xl bg-[#fafafa] dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/30 transition-all"
								>
									<p className="font-bold text-xl text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
										{workExperienceData[0].role}
									</p>
									<p className="text-stone-500 mt-1">
										{workExperienceData[0].company}
									</p>
									<p className="text-sm text-stone-600 dark:text-stone-400 mt-4 line-clamp-3 italic border-l-2 border-emerald-500/30 pl-4">
										{workExperienceData[0].description[0]}
									</p>
								</Link>
							</div>

							{/* AI CTA Card */}
							<div className="relative p-8 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl overflow-hidden group">
								<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
									<Sparkles className="w-16 h-16 text-emerald-400 dark:text-emerald-600" />
								</div>
								<h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-4">
									Interactive Agent
								</h3>
								<p className="text-lg font-medium mb-8 leading-relaxed">
									Have questions about my technical stack or leadership style? Ask my AI.
								</p>
								<button
									onClick={openSidebar}
									className="w-full py-4 px-6 rounded-xl bg-emerald-500 text-stone-900 text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
								>
									<Sparkles className="w-4 h-4" />
									Start Conversation
								</button>
							</div>
						</motion.section>
					</div>

					{/* Main Content: Projects */}
					<div className="lg:col-span-8">
						<motion.section 
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="space-y-12"
						>
							<h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 mb-8 flex items-center gap-2">
								<span className="w-8 h-[1px] bg-stone-300 dark:bg-stone-800"></span>
								Selected Work
							</h3>
							<div className="grid grid-cols-1 gap-8 md:gap-12">
								{projectsData.slice(0, 3).map((project, i) => (
									<Link
										key={project.slug || i}
										href={project.link || "#"}
										className="group block"
										data-cursor-text="View Project"
									>
										<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
											<div className="md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
												<Image
													src={project.detailImage}
													alt={project.title}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											</div>
											<div className="md:col-span-7 space-y-3">
												<div className="flex items-center gap-2">
													{project.technologies.slice(0, 3).map(tech => (
														<span key={tech} className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
															{tech}
														</span>
													))}
												</div>
												<h4 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors tracking-tight">
													{project.title}
												</h4>
												<p className="text-stone-600 dark:text-stone-400 line-clamp-2 text-lg font-light leading-relaxed">
													{project.description}
												</p>
												<div className="pt-2 flex items-center gap-2 text-sm font-bold text-emerald-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
													View Case Study <ArrowRight className="w-4 h-4" />
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
							
							<Link
								href="/projects"
								className="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-emerald-600 transition-colors group">
								View all projects
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</motion.section>
					</div>
				</div>
			</section>
		</motion.div>
	);
}
