export default function ProjectLoading() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-6 md:px-10 pb-32 animate-pulse" aria-busy="true" aria-label="Loading project">
      <div className="pt-4 md:pt-10 space-y-10">
        <div className="space-y-5">
          <div className="h-3 w-24 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-12 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="h-6 w-full rounded-lg bg-stone-100 dark:bg-stone-800/60" />
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-stone-100 dark:bg-stone-900 p-5">
              <div className="h-2 w-16 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mt-2 h-4 w-28 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>
        <div className="h-64 w-full rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800" />
      </div>
    </div>
  );
}
