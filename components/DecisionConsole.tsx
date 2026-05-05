import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Choice } from "@/data/modules";

interface DecisionConsoleProps {
  narrative: string;
  choices: Choice[];
  selectedIndex: number | null;
  correctIndex: number;
  explanation: string;
  onSelect: (index: number) => void;
  locked: boolean;
  stepNumber: number;
  totalSteps: number;
}

const OPTION_COLORS = ["A", "B", "C", "D"];

export default function DecisionConsole({
  narrative,
  choices,
  selectedIndex,
  correctIndex,
  explanation,
  onSelect,
  locked,
  stepNumber,
  totalSteps,
}: DecisionConsoleProps) {
  const getCardState = (index: number) => {
    if (selectedIndex === null) return "default";
    if (index === correctIndex) return "correct";
    if (index === selectedIndex) return "wrong";
    return "spent";
  };

  return (
    <div className="console-panel flex flex-col h-full overflow-y-auto">
      {/* Console Header */}
      <div
        className="px-5 py-4 border-b shrink-0"
        style={{ borderColor: "rgba(136, 146, 164, 0.15)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-display font-bold uppercase tracking-widest text-xs"
            style={{ color: "hsl(var(--color-warning))" }}
          >
            Decision Console
          </span>
          <span className="text-xs text-muted-foreground font-bold tabular-nums">
            STEP {stepNumber}/{totalSteps}
          </span>
        </div>

        {/* Narrative */}
        <p className="text-foreground font-medium text-sm leading-relaxed">
          {narrative}
        </p>
      </div>

      {/* Answer Choices */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {choices.map((choice, index) => {
          const state = getCardState(index);

          return (
            <button
              key={choice.id}
              onClick={() => !locked && onSelect(index)}
              disabled={locked}
              className={cn(
                "answer-card w-full text-left rounded flex items-start gap-3 p-4",
                "bg-card border border-border/40",
                "transition-all duration-150",
                state === "default" && !locked && "cursor-pointer hover:bg-surface-elevated",
                state === "correct" && "correct bg-[rgba(46,196,182,0.12)] border-success text-success",
                state === "wrong" && "wrong bg-[rgba(230,57,70,0.12)] border-danger text-danger",
                state === "spent" && "opacity-35 pointer-events-none",
                locked && state === "default" && "opacity-40 pointer-events-none"
              )}
            >
              {/* Option Badge */}
              <div
                className={cn(
                  "shrink-0 w-7 h-7 rounded flex items-center justify-center font-bold text-xs transition-colors",
                  state === "default" && "bg-surface-elevated text-muted-foreground",
                  state === "correct" && "bg-success text-[#0a0e1a]",
                  state === "wrong" && "bg-danger text-foreground",
                  state === "spent" && "bg-surface-elevated text-muted-foreground"
                )}
              >
                {choice.label}
              </div>

              {/* Answer Text */}
              <span
                className={cn(
                  "flex-1 text-sm leading-relaxed pt-0.5",
                  state === "default" && "text-foreground",
                  state === "correct" && "text-success font-semibold",
                  state === "wrong" && "text-danger font-semibold",
                  state === "spent" && "text-muted-foreground"
                )}
              >
                {choice.text}
              </span>

              {/* Feedback Icon */}
              {state === "correct" && (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              )}
              {state === "wrong" && (
                <XCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation panel (revealed after answer) */}
      {selectedIndex !== null && (
        <div
          className="mx-4 mb-4 rounded p-4 border animate-fade-in-up"
          style={{
            background:
              selectedIndex === correctIndex
                ? "rgba(46, 196, 182, 0.08)"
                : "rgba(230, 57, 70, 0.08)",
            borderColor:
              selectedIndex === correctIndex
                ? "rgba(46, 196, 182, 0.3)"
                : "rgba(230, 57, 70, 0.3)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedIndex === correctIndex ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <XCircle className="w-4 h-4 text-danger" />
            )}
            <span
              className={cn(
                "font-display font-bold uppercase tracking-wider text-xs",
                selectedIndex === correctIndex ? "text-success" : "text-danger"
              )}
            >
              {selectedIndex === correctIndex ? "Correct Protocol" : "Wrong Call — Patient Deteriorating"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
