"use client";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function AnimatedLink({
  href,
  children,
  className = "",
  external = false,
}: AnimatedLinkProps) {
  return (
    <a
      href={href}
      className={`link-underline inline-flex items-center gap-2 group ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{children}</span>
      {external && (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
    </a>
  );
}
