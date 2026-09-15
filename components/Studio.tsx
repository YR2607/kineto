import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1761971974992-6df33df97c3a?q=80&w=800&auto=format&fit=crop",
    alt: "Зал для реабилитации с оборудованием",
    label: "Зал",
  },
  {
    src: "https://images.unsplash.com/photo-1776886099265-6366478b341b?q=80&w=800&auto=format&fit=crop",
    alt: "Зона ожидания студии",
    label: "Пространство",
  },
  {
    src: "https://images.unsplash.com/photo-1770012905139-713758ded6ec?q=80&w=800&auto=format&fit=crop",
    alt: "Специалист работает с пациентом",
    label: "Работа с пациентом",
  },
];

export default function Studio() {
  return (
    <section id="studio" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Пространство Kineto One
        </h2>
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-sage-dust">
          Чистое, спокойное и приватное пространство для работы над
          восстановлением.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.label}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist-paper"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white-sheet/90 px-4 py-1.5 text-sm font-medium text-forest-ink backdrop-blur-sm">
                {image.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-sage-dust">
          Стоковые изображения заменяются на реальные фотографии студии: зал,
          оборудование, вход, детали пространства.
        </p>
      </div>
    </section>
  );
}
