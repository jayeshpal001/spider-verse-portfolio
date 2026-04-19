import ScrollReveal from "../ui/ScrollReveal";

export default function ConstellationSection() {
  const skills = [
    "Next.js", "React.js", "MongoDB", "Node.js", 
    "TypeScript", "Express", "Redux/RTK Query", "Web3 / Ethers.js", 
    "Tailwind CSS", "GSAP", "Three.js", "Framer Motion"
  ];

  return (
    <section className="relative flex h-screen items-center justify-start px-[10%] md:px-[20%]">
      <ScrollReveal>
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-[1.02]">
          <h2 className="text-5xl font-bold text-white mb-2" style={{ textShadow: `0 0 20px #eab30880` }}>
            THE CONSTELLATION
          </h2>
          <p className="text-sm text-gray-400 font-mono mb-8">
            System diagnostic: Analyzing Core Neural Pathways & Technical Arsenal...
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div 
                key={skill} 
                className="px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white font-mono text-center hover:bg-white/20 transition-all hover:scale-105 cursor-crosshair shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}