import { useNavigate } from "react-router-dom";
import { Heart, Flame, Shield, ChevronRight, Star, Award, Users, Zap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const STATS = [
  { icon: Users, value: "12,400+", label: "Trained Responders" },
  { icon: Award, value: "8,200+", label: "Certifications Issued" },
  { icon: Star, value: "4.9/5", label: "Learner Rating" },
  { icon: Zap, value: "3 Modules", label: "Life-Saving Skills" },
];

const MODULES_PREVIEW = [
  {
    icon: Heart,
    title: "CPR Protocol",
    description: "Master cardiac arrest response and chest compression techniques.",
    color: "text-danger",
    glow: "shadow-[0_0_20px_rgba(230,57,70,0.3)]",
    border: "border-danger/30",
  },
  {
    icon: Flame,
    title: "Fire Safety",
    description: "Evacuation protocols, extinguisher use, and fire behavior.",
    color: "text-warning",
    glow: "shadow-[0_0_20px_rgba(255,159,28,0.3)]",
    border: "border-warning/30",
  },
  {
    icon: Shield,
    title: "Wound Care",
    description: "Hemorrhage control, trauma first response, and shock prevention.",
    color: "text-success",
    glow: "shadow-[0_0_20px_rgba(46,196,182,0.3)]",
    border: "border-success/30",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-full bg-background overflow-auto">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: "rgba(10,14,26,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(230,57,70,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: "hsl(var(--color-primary-500))" }}
          >
            <Heart className="w-4 h-4 text-foreground" fill="currentColor" />
          </div>
          <span className="font-display font-bold text-xl uppercase tracking-widest text-foreground">
            AidQuest
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.user_metadata?.full_name || user?.email || "Responder"}
          </span>
          <button
            onClick={() => navigate("/modules")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Modules
          </button>
          <button
            onClick={() => navigate("/modules")}
            className="btn-chamfer px-4 py-2 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5"
            style={{
              background: "hsl(var(--color-primary-500))",
              boxShadow: "0 0 12px rgba(230,57,70,0.3)",
            }}
          >
            Start Training
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(230,57,70,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,244,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border text-xs font-bold uppercase tracking-widest animate-fade-in"
            style={{
              background: "rgba(230,57,70,0.1)",
              borderColor: "rgba(230,57,70,0.3)",
              color: "hsl(var(--color-primary-500))",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            Emergency Response Training Platform
          </div>

          <h1
            className="font-display font-extrabold text-5xl sm:text-7xl uppercase leading-none tracking-tight text-foreground mb-4 animate-fade-in-up"
            style={{ letterSpacing: "-0.5px" }}
          >
            Every Second
            <br />
            <span style={{ color: "hsl(var(--color-primary-500))" }}>Counts.</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 animate-fade-in-up">
            Train with high-stakes simulations. Master CPR, fire safety, and first aid through
            gamified scenarios — then earn your physical certification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up">
            <button
              onClick={() => navigate("/modules")}
              className="btn-chamfer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 font-display font-bold text-base uppercase tracking-widest text-foreground transition-all hover:-translate-y-0.5"
              style={{
                background: "hsl(var(--color-primary-500))",
                boxShadow: "0 4px 24px rgba(230,57,70,0.4)",
              }}
            >
              Begin Training
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/modules")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 font-display font-bold text-base uppercase tracking-widest text-muted-foreground rounded border transition-all hover:text-foreground hover:border-foreground/30"
              style={{ borderColor: "rgba(136,146,164,0.3)" }}
            >
              View Modules
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y py-10 px-6"
        style={{ borderColor: "rgba(136,146,164,0.1)", background: "rgba(20,24,36,0.5)" }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="w-5 h-5 text-warning mb-1" />
              <span className="font-display font-bold text-2xl text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Module Preview Cards */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-label mb-2">Training Modules</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-foreground">
              Choose Your Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {MODULES_PREVIEW.map((mod) => (
              <div
                key={mod.title}
                onClick={() => navigate("/modules")}
                className={cn(
                  "module-card-unlocked rounded p-6 border cursor-pointer transition-all duration-200 hover:-translate-y-1",
                  mod.glow
                )}
                style={{
                  background: "hsl(var(--color-surface))",
                  borderColor: "rgba(136,146,164,0.15)",
                }}
              >
                <mod.icon
                  className={cn("w-8 h-8 mb-4", mod.color)}
                  strokeWidth={1.5}
                />
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2">
                  {mod.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O2O Bridge Section */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "rgba(136,146,164,0.1)", background: "rgba(10,14,26,0.8)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label mb-3">Certification Pathway</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-foreground mb-4">
            Online Training →{" "}
            <span style={{ color: "hsl(var(--color-success))" }}>Real Certification</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            Complete a module online, receive a secure QR code, then visit an authorized assessment center.
            An instructor verifies your score and conducts a physical test — you leave with an official certification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 mb-8">
            {[
              { step: "1", label: "Complete Online Module", color: "danger" },
              { step: "2", label: "Receive Secure QR Code", color: "warning" },
              { step: "3", label: "Visit Assessment Center", color: "success" },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base mb-2"
                    style={{
                      background:
                        item.color === "danger"
                          ? "rgba(230,57,70,0.2)"
                          : item.color === "warning"
                          ? "rgba(255,159,28,0.2)"
                          : "rgba(46,196,182,0.2)",
                      border: `1px solid ${
                        item.color === "danger"
                          ? "rgba(230,57,70,0.5)"
                          : item.color === "warning"
                          ? "rgba(255,159,28,0.5)"
                          : "rgba(46,196,182,0.5)"
                      }`,
                      color:
                        item.color === "danger"
                          ? "#e63946"
                          : item.color === "warning"
                          ? "#ff9f1c"
                          : "#2ec4b6",
                    }}
                  >
                    {item.step}
                  </div>
                  <span className="text-xs text-foreground font-medium text-center max-w-[100px]">
                    {item.label}
                  </span>
                </div>
                {i < 2 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/modules")}
            className="btn-chamfer px-8 py-3.5 font-display font-bold text-base uppercase tracking-widest text-foreground transition-all hover:-translate-y-0.5"
            style={{
              background: "hsl(var(--color-primary-500))",
              boxShadow: "0 4px 24px rgba(230,57,70,0.35)",
            }}
          >
            Start Your First Mission
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-6 border-t text-center"
        style={{ borderColor: "rgba(136,146,164,0.1)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-danger" fill="currentColor" />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            AidQuest
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Emergency Response Learning Platform · Hackathon Demo 2026
        </p>
      </footer>
    </div>
  );
}
