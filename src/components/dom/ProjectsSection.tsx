"use client";

import { projects } from "@/content/projects";
import ScrollReveal from "../ui/ScrollReveal";
import { ExternalLink, Target } from "lucide-react"; 
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectCard = ({ project }: { project: any }) => {
  const isVideo = project.image?.endsWith(".mp4");

  return (
    <section className="relative flex min-h-screen items-center justify-start py-20 px-[5%] md:px-[10%] xl:px-[12%]">
      
      {/* ========================================== */}
      {/* THE 3D HOLOGRAPHIC NODE (Replaces the dot) */}
      {/* ========================================== */}
      <div className="absolute left-[5%] md:left-[10%] w-16 h-16 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
        
        {/* Outer rotating mechanical ring */}
        <div 
          className="absolute inset-0 rounded-full border-[2px] border-white/10 border-t-transparent animate-[spin_4s_linear_infinite]" 
          style={{ borderRightColor: project.color }} 
        />
        
        {/* Inner reverse rotating ring */}
        <div 
          className="absolute inset-3 rounded-full border border-white/20 border-b-transparent animate-[spin_3s_linear_infinite_reverse]" 
          style={{ borderLeftColor: project.color }} 
        />
        
        {/* The Glowing Core */}
        <div 
          className="w-3 h-3 rounded-full shadow-[0_0_20px_3px_currentColor]"
          style={{ backgroundColor: project.color, color: project.color }}
        />
        
        {/* Anti-gravity Ping effect */}
        <div 
          className="absolute w-3 h-3 rounded-full animate-ping opacity-60" 
          style={{ backgroundColor: project.color }} 
        />
      </div>

      {/* CARD CONTAINER */}
      {/* Increased left margin (ml-10 md:ml-20) so the card doesn't touch the new big 3D node */}
      <div className="w-full max-w-2xl ml-10 md:ml-16 lg:ml-20">
        <ScrollReveal delay={0.1}>
          
          <div className="flex flex-col w-full rounded-[2rem] bg-[#050505]/60 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 pointer-events-auto group">
            
            {/* TOP SECTION: VIDEO / IMAGE */}
            <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-white/10">
              {isVideo ? (
                <video 
                  src={project.image} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <img 
                  src={project.image || "/images/placeholder.jpg"} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 md:left-8 z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter drop-shadow-xl" style={{ textShadow: `0 4px 30px ${project.color}80` }}>
                  {project.title}
                </h2>
              </div>
            </div>

            {/* BOTTOM SECTION: TEXT & CONTENT */}
            <div className="flex flex-col p-6 md:p-8 relative">
              
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-10 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />

              <div className="inline-block px-4 py-3 mb-6 rounded-full border border-white/10 bg-white/5 w-max relative z-10">
                <p className="text-xs text-gray-300 font-mono uppercase tracking-widest">{project.role}</p>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-base relative z-10">
                {project.description}
              </p>

              {project.problem && (
                <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] border-l-[3px] hover:bg-white/[0.06] transition-colors relative z-10" style={{ borderLeftColor: project.color }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} style={{ color: project.color }} />
                    <span className="text-white font-bold text-xs uppercase tracking-widest">The Mission</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-mono rounded-full bg-black/50 text-gray-300 border border-white/10 hover:border-white/30 transition-all">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-auto relative z-10">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2  rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 <span className="px-4 py-3 flex"><ExternalLink size={16} /> Live Demo</span> 
                  </a>
                )}
                {project.sourceLink && (
                  <a href={project.sourceLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:scale-105 transition-all">
                    <FaGithub size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default function ProjectsSection() {
  return (
    <div className="relative w-full">
      
      {/* ========================================== */}
      {/* THE 3D FIBER OPTIC SPINE (Replaces the line) */}
      {/* ========================================== */}
      <div className="absolute left-[5%] md:left-[10%] top-0 bottom-0 w-12 -translate-x-1/2 z-0 pointer-events-none flex justify-center overflow-hidden">
        
        {/* Outer 3D Glass Tube */}
        <div className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent border-x border-white/[0.05] rounded-full" />
        
        {/* Inner Solid Wire Core */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/10" />

        {/* Energy Pulse 1 (Fast & Blue) */}
        <motion.div 
          className="absolute w-[2px] h-[15vh] rounded-full blur-[2px]"
          style={{ background: 'linear-gradient(to bottom, transparent, #4fa8f7, transparent)' }}
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Energy Pulse 2 (Slow & Green, delayed) */}
        <motion.div 
          className="absolute w-[4px] h-[10vh] rounded-full blur-[4px]"
          style={{ background: 'linear-gradient(to bottom, transparent, #00ff88, transparent)' }}
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}