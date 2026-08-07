import Image from "next/image";
import portfolioData from "@/lib/portfolio-data.json";
import BioSection from "@/components/about/BioSection";
import ScrollText from "@/components/about/ScrollText";
import ServicesSection from "@/components/about/ServicesSection";

export default function AboutPage() {
  return (
    <div className="flex-1 w-full">
      <BioSection />

      <ScrollText />

      <ServicesSection />

      {/* Visual Diary */}
      <section className="mx-auto w-full max-w-[1180px] px-6 md:px-10 pb-24">
        <h2 className="font-sans text-3xl mb-12">Visual Diary</h2>
        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar">
          {portfolioData.personal.socialImages.map((img, i) => (
            <div
              key={i}
              className="flex-none w-64 h-64 sm:w-80 sm:h-80 relative snap-center bg-stone-200 dark:bg-stone-800"
            >
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
