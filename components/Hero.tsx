"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, PhoneCall, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import MoneyParticles from "@/components/ui/MoneyParticles";
import FloatingNotification from "@/components/ui/FloatingNotification";
import { heroFeatures, siteConfig } from "@/lib/config";
import { openMessenger } from "@/lib/messenger";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handleCta = () => {
    trackEvent("cta_click", { location: "hero" });
    openMessenger();
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-base-black pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <MoneyParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-red flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-brand-red inline-block" />
              Бесплатный разбор Авито
            </span>

            <h1 className="font-display uppercase text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.02] mb-6">
              Строитель,
              <br />
              получи до{" "}
              <span className="bg-gradient-to-r from-brand-red to-red-400 bg-clip-text text-transparent">
                15 дополнительных
              </span>
              <br />
              заявок с Авито
            </h1>

            <p className="text-ink-gray text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              На бесплатном разборе покажу, почему ваши объявления теряют
              клиентов, где сливается рекламный бюджет и какие изменения
              помогут получать больше обращений.
            </p>

            <ul className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              {heroFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-start gap-3">
              <Button onClick={handleCta} ariaLabel="Записаться на бесплатный разбор">
                Записаться на бесплатный разбор
              </Button>
              <span className="font-mono text-xs text-ink-gray">
                Без оплаты и обязательств. Продолжительность — 30 минут.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl border border-white/10 bg-gradient-to-b from-base-graphite to-base-black p-3 shadow-glow-red-lg">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={siteConfig.images.heroSpecialist}
                  alt="Специалист по продвижению на Авито"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              <div className="absolute -top-5 -left-5 rounded-xl bg-brand-red px-4 py-3 shadow-glow-red">
                <p className="font-display text-3xl text-white leading-none">+15</p>
                <p className="font-mono text-[10px] text-white/80 mt-1">заявок в мес.</p>
              </div>
            </div>

            <FloatingNotification
              icon={MessageCircle}
              title="Новое сообщение"
              subtitle="Клиент интересуется услугой"
              className="absolute -right-4 top-8 w-56 hidden sm:block"
              delay={0.3}
            />
            <FloatingNotification
              icon={PhoneCall}
              title="Новый звонок"
              subtitle="+7 (9••) •••-••-••"
              className="absolute -left-6 bottom-24 w-52 hidden sm:block"
              delay={0.6}
            />
            <FloatingNotification
              icon={TrendingUp}
              title="Просмотры выросли на 87%"
              subtitle="пример · для иллюстрации"
              className="absolute -right-6 bottom-4 w-60"
              delay={0.9}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
