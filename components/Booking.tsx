"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const serviceOptions = [
  "Кинетотерапия",
  "Лечебный массаж",
  "Расслабляющий массаж",
  "Консультация",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white-sheet py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal type="fade-up">
          <h2 className="heading-text text-forest-ink pb-16">
            Контакты
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left — info */}
          <Reveal type="slide-left" className="flex flex-col gap-8">
            <h3 className="text-forest-ink text-[36px] font-semibold leading-[1] tracking-[-1.4px]">
              Запишитесь{" "}
              <span className="italic-accent text-forest-ink">
                на сеанс
              </span>
            </h3>
            <p className="body-lg-text text-sage-dust max-w-[420px]">
              Оставьте заявку — я свяжусь с вами в течение дня, чтобы подобрать
              удобное время и подходящую технику.
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <a
                href="tel:+79991234567"
                className="text-forest-ink text-[14px] font-normal hover:text-sage-dust transition-colors"
              >
                → +7 (999) 123-45-67
              </a>
              <a
                href="mailto:anna@korni-therapy.ru"
                className="text-forest-ink text-[14px] font-normal hover:text-sage-dust transition-colors"
              >
                anna@korni-therapy.ru
              </a>
              <span className="body-sm-text text-sage-dust pt-2">
                ул. Пушкина 10, кабинет 205
              </span>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal type="slide-right" className="flex flex-col gap-5">
            {submitted ? (
              <div className="flex flex-col gap-5 py-12">
                <h3 className="subheading-text text-forest-ink">
                  Заявка отправлена
                </h3>
                <p className="body-lg-text text-sage-dust max-w-[340px]">
                  Спасибо, {form.name || "друг"}! Я свяжусь с вами в ближайшее
                  время для подтверждения записи.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", service: "", date: "", notes: "" });
                  }}
                  className="text-forest-ink text-[14px] font-normal py-1.5 hover:text-sage-dust transition-colors text-left"
                >
                  ← Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="eyebrow text-forest-ink">
                    Ваше имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Как к вам обращаться"
                    className="bg-transparent text-forest-ink text-[14px] border-b border-mist-paper px-0 py-3 outline-none focus:border-forest-ink transition-colors placeholder:text-pine-shadow"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="eyebrow text-forest-ink">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-transparent text-forest-ink text-[14px] border-b border-mist-paper px-0 py-3 outline-none focus:border-forest-ink transition-colors placeholder:text-pine-shadow"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="eyebrow text-forest-ink">
                    Услуга
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="bg-transparent text-forest-ink text-[14px] border-b border-mist-paper px-0 py-3 outline-none focus:border-forest-ink transition-colors"
                  >
                    <option value="" disabled>
                      Выберите услугу
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="eyebrow text-forest-ink">
                    Предпочтительная дата
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="bg-transparent text-forest-ink text-[14px] border-b border-mist-paper px-0 py-3 outline-none focus:border-forest-ink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="notes" className="eyebrow text-forest-ink">
                    Комментарий
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Опишите ваши ощущения или проблему"
                    className="bg-transparent text-forest-ink text-[14px] border-b border-mist-paper px-0 py-3 outline-none focus:border-forest-ink transition-colors placeholder:text-pine-shadow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-chartreuse-sprig text-forest-ink text-[14px] font-semibold tracking-[0.35px] rounded-lg px-[21px] py-3 hover:bg-vivid-lime transition-colors mt-4 self-start"
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
