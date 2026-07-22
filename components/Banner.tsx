import Reveal from "./Reveal";

const marqueeText = [
  "Восстановление",
  "Баланс",
  "Кинетотерапия",
  "Свобода движения",
  "Миофасциальный релиз",
  "Осознанность",
  "Лечебный массаж",
  "Здоровое тело",
];

export default function Banner() {
  return (
    <div className="w-full bg-mist-paper overflow-hidden py-8 md:py-10 border-y border-white-sheet">
      <Reveal type="fade-in">
        <div className="relative flex w-full">
          {/* We animate the translation infinitely using a basic tailwind class or inline style.
              For simplicity, we'll use a double wrapper to ensure seamless looping. */}
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
            {[...marqueeText, ...marqueeText, ...marqueeText].map((text, i) => (
              <div key={i} className="flex items-center">
                <span className="text-forest-ink text-[24px] md:text-[30px] font-normal tracking-[-0.6px] px-8">
                  {text}
                </span>
                <span className="inline-block h-2 w-2 rounded-full bg-chartreuse-sprig mx-4" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Add keyframes directly for the marquee if not using tailwind config */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
      `}} />
    </div>
  );
}
