import { motion } from 'motion/react';
import { ArrowDown, CornerRightDown } from 'lucide-react';

export default function Hero() {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col justify-center px-6 md:px-8 max-w-7xl mx-auto py-12 relative overflow-hidden"
    >
      {/* Decorative background grid elements or details */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-white/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-zinc-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-border font-sans text-xs font-semibold tracking-wider bg-brand-surface text-brand-text-muted uppercase">
            ⚡ Hey! I'm Vanshika Jain
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.05]"
        >
          I craft{' '}
          <span className="text-zinc-500 underline decoration-zinc-800 decoration-wavy underline-offset-8">
            Visually Refined
          </span>{' '}
          branding & packaging solutions.
        </motion.h1>

        <motion.p
          id="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-brand-text-muted max-w-2xl leading-relaxed"
        >
          Specializing in branding, packaging, and campaign design. I build strategically driven solutions that help brands connect, communicate, and stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row gap-4 sm:items-center"
        >
          <button
            id="btn-hero-portfolio"
            onClick={scrollToPortfolio}
            className="group flex items-center justify-center gap-2.5 bg-white text-black font-sans font-semibold text-sm px-8 py-4 rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-md cursor-pointer focus:outline-none"
          >
            Explore Portfolio
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <div className="flex items-center gap-2 text-brand-text-muted text-xs font-mono px-4 py-2 self-start sm:self-auto">
            <CornerRightDown className="w-4 h-4 animate-bounce text-zinc-600" />
            <span>SCROLL TO VIEW THE STORY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
