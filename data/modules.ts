export type Difficulty = "ROOKIE" | "TRAINED" | "EXPERT";

export interface ScenarioStep {
  id: number;
  narrative: string;
  choices: Choice[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
  hpLoss: number; // HP lost on wrong answer (0-100)
}

export interface Choice {
  id: string;
  label: string;
  text: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  xpReward: number;
  totalXP: number;
  locked: boolean;
  icon: string; // lucide icon name
  scenarioTitle: string;
  scenarioSetting: string;
  steps: ScenarioStep[];
  certificationCode?: string;
}

export const MODULES: Module[] = [
  {
    id: "cpr-basics",
    title: "CPR Protocol",
    subtitle: "Cardiac Emergency Response",
    description:
      "A victim collapses in front of you. Every second counts. Learn the CAB protocol and deliver chest compressions that save lives.",
    difficulty: "ROOKIE",
    xpReward: 350,
    totalXP: 500,
    locked: false,
    icon: "Heart",
    scenarioTitle: "CARDIAC ARREST – DOWNTOWN PLAZA",
    scenarioSetting:
      "A 52-year-old man suddenly collapses in front of you at a busy downtown plaza. Bystanders are frozen. You are the first to respond.",
    steps: [
      {
        id: 1,
        narrative:
          "A man collapses motionless on the pavement. He is unresponsive when you call out. What is your FIRST action?",
        choices: [
          { id: "A", label: "A", text: "Begin chest compressions immediately" },
          {
            id: "B",
            label: "B",
            text: "Check the scene for safety, then tap shoulders and shout to assess responsiveness",
          },
          { id: "C", label: "C", text: "Give two rescue breaths first" },
          { id: "D", label: "D", text: "Search for a defibrillator (AED)" },
        ],
        correctIndex: 1,
        explanation:
          "Always ensure scene safety first, then assess responsiveness. Tap shoulders firmly and shout. This prevents injury to you and confirms unresponsiveness before calling for help.",
        xpReward: 50,
        hpLoss: 25,
      },
      {
        id: 2,
        narrative:
          "The victim is unresponsive and not breathing normally. You have confirmed it's safe. What do you do NEXT?",
        choices: [
          { id: "A", label: "A", text: "Start rescue breathing immediately" },
          {
            id: "B",
            label: "B",
            text: "Call 911 (or have a bystander call) and request an AED",
          },
          { id: "C", label: "C", text: "Check for a pulse for 60 seconds" },
          { id: "D", label: "D", text: "Place in recovery position" },
        ],
        correctIndex: 1,
        explanation:
          "Activate EMS immediately — call 911 or direct a bystander to call while you prepare to begin CPR. Getting professional help en route is critical.",
        xpReward: 50,
        hpLoss: 20,
      },
      {
        id: 3,
        narrative:
          "Emergency services are on their way. What is the correct hand placement for adult chest compressions?",
        choices: [
          { id: "A", label: "A", text: "Both hands on the upper chest near the neck" },
          {
            id: "B",
            label: "B",
            text: "Heel of one hand on the lower half of the sternum, other hand interlaced on top",
          },
          { id: "C", label: "C", text: "One hand over the left breast" },
          { id: "D", label: "D", text: "Two fingers on the center of the chest" },
        ],
        correctIndex: 1,
        explanation:
          "Place the heel of your hand on the center of the chest (lower sternum), interlace fingers, keep arms straight. This position allows effective compression depth.",
        xpReward: 50,
        hpLoss: 20,
      },
      {
        id: 4,
        narrative:
          "You begin compressions. What is the target rate and depth for adult CPR?",
        choices: [
          { id: "A", label: "A", text: "60 compressions/min at 1 inch deep" },
          {
            id: "B",
            label: "B",
            text: "100–120 compressions/min at 2–2.4 inches deep",
          },
          { id: "C", label: "C", text: "80 compressions/min at 3 inches deep" },
          { id: "D", label: "D", text: "100 compressions/min at 1.5 inches deep" },
        ],
        correctIndex: 1,
        explanation:
          "The AHA recommends 100–120 compressions per minute at a depth of 2 to 2.4 inches (5–6 cm). This is roughly the tempo of the song 'Stayin' Alive'.",
        xpReward: 75,
        hpLoss: 25,
      },
      {
        id: 5,
        narrative:
          "An AED arrives. You power it on. It says 'Analyzing rhythm — do not touch patient.' What do you do?",
        choices: [
          { id: "A", label: "A", text: "Continue chest compressions while it analyzes" },
          {
            id: "B",
            label: "B",
            text: "Ensure nobody is touching the patient and stand clear",
          },
          { id: "C", label: "C", text: "Deliver a shock immediately before analysis" },
          { id: "D", label: "D", text: "Remove AED pads and check pulse first" },
        ],
        correctIndex: 1,
        explanation:
          "Stand clear and ensure no one is touching the patient during AED analysis. Movement can disrupt the reading. Always follow AED voice prompts exactly.",
        xpReward: 75,
        hpLoss: 30,
      },
    ],
  },
  {
    id: "fire-safety",
    title: "Fire Safety",
    subtitle: "Emergency Evacuation Protocol",
    description:
      "A fire breaks out in the building. Smoke fills the corridor. Make the right calls under pressure to save yourself and others.",
    difficulty: "TRAINED",
    xpReward: 450,
    totalXP: 600,
    locked: false,
    icon: "Flame",
    scenarioTitle: "BUILDING FIRE – OFFICE BLOCK, 4TH FLOOR",
    scenarioSetting:
      "You're working late on the 4th floor when the fire alarm sounds and you detect smoke in the corridor. Other employees are looking to you for guidance.",
    steps: [
      {
        id: 1,
        narrative:
          "The fire alarm sounds and you see smoke under the door to the hallway. What is your FIRST priority?",
        choices: [
          { id: "A", label: "A", text: "Open the door and run to the stairwell" },
          {
            id: "B",
            label: "B",
            text: "Feel the door with the back of your hand before opening — if hot, do not open",
          },
          { id: "C", label: "C", text: "Use the elevator to evacuate quickly" },
          { id: "D", label: "D", text: "Try to locate and extinguish the fire source" },
        ],
        correctIndex: 1,
        explanation:
          "NEVER touch a door handle directly — use the back of your hand to check for heat. A hot door means fire is right outside. Opening it would cause a backdraft, fueling the fire.",
        xpReward: 60,
        hpLoss: 30,
      },
      {
        id: 2,
        narrative:
          "The door is cool. You open it carefully and see a smoke-filled hallway. You must evacuate. What is the safest posture?",
        choices: [
          { id: "A", label: "A", text: "Stand upright and walk briskly" },
          { id: "B", label: "B", text: "Cover face with shirt and run at full speed" },
          {
            id: "C",
            label: "C",
            text: "Crawl low under the smoke where air is cleaner",
          },
          { id: "D", label: "D", text: "Breathe deeply to prepare for the smoke" },
        ],
        correctIndex: 2,
        explanation:
          "Smoke and toxic gases rise — air near the floor is cleaner and cooler. Crawl on hands and knees to stay below the smoke layer during evacuation.",
        xpReward: 60,
        hpLoss: 25,
      },
      {
        id: 3,
        narrative:
          "You reach the stairwell. You have a fire extinguisher nearby. The fire is small and contained to a trash bin. Should you attempt to extinguish it?",
        choices: [
          {
            id: "A",
            label: "A",
            text: "Yes — always try to extinguish any fire if an extinguisher is available",
          },
          {
            id: "B",
            label: "B",
            text: "Only if the fire is small, you have an exit behind you, and you've already called 911",
          },
          {
            id: "C",
            label: "C",
            text: "No — never use an extinguisher; always evacuate",
          },
          {
            id: "D",
            label: "D",
            text: "Only trained firefighters should ever touch an extinguisher",
          },
        ],
        correctIndex: 1,
        explanation:
          "You may attempt to fight a small, contained fire ONLY if: the fire is small, you have an escape route behind you, you've already activated the alarm and called 911, and you know how to use the extinguisher (PASS technique).",
        xpReward: 70,
        hpLoss: 20,
      },
      {
        id: 4,
        narrative:
          "You use the extinguisher. What does P.A.S.S. stand for?",
        choices: [
          {
            id: "A",
            label: "A",
            text: "Pull, Aim, Squeeze, Sweep",
          },
          {
            id: "B",
            label: "B",
            text: "Point, Activate, Spray, Stop",
          },
          {
            id: "C",
            label: "C",
            text: "Prepare, Aim, Stand, Spray",
          },
          {
            id: "D",
            label: "D",
            text: "Pull, Attack, Suppress, Secure",
          },
        ],
        correctIndex: 0,
        explanation:
          "P.A.S.S. = Pull the pin, Aim at the base of the fire (not the flames), Squeeze the handle, Sweep side to side. Always aim at the fuel source at the base.",
        xpReward: 70,
        hpLoss: 20,
      },
      {
        id: 5,
        narrative:
          "You make it to the emergency exit. You realize a colleague is missing. What should you do?",
        choices: [
          {
            id: "A",
            label: "A",
            text: "Re-enter the building immediately to search for them",
          },
          {
            id: "B",
            label: "B",
            text: "Report the missing person to the incident commander or firefighters outside — never re-enter",
          },
          {
            id: "C",
            label: "C",
            text: "Wait at the exit and shout their name into the building",
          },
          {
            id: "D",
            label: "D",
            text: "Call their mobile phone first before alerting firefighters",
          },
        ],
        correctIndex: 1,
        explanation:
          "Never re-enter a burning building. Report missing persons immediately to the incident commander or firefighters. Trained personnel with proper equipment handle search and rescue.",
        xpReward: 90,
        hpLoss: 35,
      },
    ],
  },
  {
    id: "first-aid-wounds",
    title: "Wound Care",
    subtitle: "Trauma First Response",
    description:
      "A serious laceration. Bleeding won't stop. Apply your knowledge of hemorrhage control, shock prevention, and wound management.",
    difficulty: "EXPERT",
    xpReward: 550,
    totalXP: 700,
    locked: true,
    icon: "Bandage",
    scenarioTitle: "SEVERE LACERATION – CONSTRUCTION SITE",
    scenarioSetting:
      "A construction worker suffers a deep laceration on their forearm from power tool equipment. There is significant bleeding. You are the site first aider.",
    steps: [
      {
        id: 1,
        narrative:
          "The worker has a deep, actively bleeding wound on their forearm. What is your immediate priority?",
        choices: [
          { id: "A", label: "A", text: "Clean the wound with antiseptic immediately" },
          {
            id: "B",
            label: "B",
            text: "Apply firm, direct pressure to the wound with a clean cloth",
          },
          { id: "C", label: "C", text: "Elevate the arm above heart level and wait" },
          { id: "D", label: "D", text: "Apply a tourniquet before doing anything else" },
        ],
        correctIndex: 1,
        explanation:
          "Direct pressure is the first and most effective method to control bleeding. Press firmly with a clean cloth or bandage without removing it once applied.",
        xpReward: 80,
        hpLoss: 30,
      },
    ],
  },
];

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "ROOKIE":
      return "success";
    case "TRAINED":
      return "warning";
    case "EXPERT":
      return "danger";
  }
};
