import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { achievementsData, testimonialsData } from '../data';
import { Testimonial } from '../types';
import { Award, Quote, ChevronLeft, ChevronRight, Star, PlusCircle, Sparkles, Check } from 'lucide-react';

export default function Achievements() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('');
  const [formCompany, setFormCompany] = useState<string>('');
  const [formText, setFormText] = useState<string>('');
  const [formRating, setFormRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Load recommendations from local storage
  useEffect(() => {
    const saved = localStorage.getItem('vanshika_testimonials');
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse testimonials", err);
      }
    }
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formText || !formRole) return;

    setSubmitting(true);
    
    setTimeout(() => {
      const newReview: Testimonial = {
        id: `custom-test-${Date.now()}`,
        name: formName,
        role: formRole,
        company: formCompany || undefined,
        text: formText,
        rating: formRating
      };

      const updated = [...testimonials, newReview];
      setTestimonials(updated);
      localStorage.setItem('vanshika_testimonials', JSON.stringify(updated));
      
      // Select the newly added review
      setActiveIndex(updated.length - 1);
      
      // Reset form
      setFormName('');
      setFormRole('');
      setFormCompany('');
      setFormText('');
      setFormRating(5);
      
      setSubmitting(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setShowAddReview(false);
      }, 2500);
    }, 1200);
  };

  return (
    <section id="achievements" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-8 border-b border-brand-border">
      
      {/* SECTION 1: ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pb-20 border-b border-brand-border/40">
        <div className="lg:col-span-5 space-y-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text-muted block">
            RECOGNITIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
            Notable Achievements
          </h2>
          <p className="font-sans text-brand-text-muted text-sm leading-relaxed max-w-sm pt-2">
            Selected industry accolades and visual highlights spanning admissions, design innovation, and brand leadership.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {achievementsData.map((item, idx) => (
            <div 
              key={idx}
              id={`achievement-card-${idx}`}
              className="p-8 bg-brand-surface border border-brand-border hover:border-zinc-700 rounded-2xl flex gap-6 items-start transition-all duration-300"
            >
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CLIENT ENDORSEMENTS / TESTIMONIALS */}
      <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-text-muted block">
            ENDORSEMENTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Client Feedback
          </h2>
          <p className="font-sans text-brand-text-muted text-sm leading-relaxed max-w-sm pt-1">
            Read direct feedback from brand founders, corporate directors, and collaborative project sponsors.
          </p>

          {/* Trigger to leave a review */}
          <button
            id="btn-trigger-review-form"
            onClick={() => setShowAddReview(!showAddReview)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-brand-text-muted transition-colors pt-4 focus:outline-none cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {showAddReview ? 'CLOSE RECOMMENDATION BOX' : 'LEAVE A CLIENT RECOMMENDATION'}
          </button>
        </div>

        <div className="lg:col-span-7 relative">
          <AnimatePresence mode="wait">
            {!showAddReview ? (
              /* CAROUSEL PANEL */
              <motion.div
                key="testimonial-carousel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-950 border border-brand-border rounded-2xl p-8 md:p-10 space-y-8 relative"
              >
                {/* Giant background Quote icon */}
                <Quote className="absolute right-6 top-6 w-24 h-24 text-white/2 select-none pointer-events-none" />

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[activeIndex]?.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white shrink-0" />
                  ))}
                </div>

                {/* Body Text */}
                <p className="font-display text-base md:text-lg text-zinc-100 italic leading-relaxed">
                  "{testimonials[activeIndex]?.text}"
                </p>

                {/* Author Info */}
                <div className="flex justify-between items-end border-t border-brand-border/40 pt-6">
                  <div>
                    <h4 className="font-display text-base font-bold text-white">
                      {testimonials[activeIndex]?.name}
                    </h4>
                    <p className="font-sans text-xs text-brand-text-muted mt-0.5">
                      {testimonials[activeIndex]?.role}
                      {testimonials[activeIndex]?.company && ` • ${testimonials[activeIndex]?.company}`}
                    </p>
                  </div>

                  {/* Slider controls */}
                  <div className="flex gap-2">
                    <button
                      id="btn-testimonial-prev"
                      onClick={handlePrev}
                      className="p-2.5 rounded-lg border border-brand-border hover:bg-white/5 text-white transition-colors cursor-pointer focus:outline-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-testimonial-next"
                      onClick={handleNext}
                      className="p-2.5 rounded-lg border border-brand-border hover:bg-white/5 text-white transition-colors cursor-pointer focus:outline-none"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ADD REVIEW FORM */
              <motion.div
                key="review-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-brand-surface border border-brand-border rounded-2xl p-8 space-y-6"
              >
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Submit Recommendation
                  </h4>
                  <p className="text-xs text-brand-text-muted mt-1 font-sans">
                    Have we collaborated? Submit your feedback to showcase it on this digital canvas.
                  </p>
                </div>

                {success ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    <h5 className="font-display text-base font-bold text-white">Recommendation Received!</h5>
                    <p className="text-xs text-brand-text-muted max-w-xs leading-relaxed">
                      Thank you for your valuable endorsement. It is now saved locally and added into the active slider.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Siddharth Mehta"
                          className="w-full bg-black/40 border border-brand-border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>

                      {/* Role */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                          Role / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formRole}
                          onChange={(e) => setFormRole(e.target.value)}
                          placeholder="e.g. Founder & CEO"
                          className="w-full bg-black/40 border border-brand-border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                          Company / Brand
                        </label>
                        <input
                          type="text"
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          placeholder="e.g. Ritva Co."
                          className="w-full bg-black/40 border border-brand-border rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>

                      {/* Rating selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                          Recommendation Rating
                        </label>
                        <div className="flex gap-2 items-center h-10">
                          {[1, 2, 3, 4, 5].map((stars) => (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setFormRating(stars)}
                              className="text-zinc-500 hover:text-white transition-colors focus:outline-none cursor-pointer"
                            >
                              <Star className={`w-5 h-5 ${stars <= formRating ? 'fill-white text-white' : 'text-zinc-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recommendation body */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                        Testimonial Narrative *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formText}
                        onChange={(e) => setFormText(e.target.value)}
                        placeholder="Detail your collaboration, Vanshika's design precision, creative speed, communication..."
                        className="w-full bg-black/40 border border-brand-border rounded-lg p-4 text-xs text-white focus:outline-none focus:border-white/40 transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddReview(false)}
                        className="px-5 py-2.5 bg-black/20 border border-brand-border text-zinc-400 font-sans font-semibold text-xs rounded-lg hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 bg-white text-black font-sans font-bold text-xs rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            SUBMITTING...
                          </>
                        ) : (
                          'SUBMIT ENDORSEMENT'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
