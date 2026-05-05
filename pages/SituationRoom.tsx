import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HUD from "@/components/HUB";
import DecisionConsole from "@/components/DecisionConsole";
import SceneViewport from "@/components/SceneViewport";
import Confetti from "@/components/Confetti";
import { MODULES } from "@/data/modules";

const INITIAL_HP = 100;
const INITIAL_TIME = 90;

export default function SituationRoom() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const module = MODULES.find((m) => m.id === moduleId);

  const [stepIndex, setStepIndex] = useState(0);
  const [hp, setHp] = useState(INITIAL_HP);
  const [xp, setXp] = useState(0);
  const [timer, setTimer] = useState(INITIAL_TIME);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [xpAnimating, setXpAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextStepRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to hold latest state for callbacks
  const xpRef = useRef(xp);
  const hpRef = useRef(hp);
  useEffect(() => { xpRef.current = xp; }, [xp]);
  useEffect(() => { hpRef.current = hp; }, [hp]);

  useEffect(() => {
    if (!module || module.locked) navigate("/modules");
  }, [module, navigate]);

  const advanceToNext = useCallback(
    (currentStep: number) => {
      if (!module) return;
      const isLastStep = currentStep >= module.steps.length - 1;
      if (isLastStep) {
        navigate("/after-action", {
          state: {
            moduleId,
            moduleTitle: module.title,
            xp: xpRef.current,
            hp: hpRef.current,
            totalSteps: module.steps.length,
            passed: hpRef.current > 0,
          },
        });
      } else {
        setStepIndex((i) => i + 1);
        setSelectedIndex(null);
        setLastAnswerCorrect(null);
        setLocked(false);
        setTimerActive(true);
        setTimer(INITIAL_TIME);
      }
    },
    [module, moduleId, navigate]
  );

  // Timer countdown
  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  // Handle time expiry
  useEffect(() => {
    if (timer === 0 && timerActive) {
      setTimerActive(false);
      setLocked(true);
      setHp((prev) => Math.max(0, prev - 30));
      nextStepRef.current = setTimeout(() => {
        advanceToNext(stepIndex);
      }, 2500);
    }
  }, [timer, timerActive, stepIndex, advanceToNext]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (locked || !module) return;
      const step = module.steps[stepIndex];
      const isCorrect = index === step.correctIndex;

      if (timerRef.current) clearInterval(timerRef.current);
      setTimerActive(false);
      setSelectedIndex(index);
      setLastAnswerCorrect(isCorrect);
      setLocked(true);

      if (isCorrect) {
        const gained = step.xpReward;
        setXp((prev) => prev + gained);
        setXpAnimating(true);
        setTimeout(() => setXpAnimating(false), 400);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      } else {
        setHp((prev) => Math.max(0, prev - step.hpLoss));
      }

      nextStepRef.current = setTimeout(() => {
        advanceToNext(stepIndex);
      }, 2800);
    },
    [locked, module, stepIndex, advanceToNext]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (nextStepRef.current) clearTimeout(nextStepRef.current);
    };
  }, []);

  if (!module) return null;

  const currentStep = module.steps[stepIndex];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <Confetti active={showConfetti} />

      <HUD
        moduleTitle={module.title}
        hp={hp}
        timer={timer}
        xp={xp}
        step={stepIndex}
        totalSteps={module.steps.length}
        xpAnimating={xpAnimating}
      />

      {/* Split Screen — desktop */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Scene Viewport */}
        <div className="hidden md:flex flex-col w-[58%] min-h-0">
          <SceneViewport
            moduleId={module.id}
            scenarioTitle={module.scenarioTitle}
            scenarioSetting={module.scenarioSetting}
            step={stepIndex}
            hp={hp}
            lastAnswerCorrect={lastAnswerCorrect}
            selectedAnswer={selectedIndex}
          />
        </div>

        {/* Decision Console */}
        <div className="flex-1 md:w-[42%] flex flex-col min-h-0 overflow-y-auto">
          <DecisionConsole
            narrative={currentStep.narrative}
            choices={currentStep.choices}
            selectedIndex={selectedIndex}
            correctIndex={currentStep.correctIndex}
            explanation={currentStep.explanation}
            onSelect={handleAnswer}
            locked={locked}
            stepNumber={stepIndex + 1}
            totalSteps={module.steps.length}
          />
        </div>
      </div>

      {/* Mobile Scene strip */}
      <div
        className="md:hidden border-t shrink-0"
        style={{ borderColor: "rgba(136,146,164,0.15)", height: "180px" }}
      >
        <SceneViewport
          moduleId={module.id}
          scenarioTitle={module.scenarioTitle}
          scenarioSetting={module.scenarioSetting}
          step={stepIndex}
          hp={hp}
          lastAnswerCorrect={lastAnswerCorrect}
          selectedAnswer={selectedIndex}
        />
      </div>
    </div>
  );
}
