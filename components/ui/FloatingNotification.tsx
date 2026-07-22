"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
};

export default function FloatingNotification({
  icon: Icon,
  title,
  subtitle,
  className = "",
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={`pointer-events-none select-none animate-float rounded-xl border border-white/10 bg-base-graphite/90 backdrop-blur-md px-4 py-3 shadow-glow-red-lg ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{title}</p>
          {subtitle && <p className="text-xs text-ink-gray font-mono">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}
