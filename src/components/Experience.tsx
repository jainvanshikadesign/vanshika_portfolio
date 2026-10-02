import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceData } from '../data';
import { Briefcase, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTimeline = activeTab === 'all'
    ? experienceData
    : experienceData.filter(item => item.category === activeTab);

  return (
    <section id="journey" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-8 border-b border-brand-border">
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text-muted block mb-3">
            JOURNEY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Professional &amp; Academic Path
          </h2>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex bg-brand-surface p-1 rounded-xl border border-brand-border/60 self-start md:self-auto">
          {(['all', 'experience', 'education'] as const).map((tab) => (
            <button
              key={tab}
              id={`journey-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-brand-text-muted hover:text-white'
              }`}
            >
              {tab === 'experience' && <Briefcase className="w-3.5 h-3.5" />}
              {tab === 'education' && <GraduationCap className="w-3.5 h-3.5" />}
              {tab === 'all' && <Sparkles className="w-3.5 h-3.5" />}
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.map((item, index) => {
            const isHovered = hoveredId === item.id;
            
            return (
              <motion.div
                key={item.id}
                id={`timeline-item-${item.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-brand-border pb-12 last:border-0 relative group"
              >
                {/* Horizontal split left-side: Duration & Company */}
                <div className="md:w-1/3 shrink-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold tracking-wider text-brand-text-muted">
                      {item.duration}
                    </span>
                    <span className={`p-1 rounded text-xs ${
                      item.category === 'experience' 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {item.category === 'experience' ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                  
                  <h4 className="font-display text-lg font-bold text-white tracking-tight">
                    {item.company}
                  </h4>
                  
                  <p className="text-xs text-brand-text-muted font-mono uppercase tracking-wider">
                    {item.category === 'experience' ? 'Industrial Role' : 'Academic Journey'}
                  </p>
                </div>

                {/* Horizontal split right-side: Role, description, bullets */}
                <div className="md:w-2/3 space-y-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {item.role}
                  </h3>
                  
                  <p className="font-sans text-brand-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet accomplishments */}
                  <ul className="space-y-2.5 pt-2 pl-1.5 border-l border-brand-border/40 ml-1">
                    {item.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="flex gap-3 text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Creative Interactive Touch: Key Tools applied showcase */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-4 flex items-center gap-1.5 text-[10px] font-mono text-white/50"
                    >
                      <span className="text-zinc-600">APPLIED VALUES:</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">ACCURACY</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">STRATEGY</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">COHESION</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
