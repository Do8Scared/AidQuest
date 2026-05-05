import { cn } from "@/lib/utils";
import { AlertTriangle, Radio } from "lucide-react";
import CPRScene from "./scenes/CPRScene";
import FireScene from "./scenes/FireScene";
import DefaultScene from "./scenes/DefaultScene";

interface SceneViewportProps {
  moduleId: string;
  scenarioTitle: string;
  scenarioSetting: string;
  step: number;
  hp: number;
  lastAnswerCorrect: boolean | null;
  selectedAnswer: number | null;
}

export default function SceneViewport({
  moduleId,
  scenarioTitle,
  scenarioSetting,
  step,
  hp,
  lastAnswerCorrect,
  selectedAnswer,
}: SceneViewportProps) {
  const renderScene = () => {
    switch (moduleId) {
      case "cpr-basics":
        return <CPRScene step={step} hp={hp} lastAnswerCorrect={lastAnswerCorrect} />;
      case "fire-safety":
        return <FireScene step={step} hp={hp} lastAnswerCorrect={lastAnswerCorrect} />;
      default:
        return <DefaultScene step={step} hp={hp} lastAnswerCorrect={lastAnswerCorrect} />;
    }
  };

  return (
    <div className="scene-panel relative flex flex-col h-full overflow-hidden scanlines">
      {/* Scenario Info Bar */}
      <div
        className="px-5 py-3 border-b shrink-0 flex items-center gap-3"
        style={{
          borderColor: "rgba(230, 57, 70, 0.2)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-danger animate-pulse" />
          <span
            className="font-display font-bold uppercase tracking-widest text-[10px]"
            style={{ color: "hsl(var(--color-warning))" }}
          >
            LIVE SCENARIO
          </span>
        </div>
        <div className="h-3 w-px bg-border/40" />
        <span className="font-display font-bold uppercase tracking-wider text-xs text-foreground truncate">
          {scenarioTitle}
        </span>
      </div>

      {/* Scene Animation Area */}
      <div className="flex-1 relative">{renderScene()}</div>

      {/* Scenario Setting Brief */}
      <div
        className="px-5 py-4 border-t shrink-0"
        style={{
          borderColor: "rgba(136, 146, 164, 0.15)",
          background: "rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {scenarioSetting}
          </p>
        </div>
      </div>

      {/* Feedback flash overlay */}
      {selectedAnswer !== null && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none animate-fade-in",
            lastAnswerCorrect
              ? "bg-success/5"
              : "bg-danger/5"
          )}
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
}
