"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { auditIncludes } from "@/lib/config";

const FLOW = [
  "Текущая ситуация",
  "Бесплатный разбор",
  "Внедрение изменений",
  "Больше обращений",
];

export default function WhatYouGet() {
  return (
    <section id="audit" className="relative bg-base-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Что входит в разбор"
          title="За 30 минут вы получите понятный план роста"
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
          <ul className="grid sm:grid-cols-2 gap-3">
            {auditIncludes.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-base-graphite/60 p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="text-sm text-white leading-snug">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-base-graphite/60 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-0">
              {FLOW.map((step, i) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                        i === FLOW.length - 1
                          ? "bg-brand-red text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i < FLOW.length - 1 && (
                      <motion.span
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        style={{ transformOrigin: "top" }}
                        className="w-px flex-1 min-h-[36px] bg-gradient-to-b from-brand-red to-transparent"
                      />
                    )}
                  </div>
                  <p className="pt-2 pb-8 text-white font-medium">{step}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-ink-gray">
              <ArrowRight size={14} className="text-brand-red" />
              весь путь — с вашей стороны 30 минут на созвон
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
