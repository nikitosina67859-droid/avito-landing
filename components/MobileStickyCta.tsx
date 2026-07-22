"use client";

import { motion } from "framer-motion";
import { openMessenger } from "@/lib/messenger";
import { trackEvent } from "@/lib/analytics";

export default function MobileStickyCta() {
  const handleCta = () => {
    trackEvent("cta_click", { location: "mobile_sticky" });
    openMessenger();
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 bg-base-black/95 backdrop-blur-md px-4 py-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={handleCta}
        className="w-full min-h-[52px] rounded-md bg-brand-red font-display uppercase tracking-wide text-white text-sm shadow-glow-red"
      >
        Записаться на бесплатный разбор
      </button>
    </motion.div>
  );
}
