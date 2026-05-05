import { useEffect, useState } from "react";

interface SceneProps {
  step: number;
  hp: number;
  lastAnswerCorrect: boolean | null;
}

// Animated flame component (CSS-driven)
function Flame({ x, y, size = 1, delay = 0 }: { x: number; y: number; size?: number; delay?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      <ellipse cx="0" cy="0" rx="8" ry="14"
        fill="rgba(255,100,0,0.8)"
        style={{ animation: `flicker ${1.2 + delay * 0.3}s linear infinite` }}
      />
      <ellipse cx="-3" cy="4" rx="5" ry="10"
        fill="rgba(255,60,0,0.7)"
        style={{ animation: `flicker ${0.9 + delay * 0.2}s linear infinite` }}
      />
      <ellipse cx="3" cy="2" rx="4" ry="9"
        fill="rgba(255,180,0,0.6)"
        style={{ animation: `flicker ${1.5 + delay * 0.4}s linear infinite` }}
      />
    </g>
  );
}

export default function FireScene({ step, hp, lastAnswerCorrect }: SceneProps) {
  const [smokeOffset, setSmokeOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSmokeOffset((p) => (p + 1) % 60);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const fireIntensity = Math.max(0.2, 1 - step * 0.15); // fire decreases as steps progress correctly
  const smokeOpacity = Math.max(0.1, lastAnswerCorrect === false ? 0.7 : 0.35);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Orange glow background for fire */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, rgba(255,100,0,${0.15 * fireIntensity}) 0%, transparent 60%)`,
        }}
      />

      <svg
        viewBox="0 0 400 320"
        className="w-full h-full max-w-lg"
        style={{ maxHeight: "280px" }}
      >
        {/* Building floor / corridor */}
        <rect x="0" y="240" width="400" height="80" fill="#1a1825" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="rgba(136,146,164,0.2)" strokeWidth="1" />

        {/* Left wall */}
        <rect x="0" y="40" width="20" height="200" fill="#0d1120" />
        {/* Right wall */}
        <rect x="380" y="40" width="20" height="200" fill="#0d1120" />
        {/* Ceiling */}
        <rect x="0" y="30" width="400" height="20" fill="#0d1120" />

        {/* Door to corridor */}
        <rect x="310" y="100" width="70" height="140" rx="4" fill="#12101e" stroke="rgba(136,146,164,0.3)" strokeWidth="1.5" />
        {/* Door handle */}
        <circle cx="325" cy="172" r="5" fill="#8892a4" />
        {/* Door ajar line */}
        {step >= 1 && (
          <line x1="310" y1="100" x2="295" y2="240" stroke="rgba(136,146,164,0.2)" strokeWidth="1" strokeDasharray="4,4" />
        )}

        {/* Smoke wisps coming under door */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx={315 + i * 15}
            cy={235 - (smokeOffset + i * 15) % 80}
            rx={8 + i * 3}
            ry={5 + i * 2}
            fill="#8892a4"
            opacity={smokeOpacity - i * 0.05}
            style={{ transition: "opacity 0.5s" }}
          />
        ))}

        {/* Trash bin fire */}
        {step >= 2 && (
          <g transform="translate(100, 195)">
            {/* Bin */}
            <rect x="-18" y="0" width="36" height="40" rx="3" fill="#2a2a3a" stroke="rgba(136,146,164,0.3)" strokeWidth="1" />
            <rect x="-20" y="-3" width="40" height="8" rx="2" fill="#2a2a3a" />
            {/* Flames from bin */}
            <Flame x={-8} y={-12 - Math.sin(smokeOffset * 0.1) * 3} size={1.1} delay={0} />
            <Flame x={8} y={-8 - Math.cos(smokeOffset * 0.12) * 2} size={0.9} delay={0.3} />
            <Flame x={0} y={-18 - Math.sin(smokeOffset * 0.08) * 4} size={1.3} delay={0.1} />
            {/* Glow */}
            <ellipse cx="0" cy="5" rx="30" ry="8" fill="rgba(255,100,0,0.15)" />
          </g>
        )}

        {/* Person figure */}
        <g transform={`translate(${step >= 1 ? 190 : 210}, 185)`} style={{ transition: "transform 0.6s ease" }}>
          {/* Body */}
          <rect x="-18" y="-50" width="36" height="55" rx="10" fill={step >= 1 ? "#1e2a40" : "#e63946"} />
          {/* Head */}
          <circle cx="0" cy="-65" r="18" fill="#2a1f18" />
          {/* Arms */}
          {step >= 1 ? (
            // Crouching / crawling posture
            <>
              <rect x="-35" y="-15" width="30" height="14" rx="6" fill="#1e2a40" transform="rotate(-30, -20, -8)" />
              <rect x="5" y="-15" width="30" height="14" rx="6" fill="#1e2a40" transform="rotate(30, 20, -8)" />
            </>
          ) : (
            // Standing
            <>
              <rect x="-32" y="-45" width="16" height="40" rx="7" fill="#e63946" />
              <rect x="16" y="-45" width="16" height="40" rx="7" fill="#e63946" />
            </>
          )}
        </g>

        {/* Fire extinguisher */}
        {step >= 2 && (
          <g transform="translate(55, 175)">
            <rect x="-10" y="-40" width="20" height="50" rx="8" fill="#e63946" />
            <rect x="-8" y="-52" width="16" height="14" rx="4" fill="#c4303c" />
            <rect x="-3" y="-58" width="6" height="8" rx="2" fill="#8892a4" />
            <text x="0" y="-15" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)" fontWeight="bold">FIRE</text>
          </g>
        )}

        {/* Step text overlay */}
        <g transform="translate(200, 30)">
          <rect x="-140" y="-16" width="280" height="28" rx="4" fill="rgba(20,24,36,0.85)" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#ff9f1c" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" letterSpacing="1">
            {step === 0 && "ALARM TRIGGERED — SMOKE UNDER DOOR"}
            {step === 1 && "HALLWAY SMOKY — EVACUATION ROUTE"}
            {step === 2 && "SMALL FIRE CONTAINED — DECISION POINT"}
            {step === 3 && "P.A.S.S. TECHNIQUE — EXTINGUISHING"}
            {step === 4 && "EXITING BUILDING — HEADCOUNT"}
          </text>
        </g>

        {/* Warning flashing border when HP critical */}
        {hp <= 30 && (
          <rect
            x="2" y="32" width="396" height="208"
            rx="0" fill="none"
            stroke="rgba(230,57,70,0.5)"
            strokeWidth="3"
            strokeDasharray="8,6"
            style={{ animation: "pulse-border 1s ease-in-out infinite" }}
          />
        )}

        {/* Exit sign */}
        <g transform="translate(355, 70)">
          <rect x="-22" y="-14" width="44" height="24" rx="3" fill="rgba(46,196,182,0.2)" stroke="rgba(46,196,182,0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#2ec4b6" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" letterSpacing="1">EXIT</text>
        </g>
      </svg>
    </div>
  );
}
