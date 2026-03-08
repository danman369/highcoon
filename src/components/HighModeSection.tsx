import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Brain, Zap, RotateCcw } from "lucide-react";

type GameState = "menu" | "playing" | "result";

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

const HighModeSection = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startGame = () => {
    setGameState("playing");
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
  };

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setGameState("result");
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  return (
    <section id="highmode" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            Gamified Learning
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            HIGH MODE
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pon a prueba tu conocimiento sobre terpenos y la historia de Highcoon.
          </p>
        </motion.div>

        {gameState === "menu" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Brain, title: "Terpene Quiz", desc: "5 preguntas sobre terpenos" },
                { icon: Gamepad2, title: "Story Mode", desc: "Explora los capítulos interactivamente" },
                { icon: Zap, title: "Speed Round", desc: "Responde antes que se acabe el tiempo" },
              ].map((mode, i) => (
                <div
                  key={mode.title}
                  className={`rounded-lg border p-6 text-center transition-all duration-300 ${
                    i === 0
                      ? "border-primary/50 bg-card shadow-[var(--shadow-neon)] cursor-pointer"
                      : "border-border/30 bg-card/50 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={i === 0 ? startGame : undefined}
                >
                  <mode.icon className={`w-8 h-8 mx-auto mb-3 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="font-display text-sm font-semibold mb-1">{mode.title}</h3>
                  <p className="text-xs text-muted-foreground">{mode.desc}</p>
                  {i > 0 && <span className="text-[10px] font-display text-muted-foreground mt-2 block">PRÓXIMAMENTE</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xs text-muted-foreground">
                PREGUNTA {currentQ + 1}/{questions.length}
              </span>
              <span className="font-display text-xs text-primary">
                SCORE: {score}
              </span>
            </div>
            <div className="w-full h-1 rounded-full bg-secondary mb-8">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-8">
              {questions[currentQ].question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {questions[currentQ].options.map((opt, i) => {
                let borderColor = "border-border";
                let bgColor = "bg-card";
                if (selected !== null) {
                  if (i === questions[currentQ].correct) {
                    borderColor = "border-primary";
                    bgColor = "bg-primary/10";
                  } else if (i === selected) {
                    borderColor = "border-destructive";
                    bgColor = "bg-destructive/10";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`p-4 rounded-lg border text-left transition-all duration-300 ${borderColor} ${bgColor} hover:border-primary/50`}
                  >
                    <span className="font-display text-xs text-muted-foreground mr-2">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="text-foreground">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-border bg-secondary/30 p-4 mb-6"
              >
                <p className="text-sm text-foreground/80">
                  {selected === questions[currentQ].correct ? "🎉 ¡Correcto! " : "❌ Incorrecto. "}
                  {questions[currentQ].explanation}
                </p>
              </motion.div>
            )}

            {showExplanation && (
              <Button variant="neon" onClick={nextQuestion} className="w-full">
                {currentQ + 1 >= questions.length ? "Ver resultados" : "Siguiente pregunta"}
              </Button>
            )}
          </motion.div>
        )}

        {gameState === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="text-6xl mb-4">
              {score >= 4 ? "🏆" : score >= 2 ? "⭐" : "💪"}
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              {score >= 4 ? "Those are some really high vibes!" : score >= 2 ? "Good vibes!" : "Keep learning!"}
            </h3>
            <p className="text-primary font-display text-3xl font-bold mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-muted-foreground mb-8">respuestas correctas</p>

            <div className="flex gap-4 justify-center">
              <Button variant="neon" onClick={startGame}>
                <RotateCcw className="w-4 h-4" />
                Jugar de nuevo
              </Button>
              <Button variant="neon-outline" onClick={() => setGameState("menu")}>
                Menú
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HighModeSection;
