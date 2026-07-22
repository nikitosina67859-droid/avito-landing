"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.35 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-md px-8 min-h-[52px] font-display uppercase tracking-wide text-sm sm:text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  const styles =
    variant === "primary"
      ? "bg-brand-red text-white shadow-glow-red hover:bg-red-600"
      : "border border-white/25 text-white hover:bg-white/10";

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
