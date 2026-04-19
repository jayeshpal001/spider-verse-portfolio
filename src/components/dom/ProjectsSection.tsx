import { projects } from "@/content/projects";
import ScrollReveal from "../ui/ScrollReveal"; // Wrapper import kiya

export default function ProjectsSection() {
  return (
    <div className="relative w-full">
      {projects.map((project, index) => (
        <section 
          key={project.id} 
          className="flex h-screen items-center justify-start px-[10%] md:px-[20%]"
        >
          {/* THE MAGIC WRAPPER */}
          <ScrollReveal>
            <div className="w-full max-w-xl p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-[1.02]">
              <h2 className="text-4xl font-bold text-white mb-2" style={{ textShadow: `0 0 20px ${project.color}80` }}>
                {project.title}
              </h2>
              <p className="text-sm text-gray-400 font-mono mb-6">{project.role}</p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-white/10 text-white border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      ))}
    </div>
  );
}