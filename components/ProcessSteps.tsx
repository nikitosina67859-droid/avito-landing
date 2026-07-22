"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/config";

export default function ProcessSteps() {
  return (
    <section id="process" className="relative bg-base-graphite py-20 sm:py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Как проходит разбор" title="4 шага до плана действий" />

        <div className="mt-16 relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: "left" }}
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-red via-brand-red/60 to-transparent"
          />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col gap-3"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red font-display text-lg text-white shadow-glow-red">
                {i + 1}
              </span>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-ink-gray leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
