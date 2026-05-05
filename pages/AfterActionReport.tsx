import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  QrCode,
  Award,
  Zap,
  Heart,
  RotateCcw,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Confetti from "@/components/Confetti";

interface ReportState {
  moduleId: string;
  moduleTitle: string;
  xp: number;
  hp: number;
  totalSteps: number;
  passed: boolean;
}

// Simple deterministic QR code placeholder (SVG grid)
function QRCodeDisplay({ code }: { code: string }) {
  // Generate a pseudo-random grid from the code string
  const size = 12;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const charCode = code.charCodeAt(i % code.length);
    return ((charCode * (i + 7) * 13) % 17) > 7;
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="p-4 rounded"
        style={{ background: "#f0f4ff" }}
      >
        <svg width="160" height="160" viewBox={`0 0 ${size} ${size}`}>
          {/* Quiet zone + finder patterns */}
          {/* Top-left finder */}
          <rect x="0" y="0" width="3" height="3" fill="#0a0e1a" />
          <rect x="0.5" y="0.5" width="2" height="2" fill="#f0f4ff" />
          <rect x="1" y="1" width="1" height="1" fill="#0a0e1a" />
          {/* Top-right finder */}
          <rect x="9" y="0" width="3" height="3" fill="#0a0e1a" />
          <rect x="9.5" y="0.5" width="2" height="2" fill="#f0f4ff" />
          <rect x="10" y="1" width="1" height="1" fill="#0a0e1a" />
          {/* Bottom-left finder */}
          <rect x="0" y="9" width="3" height="3" fill="#0a0e1a" />
          <rect x="0.5" y="9.5" width="2" height="2" fill="#f0f4ff" />
          <rect x="1" y="10" width="1" height="1" fill="#0a0e1a" />
          {/* Data cells */}
          {cells.map((on, i) => {
            const x = i % size;
            const y = Math.floor(i / size);
            // Skip finder pattern areas
            const inFinderTL = x <= 2 && y <= 2;
            const inFinderTR = x >= 9 && y <= 2;
            const inFinderBL = x <= 2 && y >= 9;
            if (inFinderTL || inFinderTR || inFinderBL) return null;
            return on ? (
              <rect key={i} x={x} y={y} width="0.9" height="0.9" fill="#0a0e1a" />
            ) : null;
          })}
        </svg>
      </div>
      <p className="text-xs font-mono text-muted-foreground tracking-widest">{code}</p>
    </div>
  );
}

