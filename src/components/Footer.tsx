import { Palette, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-12 md:py-16 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand block / Logo */}
          <button
            id="btn-footer-logo"
            onClick={handleScrollTop}
            className="flex flex-col items-center md:items-start gap-1 group text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-white group-hover:text-brand-text-muted transition-colors" />
              <span className="font-display text-sm font-bold tracking-widest text-white group-hover:text-brand-text-muted transition-colors">
                VANSHIKA JAIN
              </span>
            </div>
            <span className="text-[10px] text-brand-text-muted font-mono uppercase tracking-widest">
              Branding • Packaging • Campaigns
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center text-xs font-semibold tracking-wider font-sans">
            <a
              id="footer-link-portfolio"
              href="#portfolio"
              className="text-brand-text-muted hover:text-white transition-colors uppercase"
            >
              Portfolio
            </a>
            <a
              id="footer-link-about"
              href="#about"
              className="text-brand-text-muted hover:text-white transition-colors uppercase"
            >
              About
            </a>
            <a
              id="footer-link-behance"
              href="https://behance.net/vanshikajain110"
              target="_blank"
              rel="noreferrer"
              className="text-brand-text-muted hover:text-white transition-colors uppercase"
            >
              Behance
            </a>
            <a
              id="footer-link-linkedin"
              href="https://linkedin.com/in/vanshikajain105"
              target="_blank"
              rel="noreferrer"
              className="text-brand-text-muted hover:text-white transition-colors uppercase"
            >
              LinkedIn
            </a>
            <a
              id="footer-link-instagram"
              href="#"
              className="text-brand-text-muted hover:text-white transition-colors uppercase"
            >
              Instagram
            </a>
          </div>

          {/* Top Scroller / Copyright block */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <button
              id="btn-scroll-top-footer"
              onClick={handleScrollTop}
              className="p-2 bg-brand-surface border border-brand-border rounded-lg hover:border-white/40 text-brand-text-muted hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center gap-1.5 text-[10px] font-mono uppercase"
              title="Scroll to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <p className="font-sans text-[10px] text-zinc-600">
              © {currentYear} Vanshika Jain. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
