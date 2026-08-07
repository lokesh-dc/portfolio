import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import DarkSection from "@/components/home/DarkSection";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <Hero />
      <SelectedWork />
      <DarkSection />
    </div>
  );
}