export default function AfterActionReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReportState | null;
  const [showConfetti, setShowConfetti] = useState(false);
  const [certCode] = useState(() => {
    // Generate a pseudo-certification code
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 12 }, (_, i) => {
      if (i === 4 || i === 8) return "-";
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  });

  useEffect(() => {
    if (!state) {
      navigate("/modules");
      return;
    }
    if (state.passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [state, navigate]);

  if (!state) return null;

  const accuracy = Math.round((state.hp / 100) * 100);
  const grade =
    accuracy >= 80 ? "S" : accuracy >= 60 ? "A" : accuracy >= 40 ? "B" : "C";
  const gradeColor =
    grade === "S"
      ? "#2ec4b6"
      : grade === "A"
      ? "#ff9f1c"
      : grade === "B"
      ? "#e63946"
      : "#8892a4";

  return (
    <div className="min-h-full bg-background overflow-auto">
      <Confetti active={showConfetti} />

      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b px-6 py-4 flex items-center gap-3"
        style={{
          background: "rgba(10,14,26,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(230,57,70,0.2)",
        }}
      >
        <Heart className="w-4 h-4 text-danger" fill="currentColor" />
        <span className="font-display font-bold text-base uppercase tracking-widest text-foreground">
          AidQuest
        </span>
        <div className="h-4 w-px bg-border/50 ml-1" />
        <span className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">
          After-Action Report
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Result Banner */}
        <div
          className="rounded border p-6 mb-8 text-center animate-fade-in-up"
          style={{
            background: state.passed
              ? "rgba(46,196,182,0.08)"
              : "rgba(230,57,70,0.08)",
            borderColor: state.passed
              ? "rgba(46,196,182,0.3)"
              : "rgba(230,57,70,0.3)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            {state.passed ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : (
              <XCircle className="w-8 h-8 text-danger" />
            )}
            <span
              className="font-display font-extrabold text-3xl uppercase tracking-wide"
              style={{ color: state.passed ? "#2ec4b6" : "#e63946" }}
            >
              {state.passed ? "Mission Complete" : "Mission Failed"}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {state.passed
              ? `Outstanding response in the ${state.moduleTitle} scenario. Certification pathway unlocked.`
              : `Your patient deteriorated under the pressure. Review protocols and redeploy.`}
          </p>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Grade */}
          <div
            className="rounded border p-4 flex flex-col items-center gap-2 animate-fade-in-up"
            style={{
              background: "hsl(var(--color-surface))",
              borderColor: "rgba(136,146,164,0.15)",
            }}
          >
            <span className="text-label text-[9px]">Grade</span>
            <span
              className="font-display font-extrabold text-5xl leading-none"
              style={{ color: gradeColor }}
            >
              {grade}
            </span>
          </div>
          {/* XP */}
          <div
            className="rounded border p-4 flex flex-col items-center gap-2 animate-fade-in-up"
            style={{
              background: "hsl(var(--color-surface))",
              borderColor: "rgba(136,146,164,0.15)",
            }}
          >
            <span className="text-label text-[9px]">XP Earned</span>
            <div className="flex items-center gap-1">
              <Zap className="w-5 h-5 text-success" fill="currentColor" />
              <span className="font-display font-extrabold text-3xl text-success leading-none">
                +{state.xp}
              </span>
            </div>
          </div>
          {/* HP Remaining */}
          <div
            className="rounded border p-4 flex flex-col items-center gap-2 animate-fade-in-up"
            style={{
              background: "hsl(var(--color-surface))",
              borderColor: "rgba(136,146,164,0.15)",
            }}
          >
            <span className="text-label text-[9px]">HP Remaining</span>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-danger" fill="currentColor" />
              <span className="font-display font-extrabold text-3xl text-danger leading-none">
                {state.hp}
              </span>
            </div>
          </div>
        </div>

        {/* Certification QR (only if passed) */}
        {state.passed && (
          <div
            className="rounded border p-6 mb-8 animate-fade-in-up"
            style={{
              background: "rgba(46,196,182,0.05)",
              borderColor: "rgba(46,196,182,0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-success" />
              <span className="font-display font-bold text-base uppercase tracking-wide text-foreground">
                Certification QR Code
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <QRCodeDisplay code={certCode} />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Present this QR code at your nearest authorized Red Cross assessment
                  center. An instructor will scan it to verify your online score and
                  conduct a brief physical test.
                </p>
                <div className="flex flex-col gap-2 text-xs">
                  {[
                    "Module: " + state.moduleTitle,
                    "Score: " + accuracy + "% accuracy",
                    "XP: +" + state.xp + " points",
                    "Valid for: 30 days",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shield badge display */}
        {state.passed && (
          <div
            className="rounded border p-4 mb-8 flex items-center gap-4 animate-fade-in-up"
            style={{
              background: "rgba(255,159,28,0.05)",
              borderColor: "rgba(255,159,28,0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded flex items-center justify-center shrink-0"
              style={{ background: "rgba(255,159,28,0.15)" }}
            >
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="font-display font-bold text-sm uppercase tracking-wide text-foreground">
                Badge Unlocked: {state.moduleTitle} Responder
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Added to your certification profile
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/situation-room/${state.moduleId}`)}
            className="flex-1 flex items-center justify-center gap-2 rounded border py-3 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground hover:border-foreground/30"
            style={{ borderColor: "rgba(136,146,164,0.3)" }}
          >
            <RotateCcw className="w-4 h-4" />
            Replay Mission
          </button>
          <button
            onClick={() => navigate("/modules")}
            className="btn-chamfer flex-1 flex items-center justify-center gap-2 py-3 font-display font-bold text-sm uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5"
            style={{
              background: "hsl(var(--color-primary-500))",
              boxShadow: "0 4px 20px rgba(230,57,70,0.35)",
            }}
          >
            Next Mission
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
