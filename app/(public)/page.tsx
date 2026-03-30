import { prisma } from "@/lib/prisma";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Skills } from "@/app/components/sections/Skills";
import { Projects } from "@/app/components/sections/Projects";
import { Experience } from "@/app/components/sections/Experience";
import { Contact } from "@/app/components/sections/Contact";

// This page will be rendered on-demand (dynamic) to avoid build-time DB connection
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch data from database at request time (not build time)
  const [skills, projects, experiences] = await Promise.all([
    prisma.skill.findMany({
      orderBy: { proficiency: "desc" },
    }),
    prisma.project.findMany({
      where: { hidden: false },
      orderBy: { createdAt: "desc" },
    }),
    prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    }),
  ]);

  return (
    <div className="overflow-hidden">
      <Hero />
      <About initialSkills={skills} />
      <Skills initialSkills={skills} />
      <Projects initialProjects={projects} />
      <Experience initialExperiences={experiences} />
      <Contact />
    </div>
  );
}

