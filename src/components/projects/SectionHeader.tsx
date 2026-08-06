export default function SectionHeader({
  num,
  label,
  title,
}: {
  num: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-4">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-sans text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {num}
        </span>
        <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
          {label}
        </span>
      </div>
      <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
        {title}
      </h2>
    </div>
  );
}