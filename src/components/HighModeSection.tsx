import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, Puzzle, Palette, Swords } from "lucide-react";
import TriviaGame from "@/components/games/TriviaGame";
import TerpeneMemoryGame from "@/components/games/TerpeneMemoryGame";
import MatchTheVibeGame from "@/components/games/MatchTheVibeGame";
import TerpeneTCG from "@/components/games/TerpeneTCG";

type ActiveGame = null | "trivia" | "memory" | "vibe" | "tcg";

const games = [
  { id: "trivia" as const, icon: Brain, title: "Terpene Trivia", desc: "5 preguntas sobre terpenos y la historia de Highcoon" },
  { id: "memory" as const, icon: Puzzle, title: "Memory Match", desc: "Empareja cada fruta/alimento con su terpeno" },
  { id: "vibe" as const, icon: Palette, title: "Match the Vibe", desc: "Selecciona los terpenos que mejor encajan con cada vibe" },
  { id: "tcg" as const, icon: Swords, title: "Terpene TCG", desc: "Batalla de cartas con la correlación circular" },
];

const HighModeSection = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

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
            Terpified Games
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            HIGH MODE
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pon a prueba tu conocimiento sobre terpenos con juegos interactivos.
          </p>
        </motion.div>

        {!activeGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {games.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveGame(game.id)}
                  className="rounded-lg border border-primary/30 bg-card p-6 text-center hover:border-primary/60 hover:shadow-[var(--shadow-neon)] transition-all duration-300 cursor-pointer"
                >
                  <game.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-display text-sm font-semibold mb-1 text-foreground">{game.title}</h3>
                  <p className="text-xs text-muted-foreground">{game.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {activeGame === "trivia" && <TriviaGame onBack={() => setActiveGame(null)} />}
        {activeGame === "memory" && <TerpeneMemoryGame onBack={() => setActiveGame(null)} />}
        {activeGame === "vibe" && <MatchTheVibeGame onBack={() => setActiveGame(null)} />}
        {activeGame === "tcg" && <TerpeneTCG onBack={() => setActiveGame(null)} />}
      </div>
    </section>
  );
};

export default HighModeSection;
