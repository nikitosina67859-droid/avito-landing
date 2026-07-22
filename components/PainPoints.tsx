"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { painPoints } from "@/lib/config";

export default function PainPoints() {
  return (
    <section className="relative bg-base-graphite py-20 sm:py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Знакомая картина"
          title="Почему Авито не даёт нужного количества заявок"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6, borderColor: "rgba(225,6,0,0.5)" }}
              className="rounded-xl border border-white/10 bg-base-black/60 p-6 transition-colors"
            >
              <span className="font-mono text-xs text-brand-red">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-ink-gray leading-relaxed">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
