"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);
	const [ripples, setRipples] = React.useState<
		{ x: number; y: number; id: number }[]
	>([]);

	// Avoid hydration mismatch by only rendering after mount
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="w-14 h-8 rounded-full border border-stone-200 dark:border-stone-800 bg-[#fafafa] dark:bg-[#111]" />
		);
	}

	const isDark = resolvedTheme === "dark";

	const handleThemeToggle = (e: React.MouseEvent) => {
		const x = e.clientX;
		const y = e.clientY;
		const id = Date.now();

		// Add multiple ripple layers
		setRipples((prev) => [...prev, { x, y, id }]);
		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== id));
		}, 1000);

		const toggleTheme = () => setTheme(isDark ? "light" : "dark");

		// @ts-ignore - View Transitions API
		if (!document.startViewTransition) {
			toggleTheme();
			return;
		}

		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		// @ts-ignore
		const transition = document.startViewTransition(() => {
			toggleTheme();
		});

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];
			document.documentElement.animate(
				{
					clipPath: clipPath,
				},
				{
					duration: 650,
					easing: "cubic-bezier(0.16, 1, 0.3, 1)",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		});
	};

	return (
		<>
			<button
				onClick={handleThemeToggle}
				className="relative z-50 w-14 h-8 flex items-center rounded-full border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-1 hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-inner cursor-pointer overflow-hidden"
				aria-label="Toggle theme">
				<motion.div
					animate={{
						x: isDark ? 24 : 0,
						rotate: isDark ? 360 : 0,
					}}
					transition={{
						type: "spring",
						stiffness: 500,
						damping: 30,
						rotate: { duration: 0.5 },
					}}
					className="z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-stone-800 shadow-md">
					{isDark ? (
						<Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
					) : (
						<Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
					)}
				</motion.div>

				{/* Background Icons */}
				<div className="absolute inset-0 flex items-center justify-between px-2 text-stone-400 dark:text-stone-600 pointer-events-none">
					<Sun className="w-3.5 h-3.5" />
					<Moon className="w-3.5 h-3.5" />
				</div>
			</button>

			{/* Multi-layered Ripple Overlay */}
			<AnimatePresence>
				{ripples.map((ripple) => (
					<React.Fragment key={ripple.id}>
						{/* Layer 1: Faster, fainter */}
						<motion.div
							initial={{
								position: "fixed",
								left: ripple.x,
								top: ripple.y,
								width: 0,
								height: 0,
								borderRadius: "50%",
								x: "-50%",
								y: "-50%",
								opacity: 0.4,
								zIndex: 9999,
								pointerEvents: "none",
							}}
							animate={{ width: "200vmax", height: "200vmax", opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							className="bg-stone-200 dark:bg-stone-800"
						/>
						{/* Layer 2: Slightly delayed, different opacity */}
						<motion.div
							initial={{
								position: "fixed",
								left: ripple.x,
								top: ripple.y,
								width: 0,
								height: 0,
								borderRadius: "50%",
								x: "-50%",
								y: "-50%",
								opacity: 0.2,
								zIndex: 9998,
								pointerEvents: "none",
							}}
							animate={{ width: "200vmax", height: "200vmax", opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
							className="bg-stone-400 dark:bg-stone-600"
						/>
					</React.Fragment>
				))}
			</AnimatePresence>
		</>
	);
}
