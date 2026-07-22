"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

function Banknote({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none">
      <rect x="1" y="1" width="62" height="38" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="32" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <text x="32" y="24" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7" fontFamily="monospace">₽</text>
      <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <line x1="48" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function Coin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <text x="20" y="25" textAnchor="middle" fontSize="14" fill="currentColor" opacity="0.7" fontFamily="monospace">₽</text>
    </svg>
  );
}

type ParticleDef = {
  Comp: typeof Banknote;
  top: string;
  left: string;
  size: number;
  delay: number;
  depth: number;
};

const PARTICLES: ParticleDef[] = [
  { Comp: Banknote, top: "12%", left: "6%", size: 70, delay: 0, depth: 18 },
  { Comp: Coin, top: "22%", left: "88%", size: 46, delay: 0.4, depth: 30 },
  { Comp: Banknote, top: "68%", left: "3%", size: 60, delay: 0.8, depth: 24 },
  { Comp: Coin, top: "78%", left: "92%", size: 38, delay: 1.1, depth: 14 },
  { Comp: Coin, top: "45%", left: "94%", size: 30, delay: 0.2, depth: 20 },
  { Comp: Banknote, top: "85%", left: "45%", size: 54, delay: 0.6, depth: 26 },
];

function Particle({
  def,
  mx,
  my,
  reducedMotion,
}: {
  def: ParticleDef;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const depthX = useTransform(mx, (v) => v * def.depth);
  const depthY = useTransform(my, (v) => v * def.depth);
  const { Comp } = def;

  return (
    <motion.div
      className="absolute text-brand-red/60 animate-floatSlow"
      style={{
        top: def.top,
        left: def.left,
        width: def.size,
        x: reducedMotion ? 0 : depthX,
        y: reducedMotion ? 0 : depthY,
        animationDelay: `${def.delay}s`,
      }}
    >
      <Comp className="w-full h-auto" />
    </motion.div>
  );
}

export default function MoneyParticles() {
  const reducedMotion = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reducedMotion) return;
    const handler = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my, reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-brand-red/20 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-darkred/25 blur-[110px]" />
      {PARTICLES.map((p, i) => (
        <Particle key={i} def={p} mx={smx} my={smy} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
