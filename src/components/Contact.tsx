import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactInquiry } from '../types';
import { Mail, MapPin, Send, MessageSquareCode, Clock, RefreshCw, CheckCircle, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'inbox'>('form');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Branding');
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load inquiries on mount
  useEffect(() => {
    const saved = localStorage.getItem('vanshika_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load inquiries", err);
      }
    }
  }, []);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);

    // Simulate server delay
    setTimeout(() => {
      const newInquiry: ContactInquiry = {
        id: `inq-${Date.now()}`,
        name,
        email,
        projectType,
        budget,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        status: 'Responded', // Immediately respond with an automated AI reply
        autoResponse: `Hi ${name}, thank you for reaching out about your ${projectType} project! Since you selected a budget of ${budget}, I've assigned you a Priority Onboarding slot. I'll personally review your design notes and draft a visual mood board in the next 24 hours. Keep an eye on your inbox (${email}) for a scheduling link. Looking forward to creating together!`
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('vanshika_inquiries', JSON.stringify(updated));

      // Reset form
      setName('');
      setEmail('');
      setProjectType('Branding');
      setBudget('$1,000 - $3,000');
      setMessage('');

      setSubmitting(false);
      setSuccess(true);

      // Flash success, then jump to inbox to see response
      setTimeout(() => {
        setSuccess(false);
        setActiveTab('inbox');
      }, 2000);

    }, 1500);
  };

  const clearInbox = () => {
    setInquiries([]);
    localStorage.removeItem('vanshika_inquiries');
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden border-b border-brand-border">
      {/* Dynamic ambient grid overlay or glowing nodes */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Core CTA */}
        <div className="text-center mb-16 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tighter"
          >
            Let's Create Together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-brand-text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Ready to elevate your brand with visual precision? Let's connect and start your project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-2"
          >
            <a
              id="btn-mail-cta"
              href="mailto:jainvanshika.design@gmail.com"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-display text-base font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              jainvanshika.design@gmail.com
              <ArrowUpRight className="w-5 h-5 text-black" />
            </a>
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-brand-text-muted pt-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>JAIPUR, RAJASTHAN, IN</span>
          </div>
        </div>

        {/* Interactive Workspace Grid: Form vs History */}
        <div className="max-w-3xl mx-auto bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Portal Switcher */}
          <div className="flex border-b border-brand-border bg-black/20 px-6 py-1.5 justify-between items-center">
            <div className="flex gap-4">
              <button
                id="btn-contact-tab-form"
                onClick={() => setActiveTab('form')}
                className={`py-3 text-xs font-bold tracking-wider font-mono flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none ${
                  activeTab === 'form' ? 'text-white border-b-2 border-white' : 'text-brand-text-muted hover:text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                INQUIRY FORM
              </button>
              <button
                id="btn-contact-tab-inbox"
                onClick={() => setActiveTab('inbox')}
                className={`py-3 text-xs font-bold tracking-wider font-mono flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none relative ${
                  activeTab === 'inbox' ? 'text-white border-b-2 border-white' : 'text-brand-text-muted hover:text-white'
                }`}
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                CLIENT WORKSPACE
                {inquiries.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-white text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full scale-90">
                    {inquiries.length}
                  </span>
                )}
              </button>
            </div>

            {activeTab === 'inbox' && inquiries.length > 0 && (
              <button
                id="btn-clear-inbox"
                onClick={clearInbox}
                className="text-[9px] font-mono text-zinc-600 hover:text-red-400 uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                Clear History
              </button>
            )}
          </div>

          {/* Workspace Body */}
          <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                /* INQUIRY SUBMISSION FORM */
                <motion.div
                  key="contact-form-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {success ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-full text-white animate-pulse">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
                      <p className="text-xs text-brand-text-muted max-w-sm leading-relaxed">
                        Establishing secure connection... Navigating you to your Client Workspace portal to receive your immediate AI Onboarding response.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Siddharth Mehta"
                            className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="client@brand.com"
                            className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Project type dropdown */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                            Project Type
                          </label>
                          <select
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Branding">Branding &amp; Monograms</option>
                            <option value="Packaging">Product Packaging Box</option>
                            <option value="Web UI">Web &amp; Wearable Interface</option>
                            <option value="Full Identity">Full Visual Campaign</option>
                            <option value="Other">Custom Creative Task</option>
                          </select>
                        </div>

                        {/* Budget select */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                            Budget Outlook
                          </label>
                          <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Under $1,000">Under $1,000</option>
                            <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                            <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                            <option value="$5,000+">$5,000+ (Enterprise)</option>
                          </select>
                        </div>
                      </div>

                      {/* Brief description message */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                          Creative Notes / Brief *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell me about your product, your target audience, and any visual inspirations or material specifications you have in mind..."
                          className="w-full bg-black/30 border border-brand-border rounded-lg p-4 text-xs text-white focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-white text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase cursor-pointer hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Establishing Secure Handshake...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Submit Design Brief
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                /* INBOX / CLIENT WORKSPACE TIMELINE */
                <motion.div
                  key="contact-inbox-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 flex-grow"
                >
                  {inquiries.length === 0 ? (
                    <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                      <HelpCircle className="w-10 h-10 text-zinc-600" />
                      <h5 className="font-display text-sm font-bold text-white">Inbox Workspace Empty</h5>
                      <p className="text-xs text-brand-text-muted max-w-xs leading-relaxed font-sans">
                        Submit an inquiry using the form tab. Your submitted briefs will populate here with instant AI-driven onboarding responses from Vanshika's desk.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[420px] overflow-y-auto pr-1">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="border border-brand-border bg-black/25 rounded-2xl p-5 space-y-4"
                        >
                          {/* Top bar info */}
                          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-brand-border/40 pb-3">
                            <div className="space-y-0.5">
                              <h5 className="font-display text-sm font-bold text-white">{inq.projectType} Project Brief</h5>
                              <span className="text-[10px] font-mono text-zinc-500">Sent by {inq.name} ({inq.email})</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-brand-text-muted">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              {inq.timestamp}
                            </div>
                          </div>

                          {/* Client's inquiry message */}
                          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                            <span className="text-[9px] font-mono text-zinc-600 block mb-1">CLIENT BRIEF NOTES:</span>
                            "{inq.message}"
                            <div className="flex gap-2 pt-2 text-[9px] font-mono text-zinc-500">
                              <span>BUDGET: {inq.budget}</span>
                            </div>
                          </div>

                          {/* Immediate Automated Response */}
                          {inq.autoResponse && (
                            <div className="bg-white/[0.02] border-l-2 border-white/40 p-4 rounded-r-xl space-y-1.5">
                              <span className="text-[9px] font-mono font-bold text-white flex items-center gap-1">
                                <Send className="w-3 h-3 text-white" /> VANSHIKA'S ONBOARDING DESK
                              </span>
                              <p className="text-xs text-brand-text-muted leading-relaxed font-sans italic">
                                "{inq.autoResponse}"
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Informational Footer */}
            <div className="text-[10px] font-mono text-zinc-600 text-center pt-6 border-t border-brand-border/30 mt-6">
              SECURE WORKSPACE PORTAL • LOCAL STORAGE INQUIRY ENGINE • SHIELD SECURED
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
