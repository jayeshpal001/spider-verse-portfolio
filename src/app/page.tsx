import Scene from "@/components/canvas/Scene";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* 3D Canvas Layer: Fixed position behind everything (-z-10)
        Pointer events are enabled so OrbitControls work, but we will adjust this later for GSAP animations.
      */}
      <div className="fixed inset-0 -z-10 bg-zinc-950">
        <Scene />
      </div>

      {/* 2D DOM Layer: This will scroll over the 3D Canvas
      */}
      <div className="relative z-10">
        {/* Section 1: Hero */}
        <section className="flex h-screen items-center justify-center pointer-events-none">
          <h1 className="text-7xl md:text-9xl font-bold text-white opacity-80 mix-blend-overlay">
            JAYESH PAL
          </h1>
        </section>

        {/* Section 2: Placeholder for Projects (Gang-App, etc.) */}
        <section className="flex h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
          <h2 className="text-5xl font-semibold text-white">
            THE ARCHITECTURE
          </h2>
        </section>

        {/* Section 3: Extra space to test scrolling */}
        <section className="flex h-screen items-center justify-center">
          <p className="text-2xl text-gray-400">Loading Nodes...</p>
        </section>
      </div>
    </main>
  );
}