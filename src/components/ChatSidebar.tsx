"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MessageBubble, { Message } from "./MessageBubble";
import ChatInput from "./ChatInput";
import {
	AboutResponse,
	ExperienceResponse,
	ProjectsResponse,
} from "./Responses";

const generateId = () => Math.random().toString(36).substring(2, 9);

interface ChatSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "initial",
			type: "assistant",
			content: (
				<div className="space-y-4">
					<p className="text-stone-800 dark:text-stone-200">
						Hello! I'm an interactive summary of Lokesh.
					</p>
					<p className="text-stone-600 dark:text-stone-400">
						How can I help you learn more today? Feel free to use the prompts
						below.
					</p>
				</div>
			),
		},
	]);
	const [isTyping, setIsTyping] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, isTyping, isOpen]);

	const handleOptionSelect = (option: "experience" | "projects" | "about") => {
		if (isTyping) return;

		let userText = "";
		let AssistantComponent: React.ReactNode = null;

		if (option === "experience") {
			userText = "Tell me about your work experience.";
			AssistantComponent = <ExperienceResponse />;
		} else if (option === "projects") {
			userText = "Show me some of your projects.";
			AssistantComponent = <ProjectsResponse />;
		} else if (option === "about") {
			userText = "Tell me more about you.";
			AssistantComponent = <AboutResponse />;
		}

		const userMsg: Message = {
			id: generateId(),
			type: "user",
			content: (
				<p className="text-stone-800 dark:text-stone-200 font-medium">
					{userText}
				</p>
			),
		};

		setMessages((prev) => [...prev, userMsg]);
		setIsTyping(true);

		setTimeout(
			() => {
				const assistantMsg: Message = {
					id: generateId(),
					type: "assistant",
					content: AssistantComponent,
				};
				setMessages((prev) => [...prev, assistantMsg]);
				setIsTyping(false);
			},
			600 + Math.random() * 400,
		);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Sidebar */}
					<motion.aside
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed top-0 right-0 z-50 h-full w-full lg:max-w-[420px] bg-[#fafafa] dark:bg-[#0c0c0c] border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col">
						{/* Header */}
						<header className="flex-none flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-800/50 bg-[#fafafa]/80 dark:bg-[#0c0c0c]/80 backdrop-blur-md">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								<h2 className="text-sm font-semibold tracking-wide text-stone-800 dark:text-stone-200">
									Lokesh AI Assistant
								</h2>
							</div>
							<button
								onClick={onClose}
								className="p-1.5 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 dark:hover:text-stone-200 dark:hover:bg-stone-800 transition-colors"
								aria-label="Close Sidebar">
								<X size={18} />
							</button>
						</header>

						{/* Chat Area */}
						<div className="flex-1 overflow-y-auto scroll-smooth pb-4">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className="border-b border-stone-100 dark:border-stone-800/30 last:border-b-0">
									<MessageBubble message={msg} />
								</div>
							))}
							{isTyping && (
								<div className="flex items-center gap-1.5 px-6 py-6 md:pl-16">
									<div
										className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 animate-bounce"
										style={{ animationDelay: "0ms" }}
									/>
									<div
										className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 animate-bounce"
										style={{ animationDelay: "150ms" }}
									/>
									<div
										className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 animate-bounce"
										style={{ animationDelay: "300ms" }}
									/>
								</div>
							)}
							<div ref={bottomRef} className="h-4" />
						</div>

						{/* Input Area */}
						<div className="flex-none bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent dark:from-[#0c0c0c] dark:via-[#0c0c0c] pt-6 relative z-10">
							<ChatInput
								onOptionSelect={handleOptionSelect}
								disabled={isTyping}
							/>
						</div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
}
