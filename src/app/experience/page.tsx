import { Metadata } from "next";
import ExperienceContent from "@/components/ExperienceContent";

export const metadata: Metadata = {
  title: "Experience | Lokesh Choudhary",
  description: "Detailed professional work history and experience of Lokesh Choudhary, Senior Frontend Engineer.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
