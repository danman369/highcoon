import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, X } from "lucide-react";

interface Vibe {
  label: string;
  description: string;
  correct: string[];
  icon: string;
}

const VIBES: Vibe[] = [
  {
    label: "Relajación Total",
    description: "Necesitas calma profunda, aliviar el estrés y descansar.",
    correct: ["Myrcene", "Linalool"],
    icon: "🧘",
  },
  {
    label: "Enfoque Máximo",
    description: "Necesitas concentración mental, claridad y productividad.",
    correct: ["Alpha-Pinene", "Beta-Pinene"],
    icon: "🎯",
  },
  {
    label: "Energía Creativa",
    description: "Quieres inspiración, buena vibra y pensamiento innovador.",
    correct: ["Limonene", "Terpinolene"],
    icon: "⚡",
  },
  {
    label: "Balance & Control",
    description: "Buscas equilibrio entre cuerpo y mente, control del apetito.",
    correct: ["Humulene", "Caryophyllene"],
    icon: "⚖️",
  },
  {
    label: "Noche Tranquila",
    description: "Preparándote para dormir, necesitas calma sin ansiedad.",
    correct: ["Linalool", "Myrcene", "Terpinolene"],
    icon: "🌙",
  },
];

const ALL_TERPENES = [
  "Limonene", "Myrcene", "Caryophyllene", "Humulene",
  "Linalool", "Alpha-Pinene", "Terpinolene", "Beta-Pinene",
];

const TERPENE_ICONS: Record<string, string> = {
  Limonene: "🍋", Myrcene: "🥭", Caryophyllene: "🌶️", Humulene: "🍺",
  Linalool: "💜", "Alpha-Pinene": "🌲", Terpinolene: "🌸", "Beta-Pinene": "🌿",
};

const MatchTheVibeGame = ({ onBack }: { onBack: () => void }) => {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const vibe = VIBES[round];

  const toggleTerpene = (name: string) => {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const submit = () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    const correct = vibe.correct;
    const hits = selected.filter(s => correct.includes(s)).length;
    const misses = selected.filter(s => !correct.includes(s)).length;
    const points = Math.max(0, hits - misses);
    setScore(s => s + points);
  };

  const next = () => {
    if (round + 1 >= VIBES.length) {
      setDone(true);
    } else {
      setRound(r => r + 1);
      setSelected([]);
      setSubmitted(false);
    }
  };

  const restart = () => {
    setRound(0);
    setSelected([]);
    setSubmitted(false);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const maxScore = VIBES.reduce((sum, v) => sum + v.correct.length, 0);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 max-w-md mx-auto">
        <div className="text-5xl mb-4">🎭</div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">¡Vibes Matched!</h3>
        <p className="text-primary font-display text-3xl font-bold mb-1">{score}/{maxScore}</p>
        <p className="text-muted-foreground mb-6">puntos de vibe</p>
        <div className="flex gap-3 justify-center">
          <Button variant="neon" onClick={restart}><RotateCcw className="w-4 h-4" /> Otra vez</Button>
          <Button variant="neon-outline" onClick={onBack}>Volver</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="neon-outline" size="sm" onClick={onBack}>← Volver</Button>
        <div className="flex gap-4">
          <span className="font-display text-xs text-muted-foreground">RONDA {round + 1}/{VIBES.length}</span>
          <span className="font-display text-xs text-primary">SCORE: {score}</span>
        </div>
      </div>

      <motion.div key={round} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        {/* Vibe Card */}
        <div className="rounded-lg border border-primary/30 bg-card p-6 text-center mb-8">
          <span className="text-4xl mb-3 block">{vibe.icon}</span>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">{vibe.label}</h3>
          <p className="text-sm text-muted-foreground">{vibe.description}</p>
        </div>

        {/* Terpene selection */}
        <p className="font-display text-xs text-muted-foreground mb-4 text-center">
          SELECCIONA LOS TERPENOS QUE MEJOR COINCIDAN CON ESTA VIBE
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {ALL_TERPENES.map(t => {
            const isSelected = selected.includes(t);
            const isCorrect = vibe.correct.includes(t);
            let borderClass = "border-border";
            let bgClass = "bg-card/50";
            if (submitted) {
              if (isCorrect) { borderClass = "border-primary"; bgClass = "bg-primary/10"; }
              else if (isSelected) { borderClass = "border-destructive"; bgClass = "bg-destructive/10"; }
            } else if (isSelected) {
              borderClass = "border-primary/60"; bgClass = "bg-primary/5";
            }
            return (
              <button
                key={t}
                onClick={() => toggleTerpene(t)}
                className={`rounded-lg border-2 p-3 text-center transition-all duration-200 ${borderClass} ${bgClass} ${!submitted ? "hover:border-primary/40 cursor-pointer" : ""}`}
              >
                <span className="text-xl block mb-1">{TERPENE_ICONS[t]}</span>
                <span className="font-display text-xs text-foreground">{t}</span>
                {submitted && isCorrect && <Check className="w-3 h-3 text-primary mx-auto mt-1" />}
                {submitted && isSelected && !isCorrect && <X className="w-3 h-3 text-destructive mx-auto mt-1" />}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <Button variant="neon" className="w-full" onClick={submit} disabled={selected.length === 0}>
            Confirmar selección
          </Button>
        ) : (
          <Button variant="neon" className="w-full" onClick={next}>
            {round + 1 >= VIBES.length ? "Ver resultados" : "Siguiente vibe"}
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default MatchTheVibeGame;
