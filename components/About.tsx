"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutStats, siteConfig } from "@/lib/config";
import { useCountUp, formatNumber } from "@/lib/hooks";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="rounded-xl border border-white/10 bg-base-graphite/60 p-5">
      <p className="font-display text-3xl sm:text-4xl text-white">
        <span ref={ref}>{formatNumber(current)}</span>
        {suffix}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-ink-gray">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative bg-base-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              eyebrow="Кто проводит разбор"
              title={
                <>
                  Разбор проводит {siteConfig.brand.specialistName} — специалист
                  по продвижению на Авито
                </>
              }
              description="Более 5 лет занимаюсь продвижением товаров и услуг на Авито. Помогаю бизнесу получать обращения не за счёт постоянного повышения ставок, а через упаковку, аналитику, SEO и тестирование гипотез."
            />

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {aboutStats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl border border-white/10 bg-gradient-to-b from-base-graphite to-base-black p-3 shadow-glow-red-lg">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={siteConfig.images.aboutSpecialist}
                  alt={`${siteConfig.brand.specialistName} — специалист по продвижению на Авито`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
