import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Card {
  id: number;
  type: "food" | "terpene";
  value: string;
  display: string;
  matchId: string;
  flipped: boolean;
  matched: boolean;
}

const PAIRS = [
  { food: "🍋 Limón", terpene: "Limonene", matchId: "limonene" },
  { food: "🥭 Mango", terpene: "Myrcene", matchId: "myrcene" },
  { food: "🌶️ Canela", terpene: "Caryophyllene", matchId: "caryophyllene" },
  { food: "🍺 Lúpulo", terpene: "Humulene", matchId: "humulene" },
  { food: "💜 Lavanda", terpene: "Linalool", matchId: "linalool" },
  { food: "🌲 Pino", terpene: "Alpha-Pinene", matchId: "alpha-pinene" },
  { food: "🌸 Lila", terpene: "Terpinolene", matchId: "terpinolene" },
  { food: "🌿 Romero", terpene: "Beta-Pinene", matchId: "beta-pinene" },
];

const TERPENE_COLORS: Record<string, string> = {
  limonene: "border-terpene-limonene",
  myrcene: "border-blue-400",
  caryophyllene: "border-terpene-caryophyllene",
  humulene: "border-terpene-humulene",
  linalool: "border-terpene-linalool",
  "alpha-pinene": "border-terpene-pinene",
  terpinolene: "border-purple-400",
  "beta-pinene": "border-primary",
};

const TerpeneMemoryGame = ({ onBack }: { onBack: () => void }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [complete, setComplete] = useState(false);

  const initGame = () => {
    const deck: Card[] = [];
    PAIRS.forEach((p, i) => {
      deck.push({ id: i * 2, type: "food", value: p.food, display: p.food, matchId: p.matchId, flipped: false, matched: false });
      deck.push({ id: i * 2 + 1, type: "terpene", value: p.terpene, display: p.terpene, matchId: p.matchId, flipped: false, matched: false });
    });
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setCards(deck);
    setSelected([]);
    setMoves(0);
    setComplete(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleFlip = (index: number) => {
    if (selected.length >= 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newSelected;
      if (newCards[a].matchId === newCards[b].matchId) {
        newCards[a].matched = true;
        newCards[b].matched = true;
        setCards([...newCards]);
        setSelected([]);
        if (newCards.every(c => c.matched)) setComplete(true);
      } else {
        setTimeout(() => {
          newCards[a].flipped = false;
          newCards[b].flipped = false;
          setCards([...newCards]);
          setSelected([]);
        }, 800);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="neon-outline" size="sm" onClick={onBack}>← Volver</Button>
        <span className="font-display text-xs text-muted-foreground">MOVIMIENTOS: {moves}</span>
      </div>

      {complete ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">¡Memoria Terpificada!</h3>
          <p className="text-primary font-display text-xl mb-1">{moves} movimientos</p>
          <p className="text-muted-foreground mb-6">
            {moves <= 12 ? "Increíble memoria!" : moves <= 18 ? "Muy bien!" : "¡Sigue practicando!"}
          </p>
          <Button variant="neon" onClick={initGame}><RotateCcw className="w-4 h-4" /> Jugar de nuevo</Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ rotateY: 180 }}
              animate={{ rotateY: card.flipped || card.matched ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleFlip(i)}
              className={`aspect-square rounded-lg border-2 transition-colors duration-300 flex items-center justify-center p-1 text-center ${
                card.matched
                  ? `${TERPENE_COLORS[card.matchId]} bg-card/80`
                  : card.flipped
                  ? "border-primary/50 bg-card"
                  : "border-border bg-secondary/50 hover:border-primary/30 cursor-pointer"
              }`}
              style={{ perspective: "600px" }}
            >
              {(card.flipped || card.matched) ? (
                <span className={`text-xs sm:text-sm font-display ${card.type === "terpene" ? "text-primary" : "text-foreground"}`}>
                  {card.display}
                </span>
              ) : (
                <span className="text-muted-foreground text-lg">?</span>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TerpeneMemoryGame;
