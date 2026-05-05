import { Heart, Zap, Clock, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface HUDProps {
  moduleTitle: string;
  hp: number;        // 0–100
  maxHp?: number;
  timer: number;     // seconds remaining
  xp: number;
  step: number;
  totalSteps: number;
  xpAnimating?: boolean;
}

export default function HUD({
  moduleTitle,
  hp,
  maxHp = 100,
  timer,
  xp,
  step,
  totalSteps,
  xpAnimating = false,
}: HUDProps) {
  const navigate = useNavigate();
  const hpPercent = Math.max(0, (hp / maxHp) * 100);
  const isCriticalHp = hp <= 25;
  const isCriticalTimer = timer <= 10;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0
      ? `${m}:${sec.toString().padStart(2, "0")}`
      : `${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="hud-panel sticky top-0 z-50 h-14 flex items-center px-4 gap-3 select-none">
      {/* Back button */}
      <button
        onClick={() => navigate("/modules")}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mr-2 shrink-0"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Exit</span>
      </button>

      {/* Module Title */}
      <div className="font-display font-bold uppercase tracking-widest text-foreground text-sm sm:text-base leading-none shrink-0 hidden md:block">
        {moduleTitle}
      </div>

      <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8">
        {/* Patient HP */}
        <div className="flex items-center gap-2">
          <Heart
            className={cn(
              "w-4 h-4 shrink-0",
              isCriticalHp
                ? "text-[#ff3352] animate-heartbeat"
                : "text-danger"
            )}
            fill="currentColor"
          />
          <div className="flex flex-col gap-0.5 min-w-[100px] sm:min-w-[140px]">
            <span className="text-label text-[9px] leading-none">PATIENT HP</span>
            <div
              className="h-2.5 rounded-sm overflow-hidden"
              style={{
                background: "rgba(230, 57, 70, 0.15)",
                border: "1px solid rgba(230, 57, 70, 0.35)",
              }}
            >
              <div
                className={cn("hp-bar-fill h-full", isCriticalHp && "animate-hp-pulse")}
                style={{
                  width: `${hpPercent}%`,
                  background: isCriticalHp
                    ? "linear-gradient(90deg, #ff3352, #ff6680)"
                    : "linear-gradient(90deg, #e63946, #ff6b75)",
                }}
              />
            </div>
          </div>
          <span
            className={cn(
              "font-display font-bold text-sm shrink-0",
              isCriticalHp ? "text-[#ff3352] animate-hp-pulse" : "text-danger"
            )}
          >
            {hp}
          </span>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-label text-[9px] leading-none flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            TIME
          </span>
          <span
            className={cn(
              "font-display font-bold text-xl leading-none tabular-nums",
              isCriticalTimer
                ? "text-danger animate-timer-critical"
                : "text-warning",
              isCriticalTimer && "drop-shadow-[0_0_8px_rgba(230,57,70,0.7)]"
            )}
          >
            {formatTime(timer)}
          </span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-success shrink-0" fill="currentColor" />
          <div className="flex flex-col gap-0.5">
            <span className="text-label text-[9px] leading-none">XP EARNED</span>
            <span
              className={cn(
                "font-display font-bold text-base leading-none text-success",
                xpAnimating && "animate-xp-pop"
              )}
            >
              +{xp}
            </span>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i < step
                ? "bg-success w-5"
                : i === step
                ? "bg-warning w-5"
                : "bg-muted w-3 opacity-50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
