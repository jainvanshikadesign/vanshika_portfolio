import { useState, useEffect } from 'react';
import { Palette, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-brand-bg/90 backdrop-blur-md border-brand-border py-4 shadow-lg'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <button
          id="btn-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
        >
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Palette className="w-5 h-5 text-white group-hover:text-black transition-colors" />
          </div>
          <span className="font-display text-lg font-bold tracking-widest text-white group-hover:text-brand-text-muted transition-colors">
            VANSHIKA
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={() => scrollToSection(item.href)}
                className={`relative py-1 font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer focus:outline-none ${
                  isActive ? 'text-white' : 'text-brand-text-muted hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          <button
            id="btn-contact-nav"
            onClick={() => scrollToSection('#contact')}
            className="bg-white text-black px-5 py-2 rounded-full font-sans text-xs font-bold tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer focus:outline-none"
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-brand-text-muted transition-colors cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full bg-brand-bg/95 backdrop-blur-lg border-b border-brand-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    id={`mobile-nav-link-${item.label.toLowerCase()}`}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left font-display text-xl font-semibold py-1 focus:outline-none ${
                      isActive ? 'text-white pl-3 border-l-2 border-white' : 'text-brand-text-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                id="btn-mobile-contact-nav"
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-white text-black py-3 rounded-xl font-sans text-sm font-bold tracking-wider text-center cursor-pointer focus:outline-none hover:bg-zinc-200 transition-colors mt-2"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
