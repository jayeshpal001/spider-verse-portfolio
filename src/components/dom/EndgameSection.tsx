import ScrollReveal from "../ui/ScrollReveal";

export default function EndgameSection() {
  return (
    <section className="relative flex h-screen items-center justify-center px-[10%] pointer-events-auto">
      <ScrollReveal>
        <div className="text-center w-full max-w-2xl p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            INITIATING <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">ENDGAME</span>
          </h2>
          <p className="text-gray-300 mb-10 font-mono text-lg">
            System is ready for new directives. Let's build something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:your.email@example.com" 
              className="px-8 py-4 w-full sm:w-auto rounded-full bg-white text-black font-bold tracking-wide hover:scale-105 transition-transform"
            >
              INITIALIZE CONTACT
            </a>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                in
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                gh
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}