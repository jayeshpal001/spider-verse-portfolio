import Scene from "@/components/canvas/Scene";
import HeroUI from "@/components/dom/HeroUI";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      
      {/* 1. CANVAS LAYER (z-0 instead of -z-10) 
          pointer-events-auto ensures it catches mouse movements */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      {/* 2. DOM LAYER (z-10)
          pointer-events-none ensures it doesn't block the canvas behind it */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Section 1: Hero */}
        <section className="relative flex h-screen items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold text-white opacity-80 mix-blend-overlay">
            JAYESH PAL
          </h1>
          <HeroUI />
        </section>

        {/* Section 2: Placeholder */}
        <section className="flex h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
          <h2 className="text-5xl font-semibold text-white">
            THE ARCHITECTURE
          </h2>
        </section>
        
        {/* Section 3: Placeholder */}
        <section className="flex h-screen items-center justify-center">
          <p className="text-2xl text-gray-400">Loading Nodes...</p>
        </section>
        
      </div>
    </main>
  );
}