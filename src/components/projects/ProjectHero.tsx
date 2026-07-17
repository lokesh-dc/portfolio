"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";

interface ProjectHeroProps {
	title: string;
	tagline: string;
	image: string;
	alt: string;
	liveUrl?: string;
	githubUrl?: string;
}

const stagger = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
	},
};

export function ProjectHero({
	title,
	tagline,
	image,
	alt,
	liveUrl,
	githubUrl,
}: ProjectHeroProps) {
	return (
		<section className="relative min-h-[80vh] flex items-center px-4 py-10">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-100/50 dark:via-stone-950/50 to-white dark:to-stone-950 z-10" />
			</div>

			<motion.div
				variants={stagger}
				initial="hidden"
				animate="show"
				className="m-auto relative z-20 flex flex-col gap-4 items-center justify-center">
				<div className="flex flex-col gap-2 items-center">
					<motion.div
						variants={fadeUp}
						dangerouslySetInnerHTML={{ __html: title }}
						className="text-center text-3xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-white font-mono"></motion.div>
					<motion.p
						variants={fadeUp}
						className="w-full md:w-2/3 text-center text-sm md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
						{tagline}
					</motion.p>
					<motion.div
						variants={fadeUp}
						className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
						{liveUrl && (
							<a
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-colors">
								<ExternalLink size={18} />
								Live Demo
							</a>
						)}
						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
								<Github className="w-[18px] h-[18px]" />
								Source Code
							</a>
						)}
					</motion.div>
				</div>
				<motion.div
					variants={fadeUp}
					className="relative h-[300px] md:h-[650px] w-full">
					<div className="absolute inset-0 bg-linear-to-b from-emerald-500/10 dark:from-emerald-500/20 to-transparent rounded-[3rem] blur-3xl" />
					<div className="relative w-full h-full overflow-hidden">
						<Image
							src={image}
							alt={alt}
							fill
							className="object-contain"
							priority
						/>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.6 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
				<div className="w-5 h-8 rounded-full border border-stone-400 dark:border-stone-700 flex items-start justify-center p-1.5">
					<div className="w-1 h-2 rounded-full bg-stone-400 dark:bg-stone-500 animate-bounce" />
				</div>
			</motion.div>
		</section>
	);
}
