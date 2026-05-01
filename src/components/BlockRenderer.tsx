import Image from "next/image";

export type Block =
	| { type: "paragraph"; text: string }
	| { type: "heading"; text: string }
	| { type: "image"; url: string; alt: string }
	| { type: "metrics"; stats: { label: string; value: string }[] }
	| { type: "techHighlights"; items: { title: string; sub: string }[] };

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return (
		<div className="space-y-12">
			{blocks.map((block, i) => {
				switch (block.type) {
					case "paragraph":
						return (
							<p
								key={i}
								className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
								{block.text}
							</p>
						);

					case "heading":
						return (
							<h3
								key={i}
								className="text-2xl font-sans font-semibold text-stone-900 dark:text-stone-100 tracking-tight pt-4">
								{block.text}
							</h3>
						);

					case "image":
						return (
							<div key={i} className="relative w-md-full overflow-hidden">
								<Image
									src={block.url}
									alt={block.alt}
									height={400}
									width={1000}
								/>
							</div>
						);

					case "metrics":
						return (
							<div
								key={i}
								className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
								{block.stats.map((stat, idx) => (
									<div key={idx}>
										<p className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">
											{stat.label}
										</p>
										<p className="text-3xl font-sans font-medium text-stone-900 dark:text-stone-100">
											{stat.value}
										</p>
									</div>
								))}
							</div>
						);

					case "techHighlights":
						return (
							<div
								key={i}
								className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-stone-200 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
								{block.items.map((item, idx) => (
									<div
										key={idx}
										className="bg-white dark:bg-stone-900 p-5 flex gap-4 items-start hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
										<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
										<div>
											<h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
												{item.title}
											</h4>
											<p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
												{item.sub}
											</p>
										</div>
									</div>
								))}
							</div>
						);

					default:
						return null;
				}
			})}
		</div>
	);
}
