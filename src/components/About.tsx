import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, MapPin, Award, Briefcase, Users } from 'lucide-react';

export default function About() {
  const [activeMantraIndex, setActiveMantraIndex] = useState<number>(0);

  const mantras = [
    "“Great design is more than aesthetics, it's about creating experiences that people remember.”",
    "“Design is the silent ambassador of your brand; it must stand tall, clean, and intentional.”",
    "“Simple is hard. It requires rigorous math, strict grids, and absolute architectural discipline.”",
    "“Visual excellence means crafting die-cuts and layouts with zero decorative slop.”"
  ];

  const handleNextMantra = () => {
    setActiveMantraIndex((prev) => (prev + 1) % mantras.length);
  };

  const stats = [
    { value: '1+', label: 'Years Experience', icon: <Briefcase className="w-4 h-4 text-zinc-400" /> },
    { value: '10+', label: 'Happy Clients', icon: <Users className="w-4 h-4 text-zinc-400" /> },
    { value: 'Jaipur', label: 'Rajasthan, IN', icon: <MapPin className="w-4 h-4 text-zinc-400" /> },
    { value: 'Innov8', label: 'Best Designer Award', icon: <Award className="w-4 h-4 text-zinc-400" /> }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-brand-surface border-b border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left 5 Columns: Profile Image with Interactive Mantra Overlay */}
        <div className="lg:col-span-5 relative group">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-brand-border bg-zinc-900 shadow-2xl relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXE_X7Rpi-wYtpddSCt9B620rq_9J6wp9CXHY7lEIXwy8elIkv0tqjoWc7HRgivCqvTFnU7FKzEVA4uZEpPhoZwT0ZDmXkokQoS0vTDPHj5Xy1pv46qcozuWXoU_hCLmaKz2r4fk27cXSbzfPBpY2TO2KiaFNbkWPdQpk5hzegQkdmA6_pNXBgYiXXyfjTsB-gcLxazOuH4JRiBSkZGwN8x49d8i1X8eOmB8l0vhEBvMTLgYPrx-UCpSaoJaDq0KGnIWohh6PqtNQF"
              alt="Vanshika Jain Profile Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            
            {/* Visual gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
            
            {/* Subtle brand tag in image */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono tracking-widest text-white border border-white/10 uppercase">
              SCHOOL OF DESIGN • JECRC BVA
            </div>
          </div>

          {/* Floating Interactive Mantra Box */}
          <div 
            id="mantra-box"
            onClick={handleNextMantra}
            className="absolute -bottom-6 -right-4 md:-right-8 bg-zinc-950/95 border border-brand-border p-5 rounded-2xl max-w-sm shadow-2xl backdrop-blur-sm cursor-pointer hover:border-white/35 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 uppercase">
                <Quote className="w-3 h-3 text-white" /> DESIGN PHILOSOPHY
              </span>
              <span className="text-[9px] font-mono text-zinc-600 uppercase flex items-center gap-1">
                CLICK TO CYCLE <Sparkles className="w-2.5 h-2.5 animate-spin" />
              </span>
            </div>

            <div className="min-h-[64px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMantraIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-sm font-medium text-white italic leading-relaxed"
                >
                  {mantras[activeMantraIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: About Copy & Stats Grid */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text-muted block mb-3">
              ABOUT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Strategic Design &amp; Visual Excellence
            </h2>
          </div>

          <p className="font-sans text-base sm:text-lg text-brand-text-muted leading-relaxed">
            I believe great design is more than aesthetics—it's about creating experiences that people remember. As a Graphic Designer specializing in branding, packaging, and campaign design, I craft visually refined and strategically driven solutions that help brands connect, communicate, and stand out.
          </p>

          <p className="font-sans text-sm text-brand-text-muted/80 leading-relaxed">
            Combining rigorous theoretical studies from my Bachelor of Visual Arts program with real-world marketing campaigns, I offer a unique dual force: deep fine-art precision fused with active digital advertising metrics. I build packaging that scales shelf traction and identity vectors that capture executive quality.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                id={`stat-card-${index}`} 
                className="p-5 bg-black/20 border border-brand-border/60 hover:border-brand-border rounded-xl space-y-3 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    {stat.icon}
                  </div>
                </div>
                <div className="font-sans text-xs font-medium text-brand-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
