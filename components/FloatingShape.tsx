"use client";

interface FloatingShapeProps {
  className?: string;
  type?: "leaf" | "circle" | "seed" | "fern";
  color?: string;
  size?: number;
  delay?: number;
  duration?: number;
}

export default function FloatingShape({
  className = "",
  type = "leaf",
  color = "#003329",
  size = 60,
  delay = 0,
  duration = 8,
}: FloatingShapeProps) {
  const shapes = {
    leaf: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <path
          d="M30 55 C30 55, 8 45, 8 25 C8 10, 22 5, 30 5 C38 5, 52 10, 52 25 C52 45, 30 55, 30 55Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 10 V50"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 20 C25 22, 20 25, 18 28"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 30 C35 32, 40 35, 42 38"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    circle: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle
          cx="30"
          cy="30"
          r="26"
          stroke={color}
          strokeWidth="1.5"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill={color}
        />
      </svg>
    ),
    seed: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <ellipse
          cx="30"
          cy="30"
          rx="12"
          ry="24"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M30 6 V54"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M24 18 C28 22, 32 22, 36 18"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M24 42 C28 38, 32 38, 36 42"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    ),
    fern: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <path
          d="M30 5 C30 5, 30 55, 30 55"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 15 C22 18, 16 24, 14 30"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 25 C22 28, 16 34, 14 40"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 35 C22 38, 16 44, 14 50"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 15 C38 18, 44 24, 46 30"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 25 C38 28, 44 34, 46 40"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 35 C38 38, 44 44, 46 50"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  const isDelayed = delay !== 0;

  return (
    <div
      className={`pointer-events-none opacity-20 md:opacity-30 ${className}`}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {shapes[type]}
    </div>
  );
}
