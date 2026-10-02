import React, { useState, TouchEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, Copy, Check, Info, Palette as PaletteIcon, Split } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100 for before/after
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'case-study' | 'brand-assets'>('case-study');

  const categories = ['All', 'Branding', 'Packaging', 'Campaign'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, container);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };

  // Switch to next or previous project in modal
  const navigateProject = (direction: 'prev' | 'next') => {
    if (!activeProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === activeProject.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= projectsData.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = projectsData.length - 1;

    setActiveProject(projectsData[nextIndex]);
    setSliderPosition(50); // Reset slider
    setModalTab('case-study'); // Reset tab
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-8 border-b border-brand-border">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text-muted block mb-3">
            PORTFOLIO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Featured Work
          </h2>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(' & ', '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-lg shadow-white/5'
                  : 'bg-brand-surface text-brand-text-muted hover:text-white border border-brand-border/40 hover:border-brand-border'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                setActiveProject(project);
                setModalTab('case-study');
                setSliderPosition(50);
              }}
              className="group cursor-pointer block focus:outline-none"
            >
              {/* Image Container with subtle zoom & layout overlays */}
              <div className="aspect-[16/10] bg-brand-surface rounded-2xl overflow-hidden mb-5 border border-brand-border relative shadow-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Custom Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="font-sans text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full self-start mb-3 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <span className="text-xs font-semibold text-white mt-4 flex items-center gap-1.5 font-mono">
                    VIEW CASE STUDY <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-brand-text-muted transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-brand-text-muted tracking-wider">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            id="case-study-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-surface border border-brand-border w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-brand-border/60 bg-black/20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand-text-muted tracking-widest uppercase bg-white/5 px-2.5 py-1 rounded">
                    {activeProject.category}
                  </span>
                  <span className="font-mono text-xs text-brand-text-muted">
                    {activeProject.year}
                  </span>
                </div>
                
                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* Prev Project */}
                  <button
                    id="btn-modal-prev"
                    onClick={() => navigateProject('prev')}
                    className="p-2 rounded-full border border-brand-border hover:bg-white/5 text-white cursor-pointer transition-colors"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {/* Next Project */}
                  <button
                    id="btn-modal-next"
                    onClick={() => navigateProject('next')}
                    className="p-2 rounded-full border border-brand-border hover:bg-white/5 text-white cursor-pointer transition-colors"
                    title="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* Close button */}
                  <button
                    id="btn-modal-close"
                    onClick={() => setActiveProject(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black text-white cursor-pointer transition-all ml-1"
                    title="Close case study"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-grow">
                {/* Hero / Main Mockup */}
                <div className="aspect-[16/9] w-full relative bg-zinc-950 border-b border-brand-border overflow-hidden">
                  {modalTab === 'case-study' ? (
                    <img
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Before/After Interactive Comparison Slider */
                    <div
                      id="interactive-before-after"
                      className="w-full h-full relative overflow-hidden select-none cursor-ew-resize"
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onMouseLeave={() => setIsDragging(false)}
                      onMouseMove={handleMouseMove}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                      onTouchMove={handleTouchMove}
                    >
                      {/* Before State (Under layer) */}
                      <div className="absolute inset-0">
                        <img
                          src={activeProject.beforeImg || 'https://picsum.photos/seed/draft/800/600'}
                          alt="Before Sketch/Draft"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono font-bold text-white border border-white/15">
                          CREATIVE DRAFT / SKETCH
                        </div>
                      </div>

                      {/* After State (Top layer clipped) */}
                      <div
                        className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                      >
                        <img
                          src={activeProject.afterImg || activeProject.imageUrl}
                          alt="After Design"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded-md text-xs font-mono font-bold border border-brand-border shadow">
                          FINAL DIGITAL MOCKUP
                        </div>
                      </div>

                      {/* Split Divider bar */}
                      <div
                        className="absolute inset-y-0 w-0.5 bg-white shadow-2xl z-20"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        {/* Drag Handle ball */}
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black border border-brand-border flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing">
                          <Split className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab Navigation inside Modal */}
                <div className="flex border-b border-brand-border bg-black/10 px-6 py-1 gap-4 sticky top-0 z-20 backdrop-blur-md">
                  <button
                    id="btn-modal-tab-casestudy"
                    onClick={() => setModalTab('case-study')}
                    className={`py-3 text-xs font-semibold tracking-wider font-mono flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer ${
                      modalTab === 'case-study' ? 'text-white border-b-2 border-white' : 'text-brand-text-muted hover:text-white'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5" />
                    CASE STUDY
                  </button>
                  <button
                    id="btn-modal-tab-brandassets"
                    onClick={() => setModalTab('brand-assets')}
                    className={`py-3 text-xs font-semibold tracking-wider font-mono flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer ${
                      modalTab === 'brand-assets' ? 'text-white border-b-2 border-white' : 'text-brand-text-muted hover:text-white'
                    }`}
                  >
                    <PaletteIcon className="w-3.5 h-3.5" />
                    BRAND ASSETS & TIMELINE SLIDER
                  </button>
                </div>

                {/* Tab Content Panels */}
                <div className="p-6 md:p-8 space-y-8">
                  {modalTab === 'case-study' ? (
                    /* CASE STUDY PANEL */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left 2 Columns: Client, Brief, Challenges */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                            {activeProject.title}
                          </h1>
                          <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                            {activeProject.description}
                          </p>
                        </div>

                        {/* Challenges list */}
                        <div className="space-y-3">
                          <h4 className="font-mono text-xs font-bold text-white tracking-widest uppercase border-b border-brand-border/40 pb-2">
                            The Design Challenges
                          </h4>
                          <ul className="space-y-3.5 pl-1">
                            {activeProject.challenges.map((c, i) => (
                              <li key={i} className="flex gap-3 text-brand-text-muted text-sm leading-relaxed">
                                <span className="font-mono text-zinc-600 font-bold shrink-0">0{i+1}.</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solutions list */}
                        <div className="space-y-3">
                          <h4 className="font-mono text-xs font-bold text-white tracking-widest uppercase border-b border-brand-border/40 pb-2">
                            Strategic Creative Solutions
                          </h4>
                          <ul className="space-y-3.5 pl-1">
                            {activeProject.solutions.map((s, i) => (
                              <li key={i} className="flex gap-3 text-white text-sm leading-relaxed">
                                <span className="font-mono text-white font-bold shrink-0">✔</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right 1 Column: Metadata box */}
                      <div className="bg-black/30 border border-brand-border rounded-2xl p-6 h-fit space-y-5">
                        <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase border-b border-brand-border/30 pb-2">
                          Project Specs
                        </h4>
                        
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-brand-text-muted block uppercase">Client / Brand</span>
                          <span className="text-sm font-semibold text-white">{activeProject.client}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-brand-text-muted block uppercase">My Role</span>
                          <span className="text-sm font-semibold text-white">{activeProject.role}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-brand-text-muted block uppercase">Delivery Year</span>
                          <span className="text-sm font-semibold text-white font-mono">{activeProject.year}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-brand-text-muted block uppercase">Core Deliverables</span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">Monogram Design</span>
                            <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">Corporate System</span>
                            <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-300">Press Guidelines</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* BRAND ASSETS & SLIDER WORKSPACE */
                    <div className="space-y-8">
                      {/* Explainer note */}
                      <div className="flex items-start gap-3 p-4 bg-zinc-900/50 border border-brand-border rounded-xl">
                        <Split className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-brand-text-muted space-y-1">
                          <p className="font-semibold text-white">Interactive Case-Study Slider</p>
                          <p>Drag or move the handles on the image canvas above to slide between the initial raw sketching design concept and the fully rendered digital brand mockup asset.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Brand Palette Spec */}
                        <div className="space-y-4">
                          <h4 className="font-mono text-xs font-bold text-white tracking-widest uppercase border-b border-brand-border/40 pb-2">
                            Brand Color Spec
                          </h4>
                          <p className="text-xs text-brand-text-muted">Click any swatch value below to copy the specific architectural hex color code straight to your clipboard.</p>
                          
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {activeProject.colors.map((color) => (
                              <button
                                key={color}
                                id={`btn-copy-color-${color.replace('#', '')}`}
                                onClick={() => handleCopyColor(color)}
                                className="flex items-center justify-between p-3.5 bg-black/40 border border-brand-border rounded-xl text-left hover:border-white/20 hover:bg-black/60 transition-all cursor-pointer focus:outline-none"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-6 h-6 rounded-md border border-white/10 shrink-0 shadow"
                                    style={{ backgroundColor: color }}
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-xs font-bold text-white font-mono">{color}</span>
                                    <span className="text-[9px] text-brand-text-muted uppercase tracking-wider font-mono">HEX CODE</span>
                                  </div>
                                </div>
                                
                                {copiedColor === color ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-zinc-500 hover:text-white shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Brand Typography Spec */}
                        <div className="space-y-4">
                          <h4 className="font-mono text-xs font-bold text-white tracking-widest uppercase border-b border-brand-border/40 pb-2">
                            Design Typography Guides
                          </h4>
                          <p className="text-xs text-brand-text-muted">The core architectural type-pairings used for visual branding structures.</p>
                          
                          <div className="space-y-3 pt-2">
                            {activeProject.typography.map((font, index) => (
                              <div
                                key={font}
                                className="p-4 bg-black/20 border border-brand-border/60 rounded-xl space-y-1.5"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-mono text-brand-text-muted">Font Family {index + 1}</span>
                                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white font-mono">{font}</span>
                                </div>
                                <p
                                  className="text-lg text-white font-bold tracking-tight"
                                  style={{ fontFamily: font === 'Inter' ? 'Inter, sans-serif' : font === 'Epilogue' ? 'Epilogue, sans-serif' : 'monospace' }}
                                >
                                  Aa Bb Cc Dd Ee Ff Gg
                                </p>
                                <p className="text-[10px] font-mono text-brand-text-muted">ABCDEFGHIJKLMNOPQRSTUVWXYZ • 0123456789</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Bottom Area */}
              <div className="px-6 py-4 border-t border-brand-border/60 bg-black/20 text-center">
                <button
                  id="btn-modal-bottom-close"
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2 bg-white text-black font-sans font-semibold text-xs rounded-full hover:bg-zinc-200 cursor-pointer transition-colors focus:outline-none"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
