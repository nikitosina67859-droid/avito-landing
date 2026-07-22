"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { cases } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Cases() {
  return (
    <section id="cases" className="relative bg-base-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Результаты" title="Результаты в цифрах" />

        <div className="mt-4 inline-block rounded-md border border-brand-red/40 bg-brand-red/10 px-4 py-2 font-mono text-xs text-red-300">
          Заменить на подтверждённые кейсы перед запуском рекламы
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.niche}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              onViewportEnter={() => trackEvent("case_view", { niche: c.niche })}
              className="rounded-2xl border border-white/10 bg-base-graphite/60 p-6 hover:border-brand-red/50 transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-brand-red">
                {c.niche}
              </span>

              <div className="mt-4 flex items-end gap-3">
                <span className="font-mono text-lg text-ink-gray line-through">
                  {c.beforeLeads}
                </span>
                <TrendingUp size={16} className="text-brand-red mb-1" />
                <span className="font-display text-4xl text-white">
                  {c.afterLeads}
                </span>
                <span className="font-mono text-xs text-ink-gray mb-1">заявок/мес</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-mono text-[10px] text-ink-gray uppercase">
                    Цена заявки
                  </p>
                  <p className="text-white font-medium">
                    <span className="line-through text-ink-gray mr-1">
                      {c.beforePrice}
                    </span>
                    → {c.afterPrice}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-ink-gray uppercase">
                    Бюджет
                  </p>
                  <p className="text-white font-medium">{c.budget}</p>
                </div>
              </div>

              <p className="mt-4 font-mono text-[11px] text-ink-gray">
                период: {c.period}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
