import Image from "next/image";
import portfolioData from "@/lib/portfolio-data.json";

export default function AboutPage() {
  const { personal, experience, education } = portfolioData;
  const about = personal; // For mapping consistency

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-10 mt-12 md:mt-24 space-y-32 pb-20">
      <section className="grid grid-cols-1 md:grid-cols-1 gap-12 md:gap-24 items-start">
        <div>
          <h1 className="font-sans text-4xl md:text-5xl leading-tight tracking-tight text-stone-900 dark:text-white">
            {about.heroStatement}
          </h1>
        </div>
        <div className="space-y-6 pt-2">
          {about.longBio.map((paragraph, i) => (
            <p key={i} className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-lg">
              {paragraph}
            </p>
          ))}
          <div className="pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-3">
              When I'm not coding
            </h3>
            <ul className="space-y-1">
              {about.hobbies.map((hobby, i) => (
                <li key={i} className="text-stone-700 dark:text-stone-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience & Education Tables */}
      <section className="space-y-20">
        <div>
          <h2 className="font-sans text-3xl mb-12 border-b border-stone-200 dark:border-stone-800 pb-4">Experience</h2>
          <div className="space-y-6 md:space-y-4">
            {experience.map((job, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline group hover:opacity-100 opacity-90 transition-opacity">
                <div className="sm:col-span-2 text-stone-500 dark:text-stone-500 text-sm font-mono tracking-tight">
                  {job.year}
                </div>
                <div className="sm:col-span-4">
                  {job.link !== "#" ? (
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="font-medium text-stone-900 dark:text-white hover:underline underline-offset-4 decoration-stone-300 dark:decoration-stone-600 transition-all">
                      {job.company}
                    </a>
                  ) : (
                    <span className="font-medium text-stone-900 dark:text-white">{job.company}</span>
                  )}
                </div>
                <div className="sm:col-span-6 text-stone-600 dark:text-stone-400 text-sm sm:text-base">
                  {job.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-sans text-3xl mb-12 border-b border-stone-200 dark:border-stone-800 pb-4">Education</h2>
          <div className="space-y-6 md:space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline group hover:opacity-100 opacity-90 transition-opacity">
                <div className="sm:col-span-2 text-stone-500 dark:text-stone-500 text-sm font-mono tracking-tight">
                  {edu.year}
                </div>
                <div className="sm:col-span-4 font-medium text-stone-900 dark:text-white">
                  {edu.school}
                </div>
                <div className="sm:col-span-6 text-stone-600 dark:text-stone-400 text-sm sm:text-base">
                  {edu.degree}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Diary */}
      <section>
        <h2 className="font-sans text-3xl mb-12">Visual Diary</h2>
        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar">
          {about.socialImages.map((img, i) => (
            <div key={i} className="flex-none w-64 h-64 sm:w-80 sm:h-80 relative snap-center bg-stone-200 dark:bg-stone-800">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
