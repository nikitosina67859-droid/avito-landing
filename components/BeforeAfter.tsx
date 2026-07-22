"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GrowthChart from "@/components/ui/GrowthChart";

const BEFORE = [
  "Объявления без структуры",
  "Мало просмотров",
  "Высокая стоимость контакта",
  "Случайные обращения",
  "Непонятно, что менять",
];

const AFTER = [
  "Отдельные объявления под услуги",
  "Понятные заголовки",
  "Сильные фотографии",
  "Управляемая реклама",
  "Больше целевых обращений",
];

export default function BeforeAfter() {
  const [tab, setTab] = useState<"before" | "after">("after");
  const list = tab === "before" ? BEFORE : AFTER;

  return (
    <section className="relative bg-base-graphite py-20 sm:py-28 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Динамика" title="До и после внедрения рекомендаций" />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex rounded-full border border-white/10 p-1 mb-6">
              <button
                onClick={() => setTab("before")}
                className={`rounded-full px-5 py-2 text-sm font-semibold font-display uppercase tracking-wide transition-colors ${
                  tab === "before" ? "bg-white/10 text-white" : "text-ink-gray"
                }`}
              >
                До
              </button>
              <button
                onClick={() => setTab("after")}
                className={`rounded-full px-5 py-2 text-sm font-semibold font-display uppercase tracking-wide transition-colors ${
                  tab === "after" ? "bg-brand-red text-white" : "text-ink-gray"
                }`}
              >
                После
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3"
              >
                {list.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        tab === "before"
                          ? "bg-white/10 text-ink-gray"
                          : "bg-brand-red/20 text-brand-red"
                      }`}
                    >
                      {tab === "before" ? <X size={13} /> : <Check size={13} strokeWidth={3} />}
                    </span>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="rounded-2xl border border-white/10 bg-base-black/60 p-6 sm:p-8">
            <GrowthChart className="w-full h-auto" />
            <p className="mt-4 font-mono text-[11px] text-ink-gray leading-relaxed">
              Иллюстрация возможной динамики после внедрения рекомендаций.
              Фактический результат зависит от ниши, региона, бюджета и
              обработки заявок.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
