"use client";

import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getUtm, trackEvent } from "@/lib/analytics";
import { openMessenger } from "@/lib/messenger";

type FormState = {
  name: string;
  contact: string;
  city: string;
  business: string;
  avitoLink: string;
};

const EMPTY: FormState = { name: "", contact: "", city: "", business: "", avitoLink: "" };

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const startedRef = useRef(false);

  const handleChange = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start");
    }
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Укажите имя";
    if (!form.contact.trim()) next.contact = "Укажите телефон или Telegram";
    if (!form.city.trim()) next.city = "Укажите город";
    if (!form.business.trim()) next.business = "Расскажите, чем занимаетесь";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const utm = getUtm();
    const message = `Здравствуйте! Хочу записаться на бесплатный разбор Авито.

Имя: ${form.name}
Город: ${form.city}
Ниша: ${form.business}
Профиль Авито: ${form.avitoLink || "не указан"}
${Object.keys(utm).length ? `\nUTM: ${JSON.stringify(utm)}` : ""}`;

    trackEvent("form_submit", { ...form, ...utm });
    setSubmitted(true);
    await openMessenger(message);
  };

  return (
    <section id="form" className="relative bg-base-graphite py-20 sm:py-28 border-y border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Запись на разбор"
          title="Узнайте, где вы теряете заявки"
          description="Запишитесь на бесплатный разбор — покажу точки роста и дам план, который можно начать внедрять сразу после созвона."
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 mx-auto max-w-xl rounded-2xl border border-white/10 bg-base-black/60 p-6 sm:p-8"
          noValidate
        >
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-display text-2xl text-white uppercase mb-2">
                Заявка отправлена
              </p>
              <p className="text-ink-gray text-sm">
                Текст сообщения скопирован — вставьте его в чат, если переход
                в мессенджер не открылся автоматически.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <Field
                label="Имя"
                value={form.name}
                onChange={handleChange("name")}
                error={errors.name}
                placeholder="Как к вам обращаться"
              />
              <Field
                label="Телефон или Telegram"
                value={form.contact}
                onChange={handleChange("contact")}
                error={errors.contact}
                placeholder="+7 ... или @username"
              />
              <Field
                label="Город"
                value={form.city}
                onChange={handleChange("city")}
                error={errors.city}
                placeholder="Например, Краснодар"
              />
              <Field
                label="Чем занимаетесь"
                value={form.business}
                onChange={handleChange("business")}
                error={errors.business}
                placeholder="Например, ремонт квартир под ключ"
              />
              <Field
                label="Ссылка на профиль Авито (необязательно)"
                value={form.avitoLink}
                onChange={handleChange("avitoLink")}
                placeholder="https://avito.ru/..."
              />

              <Button
                type="submit"
                className="w-full mt-2"
                ariaLabel="Получить бесплатный разбор"
              >
                Получить бесплатный разбор
              </Button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-white font-medium">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`min-h-[52px] rounded-lg border bg-base-graphite/60 px-4 text-white placeholder:text-ink-gray/50 outline-none transition-colors focus:border-brand-red ${
          error ? "border-brand-red" : "border-white/10"
        }`}
      />
      {error && <span className="text-xs text-brand-red">{error}</span>}
    </label>
  );
}
