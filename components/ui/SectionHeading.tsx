"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment}`}
    >
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-red flex items-center gap-2">
        <span className="w-5 h-px bg-brand-red inline-block" />
        {eyebrow}
      </span>
      <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-white">
        {title}
      </h2>
      {description && (
        <p className="text-ink-gray text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
