interface SceneProps {
  step: number;
  hp: number;
  lastAnswerCorrect: boolean | null;
}

export default function CPRScene({ step, hp, lastAnswerCorrect }: SceneProps) {
  const statusText = lastAnswerCorrect === null ? "READY" : lastAnswerCorrect ? "COMPRESSED CORRECTLY" : "REASSESS";
  const heartColor = hp > 50 ? "#2ec4b6" : hp > 20 ? "#ffb703" : "#ff3352";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg" style={{ maxHeight: "280px" }}>
        <rect x="0" y="220" width="400" height="80" fill="#1a1825" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(136,146,164,0.2)" strokeWidth="1" />

        <g transform="translate(80, 220)">
          <rect x="0" y="-23" width="240" height="28" rx="14" fill="#151728" opacity="0.95" />
          <text x="120" y="0" textAnchor="middle" fontSize="10" fill="#ff9f1c" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" letterSpacing="1">
            {step === 0 ? "CHECK RESPONSE" : step === 1 ? "CALL FOR HELP" : step === 2 ? "START CPR" : "MONITOR VITALS"}
          </text>
        </g>

        <g transform="translate(200, 130)">
          <circle cx="0" cy="0" r="40" fill="rgba(255,78,80,0.18)" />
          <circle cx="0" cy="0" r="25" fill={heartColor} />
          <path d="M-12,-5 C-12,-22 8,-22 8,-5 C8,6 0,12 0,12 C0,12 -8,6 -8,-5 Z" fill="#fff" />
          <path d="M-10,6 Q0,18 10,6" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g transform="translate(190, 230)">
          <rect x="-90" y="-32" width="180" height="20" rx="10" fill="#111827" opacity="0.95" />
          <text x="0" y="-16" textAnchor="middle" fontSize="12" fill="#d4d4d8" fontFamily="Inter, sans-serif" fontWeight="700">
            PATIENT STATUS
          </text>
          <text x="0" y="0" textAnchor="middle" fontSize="10" fill="#a1a1aa" fontFamily="Inter, sans-serif">
            HP: {hp} • {statusText}
          </text>
        </g>
      </svg>
    </div>
  );
}
