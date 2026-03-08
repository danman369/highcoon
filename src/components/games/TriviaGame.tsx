import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "¿Qué terpeno es conocido por su aroma cítrico y efecto energizante?",
    options: ["Myrcene", "Limonene", "Linalool", "Pinene"],
    correct: 1,
    explanation: "¡Limonene! Encontrado en limones y cítricos, es conocido por elevar el ánimo y dar energía.",
  },
  {
    question: "¿Cuál es el único terpeno que también actúa como cannabinoide?",
    options: ["Humulene", "Pinene", "Caryophyllene", "Myrcene"],
    correct: 2,
    explanation: "Caryophyllene es único porque se une directamente a los receptores CB2, actuando como cannabinoide.",
  },
  {
    question: "¿Qué terpeno predomina en la lavanda y promueve la calma?",
    options: ["Limonene", "Myrcene", "Linalool", "Terpineol"],
    correct: 2,
    explanation: "Linalool es el terpeno principal de la lavanda, conocido por sus efectos calmantes y sedantes.",
  },
  {
    question: "¿Cómo se llama la tecnología que Highcoon creó para aprovechar los terpenos?",
    options: ["Terp-Gear", "Terp-nology", "Full Spectrum", "Terpene Tech"],
    correct: 1,
    explanation: "Terp-nology es la fusión de terpenos con tecnología que Highcoon desarrolló en STIGMA Corp.",
  },
  {
    question: "¿Quién es el compañero robótico de Highcoon?",
    options: ["Jdazzler", "Disrespecter", "AMG-175", "Mr. Stigma"],
    correct: 2,
    explanation: "AMG-175 es el asistente personal AI de Mr. Stigma que se convierte en compañero de Highcoon.",
  },
];

const TriviaGame = ({ onBack }: { onBack: () => void }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === questions[currentQ].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (currentQ + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const restart = () => {
    setCurrentQ(0); setScore(0); setSelected(null); setShowExplanation(false); setDone(false);
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto py-8">
        <div className="text-6xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "⭐" : "💪"}</div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          {score >= 4 ? "Those are some really high vibes!" : score >= 2 ? "Good vibes!" : "Keep learning!"}
        </h3>
        <p className="text-primary font-display text-3xl font-bold mb-2">{score}/{questions.length}</p>
        <p className="text-muted-foreground mb-8">respuestas correctas</p>
        <div className="flex gap-4 justify-center">
          <Button variant="neon" onClick={restart}><RotateCcw className="w-4 h-4" /> Jugar de nuevo</Button>
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
          <span className="font-display text-xs text-muted-foreground">PREGUNTA {currentQ + 1}/{questions.length}</span>
          <span className="font-display text-xs text-primary">SCORE: {score}</span>
        </div>
      </div>
      <div className="w-full h-1 rounded-full bg-secondary mb-8">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-8">{questions[currentQ].question}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {questions[currentQ].options.map((opt, i) => {
            let border = "border-border";
            let bg = "bg-card";
            if (selected !== null) {
              if (i === questions[currentQ].correct) { border = "border-primary"; bg = "bg-primary/10"; }
              else if (i === selected) { border = "border-destructive"; bg = "bg-destructive/10"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} className={`p-4 rounded-lg border text-left transition-all duration-300 ${border} ${bg} hover:border-primary/50`}>
                <span className="font-display text-xs text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
                <span className="text-foreground">{opt}</span>
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-secondary/30 p-4 mb-6">
            <p className="text-sm text-foreground/80">
              {selected === questions[currentQ].correct ? "🎉 ¡Correcto! " : "❌ Incorrecto. "}{questions[currentQ].explanation}
            </p>
          </motion.div>
        )}
        {showExplanation && (
          <Button variant="neon" onClick={next} className="w-full">{currentQ + 1 >= questions.length ? "Ver resultados" : "Siguiente pregunta"}</Button>
        )}
      </motion.div>
    </div>
  );
};

export default TriviaGame;
