import Image from "next/image";

export type Block = 
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "metrics"; stats: { label: string; value: string }[] };

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-12">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {block.text}
              </p>
            );
          
          case "heading":
            return (
              <h3 key={i} className="text-2xl font-sans font-semibold text-stone-900 dark:text-stone-100 tracking-tight pt-4">
                {block.text}
              </h3>
            );
          
          case "image":
            return (
              <div key={i} className="relative w-full h-[400px] md:h-[600px] bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <Image
                  src={block.url}
                  alt={block.alt}
                  fill
                  className="object-cover"
                />
              </div>
            );
          
          case "metrics":
            return (
              <div key={i} className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
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

          default:
            return null;
        }
      })}
    </div>
  );
}
