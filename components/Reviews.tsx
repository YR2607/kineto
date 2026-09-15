const reviews = [
  {
    text: "[Здесь будет короткий реальный отзыв пациента об опыте работы со студией.]",
    author: "[Имя пациента]",
    detail: "[Направление, например: реабилитация после травмы колена]",
  },
  {
    text: "[Здесь будет ещё один реальный отзыв. Короткие отзывы лучше длинных рекламных текстов.]",
    author: "[Имя пациента]",
    detail: "[Направление]",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Что говорят наши пациенты
        </h2>
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-sage-dust">
          Здесь будут реальные отзывы. Мы не публикуем выдуманные истории.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((review, idx) => (
            <figure
              key={idx}
              className="flex flex-col rounded-2xl border border-forest-ink/10 bg-white-sheet p-7 md:p-8"
            >
              <blockquote className="text-lg leading-relaxed text-forest-ink">
                {review.text}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1">
                <span className="font-semibold text-forest-ink">
                  {review.author}
                </span>
                <span className="text-sm text-sage-dust">{review.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-sm text-sage-dust">
          В будущем здесь можно подключить Google Reviews и видеоотзывы.
        </p>
      </div>
    </section>
  );
}
