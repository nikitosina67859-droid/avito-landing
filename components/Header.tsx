"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { openMessenger } from "@/lib/messenger";
import { trackEvent } from "@/lib/analytics";

const NAV_LINKS = [
  { label: "Кейсы", href: "#cases" },
  { label: "Что получите", href: "#audit" },
  { label: "Как проходит разбор", href: "#process" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleCta = () => {
    trackEvent("cta_click", { location: "header" });
    openMessenger();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between rounded-xl border transition-all duration-300 ${
          scrolled
            ? "bg-base-black/80 backdrop-blur-md border-white/10 shadow-glow-red py-2"
            : "bg-transparent border-transparent py-3"
        }`}
      >
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-display uppercase text-lg sm:text-xl text-white tracking-wide">
            {siteConfig.brand.name}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-ink-gray">
            {siteConfig.brand.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            
              key={link.href}
              href={link.href}
              className="text-sm text-ink-gray hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button onClick={handleCta} className="!min-h-[44px] !px-6 !text-sm">
            Бесплатный разбор
          </Button>
        </nav>

        <button
          aria-label="Открыть меню"
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-white p-2"
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-base-black/97 backdrop-blur-lg lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display uppercase text-lg text-white">
                {siteConfig.brand.name}
              </span>
              <button
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
                className="text-white p-2"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 flex-1">
              {NAV_LINKS.map((link) => (
                
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display uppercase text-2xl text-white"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  handleCta();
                }}
              >
                Бесплатный разбор
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
