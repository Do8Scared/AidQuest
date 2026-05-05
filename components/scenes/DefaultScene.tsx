interface SceneProps {
  step: number;
  hp: number;
  lastAnswerCorrect: boolean | null;
}

export default function DefaultScene({ step, hp }: SceneProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg" style={{ maxHeight: "260px" }}>
        {/* Simple construction site */}
        <rect x="0" y="220" width="400" height="80" fill="#1a1825" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(136,146,164,0.2)" strokeWidth="1" />
        {/* Barrier */}
        <rect x="50" y="180" width="300" height="15" rx="3" fill="#ff9f1c" opacity="0.7" />
        {/* Worker */}
        <g transform="translate(200, 185)">
          <rect x="-18" y="-50" width="36" height="55" rx="10" fill="#ff9f1c" />
          <circle cx="0" cy="-65" r="18" fill="#2a1f18" />
          <ellipse cx="0" cy="-80" rx="20" ry="8" fill="#ff9f1c" opacity="0.8" />
        </g>
        <g transform="translate(200, 30)">
          <rect x="-130" y="-16" width="260" height="28" rx="4" fill="rgba(20,24,36,0.85)" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#ff9f1c"
            fontFamily="Barlow Condensed, sans-serif" fontWeight="700" letterSpacing="1">
            {step === 0 ? "ASSESS THE SITUATION" : `STEP ${step + 1} — RESPOND`}
          </text>
        </g>
      </svg>
    </div>
  );
}
