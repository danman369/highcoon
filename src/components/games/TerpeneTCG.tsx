import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Swords, Shield } from "lucide-react";

interface TerpeneCard {
  name: string;
  icon: string;
  power: number;
  category: string;
  beats: string;
  beatenBy: string;
  color: string;
}

const DECK: TerpeneCard[] = [
  { name: "Limonene", icon: "🍋", power: 7, category: "Alertness", beats: "Myrcene", beatenBy: "Beta-Pinene", color: "hsl(50,100%,55%)" },
  { name: "Myrcene", icon: "🥭", power: 6, category: "Calmness", beats: "Caryophyllene", beatenBy: "Limonene", color: "hsl(210,80%,55%)" },
  { name: "Caryophyllene", icon: "🌶️", power: 8, category: "Hunger", beats: "Humulene", beatenBy: "Myrcene", color: "hsl(0,75%,50%)" },
  { name: "Humulene", icon: "🍺", power: 6, category: "Hunger", beats: "Linalool", beatenBy: "Caryophyllene", color: "hsl(25,90%,55%)" },
  { name: "Linalool", icon: "💜", power: 5, category: "Calmness", beats: "Alpha-Pinene", beatenBy: "Humulene", color: "hsl(330,75%,65%)" },
  { name: "Alpha-Pinene", icon: "🌲", power: 7, category: "Alertness", beats: "Terpinolene", beatenBy: "Linalool", color: "hsl(175,70%,45%)" },
  { name: "Terpinolene", icon: "🌸", power: 5, category: "Calmness", beats: "Beta-Pinene", beatenBy: "Alpha-Pinene", color: "hsl(270,65%,55%)" },
  { name: "Beta-Pinene", icon: "🌿", power: 6, category: "Alertness", beats: "Limonene", beatenBy: "Terpinolene", color: "hsl(120,70%,45%)" },
];

type Phase = "select" | "battle" | "result" | "gameover";

