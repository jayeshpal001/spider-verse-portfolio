import Scene from "@/components/canvas/Scene";
import HeroUI from "@/components/dom/HeroUI";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      
      {/* CANVAS LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      {/* DOM LAYER */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Section 1: Hero */}
        <section className="relative flex h-screen items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold text-white opacity-80 mix-blend-overlay">
            JAYESH PAL
          </h1>
          <HeroUI />
        </section>

        {/* Section 2: The Arsenal (Projects) */}
        <div className="relative w-full">
          {projects.map((project, index) => (
            <section 
              key={project.id} 
              className="flex h-screen items-center justify-start px-[10%] md:px-[20%]"
            >
              {/* Project Details Card */}
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
            </section>
          ))}
        </div>
        
        {/* Section 3: Future Vision / Contact */}
        <section className="flex h-screen items-center justify-center">
          <p className="text-2xl text-gray-400 font-mono tracking-widest">INITIATING ENDGAME PROTOCOL...</p>
        </section>
        
      </div>
    </main>
  );
}