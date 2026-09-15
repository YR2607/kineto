import Link from "next/link";

export default function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Хлебные крошки" className="breadcrumbs">
      <ol>
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/#services">Услуги</Link>
        </li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}