const TerpeneTCG = ({ onBack }: { onBack: () => void }) => {
  const [playerHand, setPlayerHand] = useState<TerpeneCard[]>([]);
  const [enemyHand, setEnemyHand] = useState<TerpeneCard[]>([]);
  const [phase, setPhase] = useState<Phase>("select");
  const [playerCard, setPlayerCard] = useState<TerpeneCard | null>(null);
  const [enemyCard, setEnemyCard] = useState<TerpeneCard | null>(null);
  const [battleResult, setBattleResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [round, setRound] = useState(0);
  const [character, setCharacter] = useState<string | null>(null);

  const characters = [
    { name: "Highcoon", emoji: "🦝", bonus: "Alertness +2" },
    { name: "Jdazzler", emoji: "✨", bonus: "Calmness +2" },
    { name: "AMG-175", emoji: "🤖", bonus: "Hunger +2" },
  ];

  const startGame = (charName: string) => {
    setCharacter(charName);
    const shuffled = [...DECK].sort(() => Math.random() - 0.5);
    setPlayerHand(shuffled.slice(0, 4));
    setEnemyHand(shuffled.slice(4, 8));
    setPhase("select");
    setPlayerScore(0);
    setEnemyScore(0);
    setRound(0);
    setPlayerCard(null);
    setEnemyCard(null);
    setBattleResult(null);
  };

  const playCard = (card: TerpeneCard) => {
    if (phase !== "select") return;
    const enemy = enemyHand[Math.floor(Math.random() * enemyHand.length)];
    
    // Apply character bonus
    let pPower = card.power;
    let ePower = enemy.power;
    if (character === "Highcoon" && card.category === "Alertness") pPower += 2;
    if (character === "Jdazzler" && card.category === "Calmness") pPower += 2;
    if (character === "AMG-175" && card.category === "Hunger") pPower += 2;

    // Circular correlation bonus
    if (card.beats === enemy.name) pPower += 3;
    if (enemy.beats === card.name) ePower += 3;

    setPlayerCard(card);
    setEnemyCard(enemy);
    setPhase("battle");

    setTimeout(() => {
      let result: "win" | "lose" | "draw";
      if (pPower > ePower) { result = "win"; setPlayerScore(s => s + 1); }
      else if (ePower > pPower) { result = "lose"; setEnemyScore(s => s + 1); }
      else { result = "draw"; }
      setBattleResult(result);

      setPlayerHand(h => h.filter(c => c.name !== card.name));
      setEnemyHand(h => h.filter(c => c.name !== enemy.name));
      setRound(r => r + 1);
    }, 1200);
  };

  const nextRound = () => {
    if (playerHand.length === 0 || enemyHand.length === 0 || round >= 4) {
      setPhase("gameover");
    } else {
      setPhase("select");
      setPlayerCard(null);
      setEnemyCard(null);
      setBattleResult(null);
    }
  };

  const restart = () => {
    setCharacter(null);
    setPhase("select");
  };

  // Character select
  if (!character) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="neon-outline" size="sm" onClick={onBack}>← Volver</Button>
        </div>
        <h3 className="font-display text-xl font-bold text-foreground text-center mb-2">Elige tu personaje</h3>
        <p className="text-muted-foreground text-center text-sm mb-8">Cada personaje da un bonus de poder a una categoría</p>
        <div className="grid grid-cols-3 gap-4">
          {characters.map(c => (
            <motion.button
              key={c.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame(c.name)}
              className="rounded-lg border border-border bg-card p-6 text-center hover:border-primary/50 transition-colors"
            >
              <span className="text-4xl block mb-3">{c.emoji}</span>
              <span className="font-display text-sm font-bold text-foreground block">{c.name}</span>
              <span className="text-xs text-primary block mt-1">{c.bonus}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Game over
  if (phase === "gameover") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 max-w-md mx-auto">
        <div className="text-5xl mb-4">{playerScore > enemyScore ? "🏆" : playerScore < enemyScore ? "💀" : "🤝"}</div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          {playerScore > enemyScore ? "¡Victoria!" : playerScore < enemyScore ? "Derrota..." : "Empate"}
        </h3>
        <p className="text-primary font-display text-xl mb-1">{playerScore} - {enemyScore}</p>
        <p className="text-muted-foreground text-sm mb-6">La correlación circular es la clave del poder</p>
        <div className="flex gap-3 justify-center">
          <Button variant="neon" onClick={restart}><RotateCcw className="w-4 h-4" /> Otra partida</Button>
          <Button variant="neon-outline" onClick={onBack}>Volver</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="neon-outline" size="sm" onClick={onBack}>← Volver</Button>
        <div className="flex gap-4 items-center">
          <span className="font-display text-xs text-foreground">{character}</span>
          <span className="font-display text-xs text-primary">{playerScore}</span>
          <span className="font-display text-xs text-muted-foreground">vs</span>
          <span className="font-display text-xs text-destructive">{enemyScore}</span>
          <span className="font-display text-xs text-muted-foreground">STIGMA</span>
        </div>
      </div>

      {/* Battle arena */}
      {(phase === "battle" || battleResult) && playerCard && enemyCard && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-lg border-2 p-4 text-center w-32"
            style={{ borderColor: playerCard.color }}
          >
            <span className="text-3xl block">{playerCard.icon}</span>
            <span className="font-display text-xs text-foreground block mt-1">{playerCard.name}</span>
            <span className="font-display text-xs text-primary">{playerCard.power}</span>
          </motion.div>

          <AnimatePresence>
            {battleResult && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                {battleResult === "win" ? <Swords className="w-6 h-6 text-primary" /> : battleResult === "lose" ? <Shield className="w-6 h-6 text-destructive" /> : <span className="text-xl">🤝</span>}
                <p className="font-display text-xs mt-1 text-foreground">
                  {battleResult === "win" ? "WIN" : battleResult === "lose" ? "LOSE" : "DRAW"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-lg border-2 p-4 text-center w-32"
            style={{ borderColor: enemyCard.color }}
          >
            <span className="text-3xl block">{enemyCard.icon}</span>
            <span className="font-display text-xs text-foreground block mt-1">{enemyCard.name}</span>
            <span className="font-display text-xs text-destructive">{enemyCard.power}</span>
          </motion.div>
        </div>
      )}

      {battleResult && (
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground mb-3">
            {playerCard?.beats === enemyCard?.name && "🔥 ¡Bonus de correlación circular! +3 poder"}
            {enemyCard?.beats === playerCard?.name && "💀 El enemigo tiene ventaja circular +3"}
          </p>
          <Button variant="neon" onClick={nextRound}>
            {playerHand.length === 0 || round >= 4 ? "Ver resultado final" : "Siguiente ronda"}
          </Button>
        </div>
      )}

      {/* Player hand */}
      {phase === "select" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-display text-xs text-muted-foreground text-center mb-4">ELIGE TU CARTA</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {playerHand.map(card => (
              <motion.button
                key={card.name}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playCard(card)}
                className="rounded-lg border-2 p-4 text-center bg-card hover:shadow-[var(--shadow-neon)] transition-shadow cursor-pointer"
                style={{ borderColor: card.color }}
              >
                <span className="text-3xl block mb-2">{card.icon}</span>
                <span className="font-display text-xs font-bold text-foreground block">{card.name}</span>
                <span className="text-xs text-muted-foreground block">{card.category}</span>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="font-display text-sm text-primary">{card.power}</span>
                </div>
                <span className="text-[9px] text-muted-foreground block mt-1">Beats: {card.beats}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TerpeneTCG;
