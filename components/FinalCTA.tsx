"use client";

import { motion } from "framer-motion";
import { MessageCircle, PhoneCall, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import MoneyParticles from "@/components/ui/MoneyParticles";
import FloatingNotification from "@/components/ui/FloatingNotification";
import { openMessenger } from "@/lib/messenger";
import { trackEvent } from "@/lib/analytics";

export default function FinalCTA() {
  const handleCta = () => {
    trackEvent("cta_click", { location: "final" });
    openMessenger();
  };

  return (
    <section className="relative overflow-hidden bg-base-graphite py-24 sm:py-32 border-t border-white/5">
      <MoneyParticles />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05]"
        >
          Пока конкуренты повышают ставки —{" "}
          <span className="text-brand-red">найдите точки роста</span> в своих
          объявлениях
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-ink-gray text-base sm:text-lg max-w-xl mx-auto"
        >
          Запишитесь на бесплатный разбор и получите конкретный план
          увеличения обращений с Авито.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <Button onClick={handleCta} ariaLabel="Записаться на разбор">
            Записаться на разбор
          </Button>
        </motion.div>

        <div className="relative mt-16 h-0 hidden sm:block">
          <FloatingNotification
            icon={MessageCircle}
            title="Новое сообщение"
            className="absolute left-0 -top-4 w-52"
            delay={0.2}
          />
          <FloatingNotification
            icon={PhoneCall}
            title="Новый звонок"
            className="absolute right-4 top-10 w-52"
            delay={0.5}
          />
          <FloatingNotification
            icon={DollarSign}
            title="Клиент запросил стоимость"
            className="absolute left-1/2 -translate-x-1/2 top-24 w-64"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
