import ScrollReveal from "../ui/ScrollReveal";

export default function MemoryVaultSection() {
  const memories = [
    { id: 1, title: "The Beginning", year: "2023", img: "/images/memory1.jpg" },
    { id: 2, title: "First Architecture", year: "2024", img: "/images/memory2.jpg" },
    { id: 3, title: "The Web3 Leap", year: "2025", img: "/images/memory3.jpg" },
    { id: 4, title: "Present Day", year: "2026", img: "/images/memory4.jpg" },
  ];

  return (
    <div className="relative w-full">
      <section className="flex h-screen items-center justify-center pointer-events-none">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-bold text-white opacity-40 tracking-widest text-center">
            THE MEMORY VAULT
          </h2>
        </ScrollReveal>
      </section>

      <section className="flex min-h-screen items-center justify-center px-[5%] py-20 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {memories.map((mem, index) => (
            // Adding a dynamic delay based on index for a cascade effect!
            <ScrollReveal key={mem.id} delay={index * 0.15}>
              <div className="relative group h-80 rounded-xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs">
                  [Image: {mem.img}]
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <p className="text-[#4fa8f7] font-mono text-sm mb-1">{mem.year}</p>
                  <h3 className="text-white font-bold text-xl">{mem.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}