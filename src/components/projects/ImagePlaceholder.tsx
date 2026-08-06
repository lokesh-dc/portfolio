import { ImagePlus } from "lucide-react";

export default function ImagePlaceholder({
  ratio = "aspect-[16/9]",
  label,
  hint,
}: {
  ratio?: string;
  label: string;
  hint?: string;
}) {
  return (
    <div
      className={`${ratio} w-full rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 flex flex-col items-center justify-center gap-2 p-6 text-center`}
    >
      <ImagePlus className="h-6 w-6 text-stone-400 dark:text-stone-500" />
      <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
        {label}
      </p>
      {hint && (
        <p className="text-xs text-stone-400 dark:text-stone-500">{hint}</p>
      )}
    </div>
  );
}