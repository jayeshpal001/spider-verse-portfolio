import ScrollReveal from "../ui/ScrollReveal";

export default function MindPalaceSection() {
  const interests = [
    { id: "strategy", title: "Strategic Mindset", desc: "Chess & Sudoku. Thinking 10 steps ahead, both on the board and in system architecture.", color: "#ff4b4b" },
    { id: "music", title: "Frequencies", desc: "Listening & Singing. Finding the perfect rhythm in code and in life.", color: "#4fa8f7" },
    { id: "marvel", title: "The Stark Influence", desc: "Marvel Movies enthusiast. Believer in building tech that looks like magic.", color: "#eab308" },
    { id: "creation", title: "The Creator", desc: "Sketching & Coding. Turning blank canvases and empty files into functional art.", color: "#00ff88" }
  ];

  return (
    <div className="relative w-full">
      <section className="flex h-screen items-center justify-center pointer-events-none">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-bold text-white opacity-40 tracking-widest text-center">
            ENTERING THE<br/>MIND PALACE
          </h2>
        </ScrollReveal>
      </section>

      {interests.map((interest) => (
        <section key={interest.id} className="flex h-screen items-center justify-start px-[10%] md:px-[20%]">
          <ScrollReveal>
            <div className="w-full max-w-lg p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-[1.02]">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ textShadow: `0 0 20px ${interest.color}80` }}>
                {interest.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {interest.desc}
              </p>
            </div>
          </ScrollReveal>
        </section>
      ))}
    </div>
  );
}