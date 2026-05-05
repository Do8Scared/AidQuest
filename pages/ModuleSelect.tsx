import { useNavigate } from "react-router-dom";
import { Heart, Flame, Shield, Lock, ChevronRight, Star, Zap, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES, type Module, type Difficulty } from "@/data/modules";

const MODULE_ICONS: Record<string, React.ElementType> = {
  Heart,
  Flame,
  Shield,
  Bandage: Shield, // fallback
};

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; bg: string; border: string }> = {
  ROOKIE: {
    label: "Rookie",
    color: "#2ec4b6",
    bg: "rgba(46,196,182,0.15)",
    border: "rgba(46,196,182,0.5)",
  },
  TRAINED: {
    label: "Trained",
    color: "#ff9f1c",
    bg: "rgba(255,159,28,0.15)",
    border: "rgba(255,159,28,0.5)",
  },
  EXPERT: {
    label: "Expert",
    color: "#e63946",
    bg: "rgba(230,57,70,0.15)",
    border: "rgba(230,57,70,0.5)",
  },
};

function ModuleCard({ module }: { module: Module }) {
  const navigate = useNavigate();
  const Icon = MODULE_ICONS[module.icon] || Shield;
  const diff = DIFFICULTY_CONFIG[module.difficulty];

  return (
    <div
      onClick={() => !module.locked && navigate(`/situation-room/${module.id}`)}
      className={cn(
        "relative rounded border transition-all duration-200 p-6 flex flex-col gap-4",
        module.locked
          ? "module-card-locked cursor-not-allowed opacity-55"
          : "module-card-unlocked cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(230,57,70,0.2),0_0_0_1px_rgba(230,57,70,0.2)]"
      )}
      style={{
        background: "hsl(var(--color-surface))",
        borderColor: "rgba(136,146,164,0.15)",
      }}
    >
      {/* Lock overlay */}
      {module.locked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded">
          <div
            className="flex flex-col items-center gap-2 rounded-lg p-4"
            style={{ background: "rgba(10,14,26,0.6)" }}
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Complete prior modules
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded flex items-center justify-center"
          style={{ background: "hsl(var(--color-elevated))" }}
        >
          <Icon className="w-6 h-6 text-danger" strokeWidth={1.5} />
        </div>
        {/* Difficulty Badge */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
          style={{
            background: diff.bg,
            color: diff.color,
            border: `1px solid ${diff.border}`,
          }}
        >
          {diff.label}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display font-bold text-xl uppercase tracking-wide text-foreground leading-tight mb-1">
          {module.title}
        </h3>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          {module.subtitle}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "rgba(136,146,164,0.1)" }}>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-success" fill="currentColor" />
          <span className="text-xs font-bold text-success">{module.xpReward} XP</span>
          <span className="text-xs text-muted-foreground">reward</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{module.steps.length} questions</span>
        </div>
        {!module.locked && (
          <div className="flex items-center gap-1 text-xs font-bold text-danger">
            Deploy
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModuleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-background overflow-auto">
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b px-6 py-4 flex items-center gap-4"
        style={{
          background: "rgba(10,14,26,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(230,57,70,0.2)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </button>
        <div className="h-4 w-px bg-border/50" />
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-danger" fill="currentColor" />
          <span className="font-display font-bold text-base uppercase tracking-widest text-foreground">
            AidQuest
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-10">
          <p className="text-label mb-2">Training Command</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl uppercase text-foreground leading-none mb-3">
            Select Your Mission
          </h1>
          <p className="text-muted-foreground text-base max-w-lg">
            Each module is a high-stakes scenario simulation. Complete a mission to unlock
            your QR certification code.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* Certification Info */}
        <div
          className="mt-10 rounded border p-6"
          style={{
            background: "rgba(46,196,182,0.05)",
            borderColor: "rgba(46,196,182,0.2)",
          }}
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-base uppercase tracking-wide text-foreground mb-1">
                O2O Certification Pathway
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After completing a module with a passing score, the system generates a unique
                secure QR code. Take this code to an authorized Red Cross assessment center. An
                instructor will scan it, verify your digital score, and conduct a brief physical
                assessment before issuing your official certification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
