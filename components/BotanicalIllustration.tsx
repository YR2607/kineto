export default function BotanicalIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Butterfly — top left */}
      <g
        stroke="#003329"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Left wing */}
        <path d="M180 200 C160 170, 120 165, 100 185 C85 200, 85 225, 105 235 C125 240, 160 230, 180 210" />
        <path d="M180 210 C165 225, 140 235, 120 250 C105 262, 105 280, 120 285 C140 288, 165 270, 180 250" />
        {/* Right wing */}
        <path d="M200 200 C220 170, 260 165, 280 185 C295 200, 295 225, 275 235 C255 240, 220 230, 200 210" />
        <path d="M200 210 C215 225, 240 235, 260 250 C275 262, 275 280, 260 285 C240 288, 215 270, 200 250" />
        {/* Body */}
        <line x1="190" y1="195" x2="190" y2="260" />
        <circle cx="190" cy="192" r="4" fill="#003329" />
        {/* Antennae */}
        <path d="M190 190 C185 180, 178 172, 174 168" />
        <path d="M190 190 C195 180, 202 172, 206 168" />
        {/* Wing detail — lime accent */}
        <circle cx="130" cy="205" r="5" fill="#9bff48" stroke="none" opacity="0.7" />
        <circle cx="250" cy="205" r="5" fill="#9bff48" stroke="none" opacity="0.7" />
      </g>

      {/* Leaf — bottom left */}
      <g
        stroke="#003329"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M120 380 C100 360, 80 340, 70 310 C65 290, 70 270, 85 260 C105 255, 125 275, 135 300 C140 320, 135 350, 120 380" />
        <path d="M120 380 L100 340 M115 370 L95 330 M110 360 L90 320" />
        <path d="M120 380 C115 370, 110 355, 105 340" />
        {/* Stem */}
        <path d="M120 380 C130 390, 140 400, 145 410" />
      </g>

      {/* Seed pod — right side */}
      <g
        stroke="#003329"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <ellipse cx="360" cy="320" rx="18" ry="35" />
        <path d="M360 285 L360 355" />
        <path d="M360 300 L348 305 M360 310 L348 318 M360 322 L348 330 M360 335 L348 340" />
        <path d="M360 300 L372 305 M360 310 L372 318 M360 322 L372 330 M360 335 L372 340" />
        {/* Stem */}
        <path d="M360 285 C360 270, 358 255, 355 240" />
      </g>

      {/* Fern frond — bottom right */}
      <g
        stroke="#003329"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M340 420 C350 400, 360 370, 365 340 C368 320, 365 300, 358 285" />
        {/* Frond leaflets */}
        <path d="M365 340 C375 338, 382 332, 385 325" />
        <path d="M363 355 C373 353, 380 348, 383 342" />
        <path d="M361 370 C371 368, 378 363, 381 357" />
        <path d="M358 385 C368 383, 375 378, 378 372" />
        <path d="M355 400 C365 398, 372 393, 375 387" />
        <path d="M365 340 C355 338, 348 332, 345 325" />
        <path d="M363 355 C353 353, 346 348, 343 342" />
        <path d="M361 370 C351 368, 344 363, 341 357" />
        <path d="M358 385 C348 383, 341 378, 338 372" />
        <path d="M355 400 C345 398, 338 393, 335 387" />
      </g>

      {/* Small moth — top right */}
      <g
        stroke="#003329"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M330 130 C315 115, 295 112, 285 122 C278 130, 280 145, 292 150 C305 153, 322 145, 330 135" />
        <path d="M330 130 C345 115, 365 112, 375 122 C382 130, 380 145, 368 150 C355 153, 338 145, 330 135" />
        <line x1="330" y1="128" x2="330" y2="155" />
        {/* Feathered antennae */}
        <path d="M330 126 C326 118, 322 112, 319 108" />
        <path d="M330 126 C334 118, 338 112, 341 108" />
        <path d="M326 120 L322 116 M328 122 L325 118 M334 120 L338 116 M332 122 L335 118" />
      </g>

      {/* Small leaves — scattered */}
      <g
        stroke="#003329"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Top center small leaf */}
        <path d="M240 90 C235 80, 228 72, 220 70 C215 72, 213 80, 218 88 C223 93, 233 95, 240 90" />
        <path d="M240 90 L222 78" />

        {/* Bottom center small leaf */}
        <path d="M250 430 C258 420, 265 412, 272 410 C277 412, 279 420, 274 428 C269 433, 257 435, 250 430" />
        <path d="M250 430 L268 418" />

        {/* Lime accent dot on small leaf */}
        <circle cx="225" cy="80" r="3" fill="#9bff48" stroke="none" opacity="0.7" />
      </g>
    </svg>
  );
}
