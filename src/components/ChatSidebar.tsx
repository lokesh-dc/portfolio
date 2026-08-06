"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MessageBubble, { Message } from "./MessageBubble";
import ChatInput from "./ChatInput";

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
			content:
				"Hello! I'm an AI assistant for Lokesh's portfolio. Ask me anything about his experience, projects, or skills.",
		},
	]);
	const [isStreaming, setIsStreaming] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, isStreaming, isOpen]);

	const sendMessage = useCallback(
		async (text: string) => {
			const trimmed = text.trim();
			if (!trimmed || isStreaming) return;

			const userMsg: Message = { id: generateId(), type: "user", content: trimmed };
			const assistantId = generateId();
			const assistantMsg: Message = {
				id: assistantId,
				type: "assistant",
				content: "",
			};

			const history = [...messages, userMsg]
				.filter((m) => m.id !== "initial")
				.map((m) => ({ role: m.type, content: m.content }));

			setMessages((prev) => [...prev, userMsg, assistantMsg]);
			setIsStreaming(true);

			try {
				const res = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ messages: history }),
				});

				if (!res.ok || !res.body) {
					const errorData = await res.json().catch(() => null);
					const detail = errorData?.error || `Request failed with status ${res.status}.`;
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId
								? { ...m, content: `I couldn't reach my brain. ${detail}` }
								: m
						)
					);
					return;
				}

				const reader = res.body.getReader();
				const decoder = new TextDecoder();
				let acc = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					acc += decoder.decode(value, { stream: true });
					setMessages((prev) =>
						prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
					);
				}
			} catch {
				setMessages((prev) =>
					prev.map((m) =>
						m.id === assistantId
							? { ...m, content: "Something went wrong while streaming the response. Please try again." }
							: m
					)
				);
			} finally {
				setIsStreaming(false);
			}
		},
		[messages, isStreaming]
	);

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
							{isStreaming && (
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
								onSend={sendMessage}
								disabled={isStreaming}
							/>
						</div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
}
